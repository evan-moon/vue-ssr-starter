import APIService from 'src/services/API.service';
import CookieService from 'src/services/Cookie.service';

export function SET_TOKEN (state, { accessToken, refreshToken }) {
    state.accessToken = accessToken;
    state.refreshToken = refreshToken;
    APIService.authToken = accessToken;
    APIService.refreshToken = refreshToken;
    CookieService.save({
        key: 'auth',
        value: accessToken,
    });
    CookieService.save({
        key: 'refresh',
        value: refreshToken,
    });
}

export function SET_USER (state, user) {
    state.user = user;
    state.isAuthorized = true;
    CookieService.save({
        key: 'user',
        value: user,
    });

    if (user.profileImg) {
        state.userProfileSrc = user.profileImg.file + '320';
        state.hasProfileSrc = true;
    }
}

export function DESTROY_TOKEN (state, { reload }) {
    state.accessToken = null;
    state.refreshToken = null;
    state.user = {
        id: null,
        email: null,
        nickname: null,
        status: null,
        profileImg: null,
    };
    state.isAuthorized = false;
    APIService.destroyToken();
    CookieService.clear('auth');
    CookieService.clear('refresh');
    CookieService.clear('user');
    if (process.browser && location && reload) {
        location.reload('/');
    }
}

export default {
    SET_TOKEN,
    SET_USER,
    DESTROY_TOKEN,
};
