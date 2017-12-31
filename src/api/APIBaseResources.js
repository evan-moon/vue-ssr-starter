import axios from 'axios';
import Q from 'q';

// import apiList from 'src/constants/api.constant';
// import {CUSTOM_HEADER_PREFIX} from '../constants';
// import {API_BASE_URL} from 'src/constants/env.constant';
// import {API_LIST} from '../constants/api.constant';

export default class APICoreResources {
    constructor (options) {
        this._axios = axios.create({
            baseURL: options.API_BASE_URL,
        });
        this.apiList = options.apiList;
    }

    get (api, params) {
        let defer = Q.defer();

        this._axios.get(api, {params})
            .then(res => {
                defer.resolve(res.data);
                console.log('GET res => ', res.data);
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
    };

    post (api, data) {
        let defer = Q.defer();

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

    put (api, id, data) {
        let defer = Q.defer();

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

    delete (api, id, data) {
        let defer = Q.defer();

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
            this.reIssuance().then(res => {
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

    reIssuance () {
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
            if (err) {
            }
            this.store.dispatch('destroyToken', {reload: false}).then(res => {
                console.log('destroy finished');
                defer.resolve();
            });
        });

        return defer.promise;
    }

}
