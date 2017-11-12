/*
    @name: AuthPasswordLanding
    @desc: 패스워드 토큰 랜딩 페이지
    @author: Evan Moon
    @created_at: 2017.09.12
*/

import { AuthCodeMixin } from 'src/mixins/auth-code.mixin';

export default {
    name: 'AuthPasswordLanding',
    mixins: [ AuthCodeMixin ],
    props: {
        code: {
            type: String,
            required: true,
        },
    },
    data () {
        return {
            isLoaded: false,
            errCode: null,
        };
    },
    created () {
        this.fetchResult('certs.password.code', this.code)
        .then(res => {
            if (res.validity) {
                this.$router.push({
                    name: 'user-setting-password',
                    params: { code: this.code },
                });
            }
        }, err => {
            this.$set(this, 'isLoaded', true);
            if (err) {
                this.$set(this, 'errCode', err.status);
            }
        });
    },
};
