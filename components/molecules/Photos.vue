<template>
  <smooth-scroll>
    <div class="m-photos -display-row">
      <template v-if="list.length > 0">
        <photo v-for="item in list" :key="item.id" :item="item" />
      </template>
      <random class="-mr-1" />
      <upload />
    </div>
  </smooth-scroll>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'
import FirebaseModule from '../../modules/shared/Firebase.module'
import UnsplashModule from '~/modules/shared/Unsplash.module'
import PhotoModule from '~/modules/atoms/Photo.module'
import SmoothScroll from '~/components/shared/SmoothScroll.vue'
import Photo from '~/components/atoms/photos/Photo.vue'
import Upload from '~/components/atoms/photos/Upload.vue'
import Random from '~/components/atoms/photos/Random.vue'
@Component({
  components: { Random, Upload, Photo, SmoothScroll }
})
export default class Photos extends Vue {
  protected firebasePhotos: string[] = [];
  beforeCreate () {
    this.$store.dispatch('photos/CLEAR')
  }

  async created () {
    await new UnsplashModule(process.env.ACCESS_KEY || '').search(this.$store)
    await FirebaseModule.firebasePhotos(this.$store)
  }

  get list ():PhotoModule[] {
    return this.$store.state.photos.list
  }
}
</script>

<style scoped lang="scss">
.m-photos {
  width: fit-content;
}
</style>
