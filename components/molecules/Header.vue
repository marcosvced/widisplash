<template>
  <div class="m-header--container -display-row -align-center">
    <h1 class="a-logo -col-8">
      Meow.
    </h1>
    <div class="-col-8 a-header__icon">
      <i class="a-icon -aperture -center" style="--icon-size: 45px" />
    </div>
    <div v-if="isSingIn" class="a-header__logout -col-8 -text-right">
      <span v-hover @click="logout">Log out</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import FirebaseModule from '~/modules/shared/Firebase.module'

@Component
export default class Header extends Vue {
  protected logout () {
    FirebaseModule.logOut(this.$router, this.$store)
  }

  get isSingIn (): boolean {
    return !!this.$store.state.user.token
  }
}
</script>

<style scoped lang="scss">

</style>
