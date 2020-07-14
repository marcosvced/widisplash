import { Vue } from 'vue-property-decorator'

export const hover = {
  bind (el: HTMLElement, binding: any, vnode: any) {
    if (el) {
      el.addEventListener('mouseover', () => {
        vnode.context.$store.dispatch('mouse/OVER', true)
      })
      el.addEventListener('mouseleave', () => {
        vnode.context.$store.dispatch('mouse/OVER', false)
      })
    }
  },
  unbind(el: HTMLElement, binding: any, vnode: any) {
    vnode.context.$store.dispatch('mouse/OVER', false)
  }

}
Vue.directive('hover', hover)
