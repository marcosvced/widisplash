<template>
  <div class="a-photos__photo -upload -display-column -align-center -justify-center" v-hover>
    <fade>
      <div v-show="progress <= 0" class="m-upload__wrapper -display-column -align-center">
        <i class="a-icon -upload-cloud -mb-1" style="--icon-size: 100px" />
        <span>Add a new photo</span>
      </div>
    </fade>
    <fade>
      <span v-show="progress > 0" class="a-progress -col-12" :style="`--progress:${progress}%`" />
    </fade>
    <input ref="upload" type="file" @change="upload">
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import FirebaseModule from '../../../modules/shared/Firebase.module'
import Fade from '~/components/shared/Fade.vue'
@Component({
  components: { Fade }
})
export default class Upload extends Vue {
  protected progress: number = 0;
  protected upload ($event: any) {
    const task = FirebaseModule.upload($event.target.files[0])

    task.on(this.$fireStorageObj.TaskEvent.STATE_CHANGED, (snapshot: any) => {
      this.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    }, (error: any) => {
      console.error(error)
    }, () => {
      task.snapshot.ref.getDownloadURL().then((response: any) => {
        FirebaseModule.addPhotoToList(task.snapshot.ref, response, this.$store)
        this.progress = 0
      })
    })
  }
}
</script>

<style scoped>

</style>
