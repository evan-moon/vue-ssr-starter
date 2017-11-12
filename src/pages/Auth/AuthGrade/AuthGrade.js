import moment from 'moment';
import APIService from 'src/services/API.service';

export default {
    name: 'AuthGrade',
    data () {
        return {
            leftTime: 0,
            interval: null,
        };
    },
    computed: {
        isExpired () {
            return this.leftTime < 1;
        },
        computedLeftTime () {
            let time = this.leftTime;
            if (this.isExpired) {
                time = 0;
            }
            return moment.duration(time);
        },
    },
    methods: {
        fetchLeftTime () {
            return APIService.resource('certs.signup.time').get()
            .then(res => {
                this.$set(this, 'leftTime', res.result.time * 1000);
                this.countDownStart();
            });
        },
        sendEmailAgain () {
            return APIService.resource('certs.signup.mail').post()
            .then(res => {
                alert(`The Activation mail has been sent`);
                this.fetchLeftTime();
            }, err => {
                if (err) {}
                alert(`Mail error`);
            });
        },
        countDownStart () {
            if (!this.isExpired && this.leftTime) {
                clearInterval(this.interval);
                this.interval = setInterval(() => {
                    let time = this.leftTime - 1000;
                    this.leftTime = time > 0 ? time : 0;
                }, 1000);
            }
        },
    },
    created () {
        this.fetchLeftTime();
    },
};
