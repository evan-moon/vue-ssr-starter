export function getToken (state) {
    return state.token;
}

export function isAuthorized (state) {
    return state.isAuthorized;
}

export function getAuthUser (state) {
    return state.isAuthorized && state.user;
}

export function getAuthUserProfileSrc (state) {
    return state.userProfileSrc;
}

export function hasProfileSrc (state) {
    return state.hasProfileSrc;
}

export default {
    getToken,
    getAuthUser,
    getAuthUserProfileSrc,
    isAuthorized,
    hasProfileSrc,
};
