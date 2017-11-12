import { mapActions } from 'vuex';
import { LOGO } from 'src/constants';
import APIService from 'src/services/API.service';
import SigninForm from 'src/components/forms/Signin.form.vue';

export default {
    name: 'Signin',
    components: {
        SigninForm,
    },
    data () {
        return {
            logo: LOGO,
            isBusy: false,
        };
    },
    methods: {
        postData (authData) {
            this.isBusy = true;
            APIService.resource('users.signin').post(authData)
            .then(res => {
                this.setToken({
                    accessToken: res.result.access_token,
                    refreshToken: res.result.refresh_token,
                });
                this.setUserByAPI()
                .then(res => {
                    this.authResolve();
                });
            }, err => {
                if (err) {
                    this.authReject(err);
                }
                else {
                    this.authReject(null);
                }
            });
        },
        authResolve () {
            if (this.$route.query.redirect) {
                this.$router.push({ path: this.$route.query.redirect });
            }
            else {
                this.$router.push({ name: 'home' });
            }
            this.isBusy = false;
        },
        authReject (err) {
            if (err && err.data) {
                if (err.data.status.code === '0061') {
                    alert('Please check your email address or password!');
                }
                else {
                    alert('Oh...Something is wrong');
                }
            }
            else {
                alert('Oh...Something is wrong');
            }
            this.isBusy = false;
        },
        ...mapActions({
            setToken: 'setToken',
            setUserByAPI: 'setUserByAPI',
        }),
    },
};
