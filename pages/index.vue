<template>
  <div class="o-login--container">
    <div class="m-login__wrapper -col-6">
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
        @input="password = $event"
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

@Component({
  components: { wdButton, wdInput }
})
export default class Index extends Vue {
  protected message: string = '';

  get password (): string {
    return this.$store.state.user.pass
  }

  set password (value: string) {
    this.$store.commit('user/SET_PASSWORD', value)
  }

  protected checkPassword () {
    if (new PasswordModule(this.password || '').isValid) {
      this.$router.push({ name: 'home' })
      return
    }
    this.message = 'The password is incorrect'
  }
}
</script>

<style lang="scss">
.o-login--container {
  position: relative;
  height: 100vh;
  overflow: hidden;

  .m-login__wrapper {
    position: absolute;
    left: 0;
    right: 0;
    top: -#{2*3}rem;
    bottom: 0;
    margin: auto;
    height: fit-content;
  }
}
</style>
