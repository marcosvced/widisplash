<template>
  <div v-hover class="a-photos__photo -random -display-column -align-center -justify-center" @click="random">
    <div class="m-upload__wrapper -display-column -align-center">
      <i class="a-icon -plus-circle -mb-1" style="--icon-size: 100px" />
      <span>Add a new random photo</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Fade from '~/components/shared/Fade.vue'
import UnsplashModule from '~/modules/shared/Unsplash.module'

@Component({
  components: { Fade }
})
export default class Upload extends Vue {
  protected random () {
    new UnsplashModule(process.env.ACCESS_KEY || '').search(this.$store)
  }
}
</script>

<style scoped>

</style>
