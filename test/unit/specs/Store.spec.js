import Mutations from '../../../src/stores/auth/mutations';

describe('Store/Auth', () => {
    it('check token mutation in Auth Store', () => {
        const state = { token: '' };
        Mutations.SET_TOKEN(state, 'test-123');
        expect(state.token).to.equal('test-123');
    });
});
