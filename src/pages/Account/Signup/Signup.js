import { mapActions } from 'vuex';
import APIService from 'src/services/API.service';
import SignupForm from 'src/components/forms/Signup.form.vue';
import { LOGO } from 'src/constants';

export default {
    name: 'SignUp',
    components: {
        SignupForm,
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
            APIService.resource('users.signup').post(authData)
            .then(res => {
                this.setToken({
                    accessToken: res.result.access_token,
                    refreshToken: res.result.refresh_token,
                });
                this.setUserByAPI().then(res => {
                    this.$router.push({ name: 'auth-grade' });
                    this.isBusy = false;
                });
            }, err => {
                if (err) {
                    alert(`[Error - ${err.status}_${err.data.status.code}] ${err.data.status.msg}`);
                }
                else {
                    alert(`[Error - ${err.status}] Unknown Error`);
                }
                this.isBusy = false;
            });
        },
        ...mapActions({
            setToken: 'setToken',
            setUserByAPI: 'setUserByAPI',
        }),
    },
};
