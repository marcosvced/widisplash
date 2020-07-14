<template>
  <div class="a-photos__wrapper -position-relative -mr-5">
    <fade>
      <h1 v-show="show" class="a-photos__title -col-10">
        {{ item.name }}
      </h1>
    </fade>
    <fade>
      <p v-show="show" class="a-photos__abstract -col-10">
        {{ item.abstract }}
      </p>
    </fade>
    <fade>
      <div
        v-show="show"
        class="a-photos__photo  -col-20"
        :style="`--src:url('${item.url}')`"
      >
        <img v-if="!show" :src="item.url" class="-display-none" @load="isLoaded">
      </div>
    </fade>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import PhotoModule from '../../../modules/atoms/Photo.module'
import Fade from '~/components/shared/Fade.vue'

@Component({
  components: { Fade }
})
export default class Photo extends Vue {
  @Prop({ required: true }) item!: PhotoModule
  protected show: boolean = false;

  protected isLoaded () {
    this.show = true
  }
}
</script>
