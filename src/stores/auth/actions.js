import Q from 'q';
import APIService from 'src/services/API.service';

export function setToken (store, { accessToken, refreshToken }) {
    let defer = Q.defer();
    store.commit('SET_TOKEN', { accessToken, refreshToken });
    defer.resolve();
    return defer.promise;
}

export function setUserByAPI (store) {
    let defer = Q.defer();
    APIService.resource('users.me').get()
    .then(res => {
        console.log('setUser => ', res);
        let user = res.result;
        store.commit('SET_USER', user);
        defer.resolve();
    }, err => {
        if (err) {
            console.error(err);
        }
        defer.reject();
    });

    return defer.promise;
}

export function setUser (store, user) {
    let defer = Q.defer();
    store.commit('SET_USER', user);
    defer.resolve();
    return defer.promise;
}

export function destroyToken (store, { reload }) {
    console.log('[log] STORE => token Destroy');
    let defer = Q.defer();
    store.commit('DESTROY_TOKEN', { reload });
    defer.resolve();
    return defer.promise;
}

export default {
    setToken,
    setUserByAPI,
    setUser,
    destroyToken,
};
