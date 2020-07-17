<template>
  <div class="o-login--container">
    <div class="m-login__wrapper -col-22 -md-col-12 -ip-col-9 -lg-col-7 -xl-col-5">
      <h1 class="a-login__title -mb-3">
        Login
      </h1>
      <wd-input
        :input-id="'user'"
        :value="'Stitch'"
        :label="'User name'"
        :placeholder="'Writter your user name'"
        :type="'text'"
        class="-mb-1"
        disabled
      />
      <wd-input
        :input-id="'password'"
        :value="password"
        :label="'Password'"
        :placeholder="'Writter your password'"
        :type="'password'"
        :message="message"
        class="-mb-2"
        @input="value($event)"
      />
      <wd-button :text="'Sing in'" @click="checkPassword()" />
    </div>
  </div>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'
import wdInput from '~/components/atoms/Input.vue'
import wdButton from '~/components/atoms/Button.vue'
import PasswordModule from '~/modules/shared/Password.module'
import FirebaseModule from '~/modules/shared/Firebase.module'

@Component({
  components: { wdButton, wdInput }
})
export default class Index extends Vue {
  protected message: string = '';
  protected password:string = '';

  protected checkPassword () {
    if (new PasswordModule(this.password || '').isValid) {
      FirebaseModule.anonymously()
      return
    }
    this.message = 'The password isn\'t valid'
  }

  protected value (value: string) {
    this.password = PasswordModule.areCharacterValid(value) ? value : PasswordModule.removeInvalidCharacters(value)
    this.$forceUpdate()
  }
}
</script>

<style lang="scss">
@import "assets/scss/variables/sizes";
.o-login--container {
  position: relative;
  height: calc(100vh - #{$header-height});
  overflow: hidden;
  display: flex;
  top: $header-height;
  overflow-y: auto;

  .m-login__wrapper {
    left: 0;
    right: 0;
    top: -#{2*3}rem;
    bottom: 0;
    margin: auto;
    height: fit-content;
  }
}
</style>
