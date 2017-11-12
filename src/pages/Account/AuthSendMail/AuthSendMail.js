/*
    @name: AuthSendMail
    @desc: 유저가 이메일을 입력하면 인증 메일을 발송하는 페이지
    @author: Evan Moon
    @created_at: 2017.09.12
*/
import SendMailForm from 'src/components/forms/SendMail.form.vue';

export default {
    name: 'AuthSendMail',
    components: {
        SendMailForm,
    },
    data () {
        return {
            email: null,
            isDone: false,
        };
    },
    methods: {
        submit ({ res, email }) {
            if (res.status.code === '0000') {
                this.isDone = true;
                this.$set(this, 'email', email);
            }
        },
    },
};
