/*
    @name: auth-code.mixin.js
    @desc: 라우터로 코드를 받은 후 API를 통해 validation여부를 체크하는 Mixin
    @author: Evan Moon
    @created_at: 2017.09.12
*/
import APIService from 'src/services/API.service';

export const AuthCodeMixin = {
    data () {
        return {
            result: false,
        };
    },
    methods: {
        fetchResult (api, code) {
            return APIService.resource(api).post({ code })
            .then(res => {
                this.result = res.result.validity;
                return res.result;
            });
        },
    },
};
