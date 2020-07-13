export const mouse = {
  namespaced: true,
  state: {
    hover: false,
    backgroundDark: true,
    show: true
  },
  mutations: {
    MOUSE_OVER (state: any, over: boolean) {
      state.hover = over
    },
    MOUSE_OVER_SHOW (state: any, over: boolean) {
      state.show = over
    }
  },
  actions: {

    OVER (context: any, status: boolean) {
      context.commit('MOUSE_OVER', status)
    }
  }
}
