import SignupModal from 'src/components/modals/SignupModal.vue';

export default {
    name: 'Home',
    components: {
        SignupModal,
    },
    data () {
        return {
            msg: 'Hello, World!',
        };
    },
    methods: {
        hideModal () {
            this.$refs.signupModal.hide();
        },
    },
};
