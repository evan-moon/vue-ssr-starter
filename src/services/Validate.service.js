/*
    @name: Validate.service.js
    @desc: 픽셀스테어스 폼 밸리데이션 서비스
    @authro: Evan Moon
    @created_ar: 2017.09.19
*/
import { Validator } from 'vee-validate';

class ValidateService {
    constructor () {
        this.regex = {
            name: /[^!@#$%^&*.,`"'\s]+$/,
            password: {
                specialChars: /[?!@#$%^*+\-_.,`]/,
                minlength: /^.{8,}$/,
                repeat: /^(?:(.)(?!\1\1))*$/,
            },
            lowercase: /[a-z]/,
            uppercase: /[A-Z]/,
            number: /[0-9]/,
        };
    }

    getRegex (name) {
        return this.regex[name];
    }

    getValidateMsgs () {
        return {
            en: {
                custom: {
                    email: {
                        required: 'Please let me know your email',
                    },
                    password: {
                        required: 'You forgot to enter your password',
                    },
                    name: {
                        required: 'Please let me know your name',
                        regex: 'You cannot use special characters except - and _',
                    },
                },
            },
        };
    }

    getPasswordTestList () {
        return [{
            score: 1,
            regex: this.regex.lowercase,
        }, {
            score: 1,
            regex: this.regex.uppercase,
        }, {
            score: 1,
            regex: this.regex.number,
        }, {
            score: 2,
            regex: this.regex.password.specialChars,
        }, {
            score: 5,
            regex: this.regex.password.repeat,
        }, {
            score: 10,
            regex: this.regex.password.minlength,
        }];
    }

    getPasswordTotalScore () {
        return this.getPasswordTestList().map(v => v.score).reduce((p, v) => p + v);
    }

    getPasswordLevel (score) {
        if (score >= 100) {
            return 'perfect';
        }
        else if (score > 80) {
            return 'high';
        }
        else if (score > 30) {
            return 'warning';
        }
        else {
            return 'invalid';
        }
    }

    calcPasswordScore (password, max) {
        let score = 0;

        if (password && password.length > 0) {
            console.log('================== REGX ================');
            this.getPasswordTestList().forEach(v => {
                console.log(password, v.regex, v.score, v.regex.test(password));
                if (v.regex.test(password)) {
                    score += v.score;
                }
                else {
                    score -= v.score;
                }
            });
            console.log('========================================');
            console.log('FINAL SCORE =>', score);
        }
        else {
            score = 0;
        }

        score = score > 0 ? (score / max) * 100 : 0;

        return score;
    }
}

const instance = new ValidateService();
export default instance;

Validator.updateDictionary(instance.getValidateMsgs());
