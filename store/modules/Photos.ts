import PhotoModule from '~/modules/atoms/Photo.module'

export const photos = {
  namespaced: true,
  state: {
    list: [] as PhotoModule[]
  },
  mutations: {
    SET_PHOTOS (state: any, list: PhotoModule[]) {
      state.list = [...state.list, ...list]
    },
    SET_CLEAR_LIST (state: any, list: PhotoModule[]) {
      state.list = [...list]
    }
  },
  getters: {},
  actions: {
    CLEAR (context: any) {
      context.commit('SET_CLEAR_LIST', [])
    }
  }
}
