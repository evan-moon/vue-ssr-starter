import Q from 'q';
import APIService from 'src/services/API.service';

export const isExistUserMixin = {
    data () {
        return {
            isExist: {
                email: false,
                name: false,
            },
        };
    },
    methods: {
        // isExist -> true, false
        // isInvalid -> false, true
        // isExist에 not연산자를 붙혀서 isInvalid값을 리턴
        isExistEmail (value) {
            let defer = Q.defer();
            if (!value) {
                defer.resolve(false);
            }
            APIService.resource('users.exists.email').post({ email: value })
            .then(res => {
                defer.resolve(!res.result);
            }, err => {
                if (err) {
                    defer.resolve(false);
                }
            });

            return defer.promise;
        },
        isExistName (value) {
            let defer = Q.defer();
            if (!this.name) {
                defer.resolve(false);
            }
            APIService.resource('users.exists.name').post({ nickname: this.name })
            .then(res => {
                defer.resolve(!res.result);
            }, err => {
                if (err) {
                    defer.resolve(false);
                }
            });

            return defer.promise;
        },
    },
    created () {
        this.$validator.extend('existEmail', {
            getMessage: field => `Your ${field} has already exist`,
            validate: value => {
                return this.isExistEmail(value).then(res => {
                    return { valid: res };
                });
            },
        });
        this.$validator.extend('existName', {
            getMessage: field => `Your ${field} has already exist`,
            validate: value => {
                return this.isExistName(value).then(res => {
                    return { valid: res };
                });
            },
        });
    },
};
