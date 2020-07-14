<template>
  <div>
    <wd-header />
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
import wdHeader from '~/components/molecules/Header'
import FirebaseModule from '~/modules/shared/Firebase.module'

@Component({
  components: {
    wdHeader,
    MouseCursor
  }
})
export default class Default extends Vue {
  beforeCreate () {
    FirebaseModule.authStateChanged(this.$router, this.$store)
  }
}
</script>
