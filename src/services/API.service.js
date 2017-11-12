import axios from 'axios';
import Q from 'q';

import { CUSTOM_HEADER_PREFIX } from '../constants';
import { API_BASE_URL } from 'src/constants/env.constant';
import { API_LIST } from '../constants/api.constant';

class APIService {
    constructor (axios, API_LIST) {
        this._axios = axios.create({ baseURL: API_BASE_URL });
        this._apilist = this.generateAPI(API_LIST);
    }

    init ({ router, store }) {
        this.router = router;
        this.store = store;
    }

    set authToken (newToken) {
        this._myAuthToken = newToken;
        this._axios.defaults.headers.common.Authorization = `Bearer ${newToken}`;
    }

    get authToken () {
        return this._myAuthToken;
    }

    set refreshToken (newToken) {
        this._myRefreshToken = newToken;
        this._axios.defaults.headers.common[`${CUSTOM_HEADER_PREFIX}refresh-token`] = newToken;
    }

    get refreshToken () {
        return this._myRefreshToken;
    }

    destroyToken () {
        this._myAuthToken = null;
        this._myRefreshToken = null;
        delete this._axios.defaults.headers.common.Authorization;
        delete this._axios.defaults.headers.common[`${CUSTOM_HEADER_PREFIX}refresh-token`];
    }

    resource (api, id = null) {
        return {
            get: (params) => this.GET(api, id, params),
            post: (data) => this.POST(api, id, data),
            put: (data) => this.PUT(api, id, data),
            delete: (data) => this.DELETE(api, id, data),
        };
    }

    GET (api, id, params) {
        let defer = Q.defer();
        api = this.getURI(api, id);

        this._axios.get(api, { params })
        .then(res => {
            console.log('GET res => ', res.data);
            defer.resolve(res.data);
        }, err => {
            if (err) {
                console.error('API GET ERROR!');
                console.error(err.stack);
            }
            this.errorHandler(err).then(res => {
                defer.resolve(res.data);
            }, err => {
                console.log('FINAL ERR => ', err);
                if (err) {
                    defer.reject(err);
                }
            });
        });

        return defer.promise;
    }

    POST (api, id, data) {
        let defer = Q.defer();
        api = this.getURI(api, id);

        this._axios.post(api, data)
        .then(res => {
            defer.resolve(res.data);
        }, err => {
            if (err) {
                console.error('API POST ERROR!');
            }
            return this.errorHandler(err).then(res => {
                defer.resolve(res.data);
            }, err => {
                console.log('FINAL ERR => ', err);
                if (err) {
                    defer.reject(err);
                }
            });
        });

        return defer.promise;
    }

    PUT (api, id, data) {
        let defer = Q.defer();
        api = this.getURI(api, id);

        this._axios.put(api, data)
        .then(res => {
            defer.resolve(res.data);
        }, err => {
            if (err) {
                console.error('API PUT ERROR!');
            }
            return this.errorHandler(err).then(res => {
                defer.resolve(res.data);
            }, err => {
                console.log('FINAL ERR => ', err);
                if (err) {
                    defer.reject(err);
                }
            });
        });

        return defer.promise;
    }

    DELETE (api, id, data) {
        let defer = Q.defer();
        api = this.getURI(api, id);

        this._axios.delete(api, data)
        .then(res => {
            defer.resolve(res.data);
        }, err => {
            if (err) {
                console.error('API DELETE ERROR!');
            }
            return this.errorHandler(err).then(res => {
                defer.resolve(res.data);
            }, err => {
                console.log('FINAL ERR => ', err);
                if (err) {
                    defer.reject(err);
                }
            });
        });

        return defer.promise;
    }

    RETRY (config) {
        let defer = Q.defer();

        this._axios({
            method: config.method,
            url: config.url,
            data: config.data,
        }).then(res => {
            defer.resolve(res);
        }).catch(err => {
            if (err) {}
            defer.reject(err);
        });

        return defer.promise;
    }

    REISSUANCE () {
        console.log('[log] REISSUANCE START!');
        let defer = Q.defer();
        let api = this.getURI('users.refreshToken');
        console.log(api);
        this._axios.get(api).then(res => {
            console.log('[log] REISSUANCE => TRUE');
            console.log('[log] NEW AUTH TOKEN => ', res.data.result);
            console.log('[log] REFRESH TOKEN => ', this.refreshToken);
            this.store.dispatch('setToken', {
                accessToken: res.data.result,
                refreshToken: this.refreshToken,
            }).then(res => {
                defer.resolve();
            });
        }, err => {
            console.log('[log] REISSUANCE => FALSE');
            if (err) {}
            this.store.dispatch('destroyToken', { reload: false }).then(res => {
                console.log('destroy finished');
                defer.resolve();
            });
        });

        return defer.promise;
    }

    errorHandler (err) {
        // defer.resolve => 200
        // defer.reject => error
        let defer = Q.defer();

        const IS_REFRESH_API = err.config.url.indexOf('/refresh') > -1;
        const IS_EXPIRED = err.response.status === 419;

        console.log('API GET ERROR FROM => ', err.config.url);
        console.log('ERROR: ', err.response.status);
        console.log('ERROR DATA:', err.response.data);
        console.log('IS_REFRESH_API: ', IS_REFRESH_API);
        console.log('IS_EXPIRED: ', IS_EXPIRED);

        if (IS_EXPIRED && !IS_REFRESH_API) {
            this.REISSUANCE().then(res => {
                console.log('[log] REISSUANCE IS FINISHED');
                this.RETRY(err.config).then(res => {
                    console.log('[log] RETRIED URL => ', res.config.url);
                    console.log('[log] RETRY RESPONSE => ', res.data);
                    defer.resolve(res);
                }, err => {
                    console.log('RETRY ERR => ', err.response.status);
                    defer.reject({
                        status: err.response.status,
                        data: err.response.data,
                    });
                });
            });
        }
        else {
            defer.reject({
                status: err.response.status,
                data: err.response.data,
            });
        }

        return defer.promise;
    }

    getURI (api, id, uri, list = this._apilist, index = 0) {
        let tmp = api.split('.');
        let type = typeof list[tmp[index]];

        if (list[tmp[index]]) {
            if (type === 'string') {
                uri = list[tmp[index]];
                return this.setParamsToAPI(uri, id);
            }
            else if (type === 'object') {
                return this.getURI(api, id, tmp[index], list[tmp[index]], index + 1);
            }
        }
        else {
            return uri;
        }
    }

    setParamsToAPI (uri, uriParams) {
        const regx = /\{\w+\}/gi;
        const braketRegx = /[{|}]/g;

        let params = uri.match(regx);
        if (!params) {
            return uri;
        }

        params = params.map(v => {
            return v.replace(braketRegx, '');
        });

        let uriArr = uri.split('/').map(v => {
            return v.replace(braketRegx, '');
        });

        params.forEach(v => {
            let position = uriArr.indexOf(v);
            if (position > -1) uriArr[position] = uriParams[v];
        });

        return uriArr.join('/');
    }

    generateAPI (API_LIST) {
        let tmp = {};

        Object.keys(API_LIST).forEach(v => {
            if (API_LIST[v] instanceof Function) {
                tmp[v] = API_LIST[v]();
            }
            else {
                tmp[v] = API_LIST[v];
            }
        });

        return tmp;
    }
}

const instance = new APIService(axios, API_LIST);
export default instance;
