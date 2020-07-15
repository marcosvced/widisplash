<template>
  <div id="input" class="m-input -display-column">
    <label class="a-input__label" :for="inputId">{{ label }}</label>
    <input
      :id="inputId"
      ref="test"
      v-model="inputVal"
      class="a-input__input"
      :type="type"
      :placeholder="placeholder"
    >
    <small class="a-input__error">{{ message }}</small>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({})
export default class SxInput extends Vue {
  @Prop({ default: 'item' }) inputId!: string;
  @Prop({ default: '' }) label!: string;
  @Prop({ default: 'Escribe aquí' }) placeholder!: string;
  @Prop({ default: 'text' }) type!: string;
  @Prop({ default: '' }) message!: string;
  @Prop() value!: string;

  get inputVal () {
    return this.value
  }

  set inputVal (val) {
    this.$emit('input', val)
    this.$forceUpdate()
  }
};
</script>
