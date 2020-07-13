import Vue from 'vue'
import Vuex from 'vuex'
import { mouse } from '~/store/modules/Mouse'
import { user } from '~/store/modules/User'

Vue.use(Vuex)
const store = () => new Vuex.Store({
  modules: {
    mouse,
    user
  }
})
export default store
