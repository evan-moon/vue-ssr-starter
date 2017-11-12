import Vue from 'vue';
import Footer from 'components/Footer';

describe('Footer.vue', () => {
    it('푸터의 메세지를 검사한다', () => {
        const vm = new Vue(Footer).$mount();

        expect(vm.msg).to.contain('This is Global Footer');
    });
});
