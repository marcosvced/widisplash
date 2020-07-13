import UserModule from '~/modules/shared/User.module'

export const user = {
  namespaced: true,
  state: {
    name: undefined,
    photo: undefined,
    token: undefined,
    pass: undefined
  } as UserModule,
  mutations: {
    SET_PASSWORD (state: any, password: string) {
      state.pass = password
    }
  },
  getters: {},
  actions: {}
}
