import Vue from 'vue'
import Vuex from 'vuex'

import dealStore from './modules/dealStore'
import manageStore from './modules/manageStore'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    dealStore,
    manageStore,
  },
})
