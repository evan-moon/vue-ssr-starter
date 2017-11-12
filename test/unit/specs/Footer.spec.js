import Vue from 'vue';
import Footer from 'components/Footer';

describe('Footer.vue', () => {
    it('Check msg on Footer component', () => {
        const vm = new Vue(Footer).$mount();

        expect(vm.msg).to.contain('This is Global Footer');
    });
});
