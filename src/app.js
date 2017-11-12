import Vue from 'vue';
import App from './App.vue';
import store from './stores/store';
import router from './router';
import { sync } from 'vuex-router-sync';

import APIService from 'src/services/API.service';

// Bootstrap
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
Vue.use(BootstrapVue);

// Validator
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);

// Moment
import VueMoment from 'vue-moment';
Vue.use(VueMoment);

// only for Client importing
// if (process.browser) {
//
// }

// Service init
APIService.init({ store, router });

export function createApp () {
    sync(store, router);

    const app = new Vue({
        router,
        store,
        render: h => h(App),
    });

    return {
        app,
        router,
        store,
    };
}
