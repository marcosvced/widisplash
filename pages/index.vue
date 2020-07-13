<template>
  <smooth-scroll>
    <div class="o-photos -display-row">
      <div
        v-for="item in list"
        :key="item.id"
        class="a-photos__photo -mr-1 "
        :style="`--src:url('${item.url}')`"
      />
    </div>
  </smooth-scroll>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'

import PhotoModule from '~/modules/atoms/Photo.module'
import SmoothScroll from '~/components/shared/SmoothScroll.vue'
import UnsplashModule from '~/modules/shared/Unsplash.module'

@Component({
  components: { SmoothScroll }
  /* async data () {
    await new UnsplashModule(process.env.ACCESS_KEY || '').search().then((response) => {
      return {
        list: response
      }
    })
  },
  middleware: 'Photos' */
})
export default class Index extends Vue {
  protected list: PhotoModule[] = [];

  beforeCreate () {
    new UnsplashModule(process.env.ACCESS_KEY || '').search().then((response) => {
      this.list = response
    })
  }
}
</script>

<style lang="scss">
.o-photos {
  width: fit-content;
}

.a-photos__photo {
  height: 80vh;
  width: 30vw;
  overflow: hidden;
  background: {
    image: var(--src);
    position: center;
    size: cover;
    repeat: no-repeat;
  };
  flex: 1 0 auto;
}
</style>
