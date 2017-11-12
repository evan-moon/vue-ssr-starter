/* Main application bootstrapper */
import { createApp } from './app';
import CookieService from 'src/services/Cookie.service';

export default context => {
    return new Promise((resolve, reject) => {
        const { app, router, store } = createApp();
        const meta = app.$meta();

        // SET AUTH DATA
        const AUTH_KEY = CookieService._encodeKey('auth');
        const ENCODED_AUTH_TOKEN = context.cookie[AUTH_KEY];
        const REFRESH_KEY = CookieService._encodeKey('refresh');
        const ENCODED_REFRESH_TOKEN = context.cookie[REFRESH_KEY];

        if (ENCODED_AUTH_TOKEN && ENCODED_REFRESH_TOKEN) {
            const TOKEN = CookieService._decode(ENCODED_AUTH_TOKEN);
            const REFRESH_TOKEN = CookieService._decode(ENCODED_REFRESH_TOKEN);
            store.dispatch('setToken', {
                accessToken: TOKEN,
                refreshToken: REFRESH_TOKEN,
            }).then(res => {
                store.dispatch('setUserByAPI').then(res => {
                    router.push(context.url);
                }, err => {
                    if (err) {}
                    router.push(context.url);
                });
            });
        }
        else {
            router.push(context.url);
        }
        // /SET AUTH DATA

        context.meta = meta;

        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents();
            if (!matchedComponents.length) {
                return reject({ code: 404 });
            }
            Promise.all(matchedComponents.map(Component => {
                if (Component.asyncData) {
                    return Component.asyncData({
                        store,
                        route: router.currentRoute,
                    });
                }
            })).then(() => {
                /*
                 * 모든 프리 페치 후크가 해결 된 후 저장소가 렌더링 응용 프로그램에 필요한 상태로 채워집니다.
                 * 컨텍스트에 상태를 첨부하고 렌더러에`template` 옵션을 사용하면 상태는
                 * 자동으로`window .__ INITIAL_STATE__`로 직렬화되어 HTML에 주입됩니다.
                 */
                context.state = store.state;
                resolve(app);
            }).catch(reject);
        }, reject);
    });
};
