<template>
  <transition name="fade">
    <div
      v-show="show"
      id="mouse-cursor"
      :class="[ 'm-cursor', { '-hover': mouseState }]"
      :style="`--point:${conf.size}px; --color:${conf.color}`"
    >
      <div class="m-cursor__point" :style="matrix">
        <div class="m-cursor__point--inner" />
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import MouseModule from '~/modules/shared/Mouse.module'
@Component
export default class MouseCursor extends Vue {
  @Prop({ required: true }) conf!: MouseModule;

  protected xPoint: number = -this.conf.size;
  protected yPoint: number = -this.conf.size;
  protected show = true;

  mounted () {
    if (this._isMobile()) {
      this.show = false
      return
    }
    document.addEventListener('mousemove', this.moveCursor)
    document.addEventListener('mouseleave', () => {
      this.show = false
    })
    document.addEventListener('mouseenter', () => {
      this.show = true
    })
  }

  moveCursor ($event: MouseEvent) {
    setTimeout(() => {
      this.xPoint = $event.clientX
      this.yPoint = $event.clientY
    }, 30)
  }

  private _isMobile () {
    const toMatch = [
      /Android/i,
      /webOS/i,
      /iPhone/i,
      /iPad/i,
      /iPod/i,
      /BlackBerry/i,
      /Windows Phone/i
    ]

    return toMatch.some((toMatchItem) => {
      return navigator.userAgent.match(toMatchItem)
    })
  }

  get matrix (): string {
    return `transform: matrix(1, 0, 0, 1, ${this.xPoint - (this.conf.size / 2)}, ${this.yPoint - (this.conf.size / 2)});`
  }

  get mouseState (): boolean {
    return this.$store.state.mouse.hover
  }
}

</script>

<style scoped lang="scss">
@import "../../assets/scss/shared/mouse";
.fade-enter-active, .fade-leave-active {
  transition: opacity .6s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
