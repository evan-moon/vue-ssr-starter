import Vue from 'vue';
import Header from 'components/Header';

describe('Header.vue', () => {
    it('Check msg on Header component', () => {
        const vm = new Vue(Header).$mount();

        expect(vm.msg).to.contain('This is Global Header');
    });
});
