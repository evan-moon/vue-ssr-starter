import Vue from 'vue';
import Home from 'components/pages/Home/Home';

describe('Home.vue', () => {
    it('홈의 메시지를 검사한다', () => {
        const vm = new Vue(Home).$mount();

        expect(vm.msg).to.contain('Home: Welcome to Your Vue.js App');
    });
});
