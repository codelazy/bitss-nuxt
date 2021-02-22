<template>
  <v-container fluid  class="d-flex">
    <v-row justify="center" align="center" >
      <v-col cols="6">
        <h2 class="text-h5 mb-8 mt-8 text-center"><b>{{ $t('login.pageTitle') }}</b></h2>
        <form>
          <v-text-field
            v-model="name"
            :error-messages="nameErrors"
            outlined
            :counter="10"
            :label="$t('login.form.namePlaceholder')"
            required
          ></v-text-field>
          <v-text-field
            v-model="email"
            :error-messages="emailErrors"
            outlined
            :label="$t('login.form.emailPlaceholder')"
            required
          ></v-text-field>
          <v-row>
            <v-col cols="6">
              <v-checkbox
                class="mt-0 pt-0"
                v-model="checkbox"
                :error-messages="checkboxErrors"
                :label="$t('login.form.rememberMe')"
                required
              >{{$t('login.form.rememberMe')}}</v-checkbox>
            </v-col>
            <v-col cols="6">
              <v-btn 
                text>
                {{$t('login.form.forgotPassword')}}</v-btn>
            </v-col>
          </v-row>          
          <v-btn block
            color="primary"
            class="py-6 px-10">
            {{ $t('login.form.submit') }}
          </v-btn>
          
        </form>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      nameErrors: '',
      emailErrors: '',
      checkboxErrors: '',
      checkbox: false,
    }
  },
  // methods: {
  //   async userLogin() {
  //     try {
  //       let response = await this.$auth.loginWith('local', { data: this.login })
  //       console.log(response)
  //     } catch (err) {
  //       console.log(err)
  //     }
  //   }
  // }
}
</script>