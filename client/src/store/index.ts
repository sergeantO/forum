import Vue from 'vue';
import Vuex from 'vuex';

import User from './modules/user.module'
import App from './modules/app.module'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    User,
    App,
  },
});
