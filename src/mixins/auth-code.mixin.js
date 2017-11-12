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
