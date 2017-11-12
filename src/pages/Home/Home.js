/*
    @name: Home.js
    @desc: 메인페이지 컴포넌트
    @author: Evan Moon
    @created_at: 2017.08.26
*/
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
