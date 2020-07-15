<template>
  <transition name="fade">
    <slot />
  </transition>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class Fade extends Vue {
}
</script>

<style scoped lang="scss">
.fade-enter-active, .fade-leave-active {
  transition: opacity .6s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
