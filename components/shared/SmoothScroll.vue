<template>
  <div ref="scroll" class="o-scroll">
    <div ref="scroll-content" class="o-scroll__content">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { SmoothModule } from '@/modules/shared/Smooth.module'

@Component
export default class SmoothScroll extends Vue {
  private _smooth!: SmoothModule;

  mounted () {
    this._smooth = new SmoothModule(this.$refs.scroll as HTMLElement, this.$refs['scroll-content'] as HTMLElement)
  }

  updated () {
    this._smooth.setHeight()
  }

  protected beforeDestroy () {
    this._smooth.off()
  }
}
</script>

<style scoped lang="scss">
.o-scroll {
  position: fixed;
  top: 5%;
  left: 0;
  bottom: 0;
  margin: auto;
  width: 100%;
  height: fit-content;
  overflow: hidden;

  &:before {
    content: "";
    position: absolute;
    width: 15%;
    height: 100%;
    background: linear-gradient(to right, white 10% , transparent 100%);
    z-index: 1;
  }

  .o-scroll__content {
    width: fit-content;
    padding-left: 15%;
    padding-right: 5%;
  }

}
</style>
