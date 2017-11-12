/*
    @name: password.mixin.js
    @desc: 패스워드 밸리데이트 체크 믹스인
    @author: Evan Moon
    @created_at: 2017.09.20
*/
import ValidateService from 'src/services/Validate.service';

export const PasswordMixin = {
    computed: {
        passwordLevel () {
            const PASSWORD = this.password;
            const MAX = ValidateService.getPasswordTotalScore();
            let score = ValidateService.calcPasswordScore(PASSWORD, MAX);
            let level = ValidateService.getPasswordLevel(score);

            return level;
        },
    },
    created () {
        this.$validator.extend('security', {
            getMessage: field => `Your ${field} must be more complicated`,
            validate: value => {
                return this.passwordLevel !== 'invalid';
            },
        });
    },
};
