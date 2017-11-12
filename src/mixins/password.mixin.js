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
