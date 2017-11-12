/*
    @name: auth/index.js
    @desc: Auth스토어 모듈
    @author: Evan Moon
    @created_at: 2017.08.27
*/

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
