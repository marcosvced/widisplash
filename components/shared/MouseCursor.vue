<template>
  <div
    v-show="!hideCursor"
    id="mouse-cursor"
    :class="[ 'cursor', { 'cursor-hover': mouseState }, {'cursor-hidden': hideCursor} ]"
    :style="`--point-color:${color}`"
  >
    <div ref="point" class="cursor__point" :style="`${cursorPoint}`" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class MouseCursor extends Vue {
  @Prop({ required: true }) pointSize!: number;
  @Prop({ required: true }) color!: string;

  private initialPosition = -30;
  protected xChild: number = this.initialPosition;
  protected yChild: number = this.initialPosition;
  protected xParent: number = this.initialPosition;
  protected yParent: number = this.initialPosition;
  protected hideCursor = false;

  mounted () {
    if (this._isMobile()) {
      this.hideCursor = true
      return
    }
    document.addEventListener('mousemove', this.moveCursor)
    document.addEventListener('mouseleave', () => {
      this.hideCursor = true
    })
    document.addEventListener('mouseenter', () => {
      this.hideCursor = false
    })
  }

  moveCursor ($event: MouseEvent) {
    this.xChild = $event.clientX
    this.yChild = $event.clientY
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

  get cursorCircle (): string {
    return `transform: translate3d(${this.xParent}px, ${this.yParent}px, 0);`
  }

  get cursorPoint (): string {
    const size: number = this.pointSize * 2
    if (this.mouseState) {
      return `transform: translate3d(${this.xChild - (size / 2)}px, ${this.yChild - (size / 2)}px, 15px) scale(1); --point:${size}px;`
    }
    return `transform: translate3d(${this.xChild - (size / 2)}px, ${this.yChild - (size / 2)}px, 0) scale(.5); --point:${size}px;`
  }

  get mouseState (): boolean {
    return this.$store.state.mouse.hover
  }

  get isBackgroundDark (): boolean {
    return this.$store.state.mouse.backgroundDark
  }
}

</script>

<style scoped lang="scss">
@import "assets/scss/atoms/mouse";


</style>
