/*
    @name: auth/state.js
    @desc: Auth스토어 상태 선언
    @author: Evan Moon
    @created_at: 2017.08.27
*/

import { DEFAULT_USER_PROFILE } from 'src/constants';

export const AuthState = {
    user: null,
    userProfileSrc: DEFAULT_USER_PROFILE,
    accessToken: null,
    refreshToken: null,
    isAuthorized: false,
    hasProfileSrc: false,
};
