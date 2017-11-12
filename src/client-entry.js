/* Main application bootstrapper */
import { createApp } from './app';

/* Global jQuery lib with expose-loader */
import 'expose-loader?$!expose-loader?jQuery!jquery';

const env = process.env.NODE_ENV;
const { app, router, store } = createApp();

if (env === 'production') {
    if (!window.console) {
        window.console = {};
    }
    const methods = ['log', 'debug', 'warn', 'info'];
    methods.forEach(method => {
        console[method] = function () {};
    });
}

if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__);
    if (store.state.auth && store.state.auth.accessToken) {
        store.dispatch('setToken', {
            accessToken: store.state.auth.accessToken,
            refreshToken: store.state.auth.refreshToken,
        });
    }
    else {
        store.dispatch('destroyToken', { reload: false });
    }
}

router.onReady(() => {
    // asyncData를 위한 route 훅.
    // asyncData가 존재할 경우 이 호출이 완료된 후 route가 이동된다.，
    // 이전 라우트에서 가져온 중복 데이터는 다시 가져오지 않는다.
    router.beforeResolve((to, from, next) => {
        const matched = router.getMatchedComponents(to);
        const prevMatched = router.getMatchedComponents(from);
        let diffed = false;
        const activated = matched.filter((c, i) => {
            return diffed || (diffed = (prevMatched[i] !== c));
        });
        if (!activated.length) {
            return next();
        }
        Promise.all(activated.map(c => {
            if (c.asyncData) {
                return c.asyncData({ store, route: to });
            }
        })).then(() => {
            /* LOADING INDICATOR */
            next();
        }).catch(next);
    });
    app.$mount('#app');
});
