<template>
  <div
    id="button"
    v-hover
    :class="['a-btn -text-center', 'a-btn__wrapper',`a-btn--${btnType}`]"
    :disabled="disabled"
    @click="onClick"
  >
    <span class="a-content">{{ text }}</span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Button extends Vue {
  @Prop({ default: 'primary' }) btnType!: string;
  @Prop({ default: 'Accept' }) text!: string;
  @Prop({ default: false }) disabled!: boolean;

  protected onClick () {
    this.$emit('click')
  }
}
</script>
