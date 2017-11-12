import { mapGetters } from 'vuex';
import APIService from 'src/services/API.service';

export default {
    name: 'AuthPassword',
    data () {
        return {
            password: null,
            isBusy: false,
        };
    },
    computed: {
        ...mapGetters({
            me: 'getAuthUser',
        }),
    },
    methods: {
        submit () {
            let data = {
                email: this.me.email,
                password: this.password,
            };

            this.isBusy = true;
            this.checkPassword(data).then(res => {
                if (res.result.validity) {
                    this.createToken();
                }
                else {
                    this.rejectHandler('Please make sure your password!');
                }
            }, err => {
                if (err) {
                    this.rejectHandler('Please make sure your password!');
                }
            });
        },
        checkPassword (data) {
            return APIService.resource('certs.password.check').post(data);
        },
        createToken () {
            return APIService.resource('users.pwd.token').post()
            .then(res => {
                this.$router.push({
                    name: 'user-setting-password',
                    params: { code: res.result.token },
                });
            }, err => {
                if (err) {
                    this.rejectHandler('[Err] Token generating has been failed');
                }
            });
        },
        rejectHandler (msg) {
            this.isBusy = false;
            alert(msg);
        },
    },
};
