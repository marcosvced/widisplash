import Vue from 'vue'
import Vuex from 'vuex'
import { mouse } from '~/store/modules/Mouse'
import { user } from '~/store/modules/User'
import { photos } from '~/store/modules/Photos'

Vue.use(Vuex)
const store = () => new Vuex.Store({
  modules: {
    mouse,
    user,
    photos
  }
})
export default store
