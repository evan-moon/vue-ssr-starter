import Mutations from '../../../src/stores/auth/mutations';

describe('Store/Auth', () => {
    it('Auth Store 토큰 변이를 검사한다', () => {
        const state = { token: '' };
        Mutations.SET_TOKEN(state, 'test-123');
        expect(state.token).to.equal('test-123');
    });
});
