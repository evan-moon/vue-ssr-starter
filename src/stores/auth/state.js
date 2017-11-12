import { DEFAULT_USER_PROFILE } from 'src/constants';

export const AuthState = {
    user: null,
    userProfileSrc: DEFAULT_USER_PROFILE,
    accessToken: null,
    refreshToken: null,
    isAuthorized: false,
    hasProfileSrc: false,
};
