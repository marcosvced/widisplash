<template>
  <div>
    <Nuxt />
    <mouse-cursor :color="'#043353'" :point-size="12" />
  </div>
</template>

<style lang="scss">
@import "assets/scss/main";
</style>
<script>
import { Component, Vue } from 'vue-property-decorator'
import MouseCursor from '~/components/shared/MouseCursor'
@Component({
  components: { MouseCursor }
})
export default class Default extends Vue {
}
</script>
