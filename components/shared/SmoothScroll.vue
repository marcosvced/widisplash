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

  updated () {
    this._smooth = new SmoothModule(this.$refs.scroll as HTMLElement, this.$refs['scroll-content'] as HTMLElement)
  }

  protected beforeDestroy () {
    this._smooth.off()
  }
}
</script>

<style scoped>
.o-scroll__content {
  width: fit-content;
}
</style>
