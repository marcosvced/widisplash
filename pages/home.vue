<template>
  <photos />
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'

import Photos from '~/components/molecules/Photos.vue'

@Component({
  components: { Photos },
  middleware: 'Auth'
})
export default class Home extends Vue {

}
</script>
