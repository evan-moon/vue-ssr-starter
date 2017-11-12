/*
    @name: store.js
    @desc: 각 store 모듈을 종합해서 하나의 Store를 만든다
    @author: Evan Moon
    @created_at: 2017.08.21
*/

import Vue from 'vue';
import Vuex from 'vuex';

/* STORES START */
import { AuthStoreModule } from './auth/';
/* STORES END */

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth: AuthStoreModule,
    },
});
