<template>
  <div ref="scroll">
    <div ref="scroll-content">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { SmoothModule } from '@/modules/shared/Smooth.module'

@Component
export default class SmoothScroll extends Vue {
  private _smooth!:SmoothModule;
  mounted () {
    this._smooth = new SmoothModule(this.$refs.scroll as HTMLElement, this.$refs['scroll-content'] as HTMLElement)
  }

  protected beforeDestroy () {
    this._smooth.off()
  }
}
</script>

<style scoped>

</style>
