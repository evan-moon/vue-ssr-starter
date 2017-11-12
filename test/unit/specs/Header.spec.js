import Vue from 'vue';
import Header from 'components/Header';

describe('Header.vue', () => {
    it('헤더의 메세지를 검사한다', () => {
        const vm = new Vue(Header).$mount();

        expect(vm.msg).to.contain('This is Global Header');
    });
});
