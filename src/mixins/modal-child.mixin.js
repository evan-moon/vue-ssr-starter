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
