export const authAPIList = {
    signin: 'members/signin',
    signout: 'members/signout',
    signup: 'members/signup',
    signdrop: 'members/signdrop',
    signdropSurvey: 'members/signdrop/survey/list',
    me: 'members/me',
    exists: {
        email: `members/exists/email`,
        name: `members/exists/nickname`,
    },
    pwd: {
        mail: `members/password/mail`,
        reset: `members/password/reset`,
        token: `members/password/token`,
    },
    refreshToken: `members/token/refresh`,
};

