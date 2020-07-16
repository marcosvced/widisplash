<template>
  <div>
    <wd-header />
    <Nuxt />
    <mouse-cursor :conf="mouseConf" />
  </div>
</template>

<style lang="scss">
@import "assets/scss/main";
</style>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import MouseModule from '../modules/shared/Mouse.module'
import MouseCursor from '~/components/shared/MouseCursor.vue'
import wdHeader from '~/components/molecules/Header.vue'
import FirebaseModule from '~/modules/shared/Firebase.module'

@Component({
  components: {
    wdHeader,
    MouseCursor
  }
})
export default class Default extends Vue {
  protected mouseConf!:MouseModule;
  beforeCreate () {
    FirebaseModule.authStateChanged(this.$router, this.$store)
    this.mouseConf = {
      color: '#043353',
      size: 12
    }
  }
}
</script>
