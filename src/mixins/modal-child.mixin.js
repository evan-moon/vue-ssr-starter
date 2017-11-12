/*
    @name: modal-child.mixin.js
    @desc: 컴포넌트 내부의 b-modal 컨트롤 메소드 믹스인
    @author: Evan Moon
    @created_at: 2017.10.05
*/

export const ModalChildMixin = {
    methods: {
        show () {
            this.$refs.modal.show();
            this.$emit('shown');
        },
        hide () {
            this.$refs.modal.hidden();
            this.$emit('hidden');
        },
    },
};
