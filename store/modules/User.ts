import UserModule from '~/modules/shared/User.module'

export const user = {
  namespaced: true,
  state: {
    name: undefined,
    photo: undefined,
    token: undefined
  } as UserModule,
  mutations: {
    SET_TOKEN (state: any, token: string) {
      state.token = token
    },
    SET_NAME (state: any, name: string) {
      state.name = name
    },
    SET_PHOTO (state: any, photo: string) {
      state.photo = photo
    }
  },
  getters: {},
  actions: {
    CLEAR (context: any) {
      context.commit('SET_NAME', undefined)
      context.commit('SET_PHOTO', undefined)
      context.commit('SET_TOKEN', undefined)
    }
  }
}
