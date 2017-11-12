import Vue from 'vue';
import Home from 'components/pages/Home/Home';

describe('Home.vue', () => {
    it('Check message on Home component', () => {
        const vm = new Vue(Home).$mount();

        expect(vm.msg).to.contain('Hello, World!');
    });
});
