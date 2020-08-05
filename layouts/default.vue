<template>
  <div>
    <wd-header />
    <Nuxt />
    <mouse :conf="mouseConf" />
  </div>
</template>

<style lang="scss">
@import "assets/scss/main";
</style>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Mouse, Hover, Configuration } from '@devler/mouse'
import wdHeader from '~/components/molecules/Header.vue'
import FirebaseModule from '~/modules/shared/Firebase.module'
@Component({
  directives: {
    Hover
  },
  components: {
    wdHeader,
    Mouse
  }
})
export default class Default extends Vue {
  protected mouseConf!:any;
  beforeCreate () {
    FirebaseModule.authStateChanged(this.$router, this.$store)
    this.mouseConf = new Configuration(12, '#043353')
  }
}
</script>
