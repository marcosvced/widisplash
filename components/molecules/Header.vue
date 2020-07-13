<template>
  <div class="m-header--container -display-row -align-center -justify-between">
    <h1 class="a-logo">
      WS.
    </h1>
    <i class="a-icon -aperture" style="--icon-size: 45px" />
    <span @click="logout">Log out</span>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Header extends Vue {
  protected logout () {
    this.$fireAuth.signOut().then(() => {
      this.$router.push({ name: 'index' })
    }).catch((error) => {
      console.error('Logout error: ', error)
    })
  }
}
</script>

<style scoped lang="scss">

</style>
