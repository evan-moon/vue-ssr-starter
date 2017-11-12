import { AuthState } from './state';
import Actions from './actions';
import Getters from './getters';
import Mutations from './mutations';

export const AuthStoreModule = {
    state: AuthState,
    actions: Actions,
    getters: Getters,
    mutations: Mutations,
};
