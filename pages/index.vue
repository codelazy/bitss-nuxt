<template>
  <v-main>
    <v-container fluid >
        <v-row justify="center" align="center" no-gutters class="mx-4">
          <v-col cols="12" sm="8" md="6">
            <h1 class="text-h3 font-weight-black">{{ $t('homepage.banner.bannerTitle') }}</h1>
            <p class="mt-2 text-h5 font-weight-light  grey--text text--darken-2">{{ $t('homepage.banner.bannerSubTitle') }}</p>
            <a href="#" class="text-h5" >{{ $t('homepage.banner.bannerLink') }}</a>
          </v-col>
          <v-col cols="12" sm="4" md="6">
            <iframe width="100%" height="390" src="https://www.youtube.com/embed/Otg5SzdoThM" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </v-col>
        </v-row>
    </v-container>
    <v-sheet color="primary" class="pt-8 px-8 pb-2">
      <form action="/result">
        <v-row>
          <v-col cols="12" sm="4" md="5">
            <v-text-field
              v-model="company_name"
              name="company_name"
              outlined
              background-color="white"
              :placeholder="$t('homepage.form.textfieldLinkPlaceholder')"></v-text-field>
          </v-col>
          <v-col cols="12" sm="4" md="5">
            <v-text-field
              v-model="company_url"
              name="company_url"
              outlined
              background-color="white"
              :placeholder="$t('homepage.form.textfieldBrandPlaceholder')"></v-text-field>
          </v-col>
          <v-col cols="12" sm="4" md="2">
            <v-btn
              type="submit"
              @click.stop.prevent="submit()"
              block
              depressed
              x-large
              color="yellow darken-1">{{$t('homepage.form.btnSubmit')}}</v-btn>
          </v-col>
        </v-row>
      </form>
    </v-sheet>
  </v-main>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  components: {
    Logo,
    VuetifyLogo
  },
  data() {
    return {
      company_name: null,
      company_url: null
    }
  },
  methods: {
    submit(){
        //if you want to send any data into server before redirection then you can do it here
      // this.$router.push("/result?"+{company_name: this.company_name});
      this.$router.push({ path: 'result', query: { company_name: this.company_name, company_url: this.company_url } })
    }
  }
}
</script>
