import Vue from 'vue'
import Vuex from 'vuex'
import { mouse } from '~/store/modules/Mouse'

Vue.use(Vuex)
const store = () => new Vuex.Store({
  modules: {
    mouse
  }
})
export default store
