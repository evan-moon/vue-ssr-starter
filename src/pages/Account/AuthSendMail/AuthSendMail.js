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
