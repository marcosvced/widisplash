<template>
  <smooth-scroll>
    <div class="o-photos -display-row">
      <div
        v-for="item in list"
        :key="item.id"
        class="a-photos__photo -mr-1 "
        :style="`--src:url('${item.url}')`"
      />
      <div
        v-for="item in firebasePhotos"
        :key="item"
        class="a-photos__photo -mr-1 "
        :style="`--src:url('${item}')`"
      />
      <div class="a-photos__photo -upload -display-column -align-center -justify-center">
        <transition name="fade">
          <div v-show="progress <= 0" class="m-upload__wrapper -display-column -align-center">
            <i class="a-icon -plus-circle -mb-1" style="--icon-size: 100px" />
            <span>Add a new photo</span>
          </div>
        </transition>
        <transition name="fade">
          <span v-show="progress > 0" class="a-progress -col-12" :style="`--progress:${progress}%`" />
        </transition>
        <input ref="upload" type="file" @change="upload">
      </div>
    </div>
  </smooth-scroll>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'

import PhotoModule from '~/modules/atoms/Photo.module'
import SmoothScroll from '~/components/shared/SmoothScroll.vue'
import UnsplashModule from '~/modules/shared/Unsplash.module'
import wdButton from '~/components/atoms/Button.vue'
import Input from '~/components/atoms/Input.vue'

@Component({
  components: { Input, wdButton, SmoothScroll },

  middleware: 'Auth'
})
export default class Home extends Vue {
  protected list: PhotoModule[] = [];
  protected firebasePhotos: string[] = [];
  protected progress: number = 0;

  beforeCreate () {
    new UnsplashModule(process.env.ACCESS_KEY || '').search().then((response) => {
      this.list = response
    })
  }

  mounted () {
    this._getFirebaseStorage()
  }

  protected upload ($event: any) {
    const file = $event.target.files[0]
    const metadata = { contentType: file.type }
    const task = this.$fireStorage.ref().child(`img/${new Date().getTime()}-photo`).put(file, metadata)
    task.on(this.$fireStorageObj.TaskEvent.STATE_CHANGED, (snapshot) => {
      this.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    }, (error) => {
      console.error(error)
    }, () => {
      task.snapshot.ref.getDownloadURL().then((response) => {
        this.firebasePhotos.push(response)
        this.progress = 0
      })
    })
  }

  private _getFirebaseStorage () {
    this.$fireStorage.ref().child('img').listAll().then((response) => {
      response.items.forEach((item) => {
        console.log(item)
        item.getDownloadURL().then(url => this.firebasePhotos.push(url))
      })
    })
  }
}
</script>

<style lang="scss">
.o-photos {
  width: fit-content;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
{
  opacity: 0;
}
</style>
