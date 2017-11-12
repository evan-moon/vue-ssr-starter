/**
 * @name: api.constant.js
 * @desc: API 상수목록
 * @author: Evan Moon
 * @created_at: 2017.11.12
 */

export const API_LIST = {
    users: () => {
        const prefix = 'members';
        return {
            signin: `${prefix}/signin`,
            signout: `${prefix}/signout`,
            signup: `${prefix}/signup`,
            signdrop: `${prefix}/signdrop`,
            signdropSurvey: `${prefix}/signdrop/survey/list`,

            me: `${prefix}/me`,
            info: `${prefix}/{id}`,
            exists: {
                email: `${prefix}/exists/email`,
                name: `${prefix}/exists/nickname`,
            },
            pwd: {
                mail: `${prefix}/password/mail`,
                reset: `${prefix}/password/reset`,
                token: `${prefix}/password/token`,
            },
            refreshToken: `${prefix}/token/refresh`,
        };
    },
    certs: () => {
        const prefix = 'certs';
        return {
            signup: {
                mail: `${prefix}/signup/mail`,
                time: `${prefix}/signup/time`,
                code: `${prefix}/signup/code`,
            },
            password: {
                check: `${prefix}/password`,
                code: `${prefix}/password/code`,
            },
        };
    },
};
