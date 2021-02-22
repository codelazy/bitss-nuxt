<template>
  <v-container fluid  class="d-flex">
    <v-row justify="center" align="center" >
      <v-col cols="6">
        <h2 class="text-h5 mb-8 mt-8 text-center"><b>{{ $t('register.pageTitle') }}</b></h2>
        <form>
          <v-text-field
            v-model="name"
            :error-messages="nameErrors"
            outlined
            :counter="10"
            label="Name"
            required
          ></v-text-field>
          <v-text-field
            v-model="email"
            :error-messages="emailErrors"
            outlined
            label="E-mail"
            required
          ></v-text-field>
          <v-text-field
            v-model="password"
            :error-messages="passwordErrors"
            outlined
            label="Password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show1 ? 'text' : 'password'"
            hint="At least 8 characters"
            counter
            required
            @click:append="show1 = !show1"
          ></v-text-field>
          <v-row>
            <v-col cols="6">
              <v-checkbox
                class="mt-0 pt-0"
                v-model="checkbox"
                :error-messages="checkboxErrors"
                :label="$t('register.form.termsConditions')"
                required
              ></v-checkbox>
            </v-col>
            
          </v-row>          
          <v-btn block
            color="primary"
            class="py-6 px-10">
            {{ $t('register.form.submit') }}
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
      passwordErrors: '',
      checkbox: false,
      password: 'Password',
      show1: false,
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters',
        emailMatch: () => (`The email and password you entered don't match`),
      }
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