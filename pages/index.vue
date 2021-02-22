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
      <v-row>
        <v-col cols="12" sm="4" md="5">
          <v-text-field
            outlined
            background-color="white"
            :placeholder="$t('homepage.form.textfieldLinkPlaceholder')"></v-text-field>
        </v-col>
        <v-col cols="12" sm="4" md="5">
          <v-text-field
            outlined
            background-color="white"
            :placeholder="$t('homepage.form.textfieldBrandPlaceholder')"></v-text-field>
        </v-col>
        <v-col cols="12" sm="4" md="2">
          <v-btn
            block
            depressed
            x-large
            color="yellow darken-1">{{$t('homepage.form.btnSubmit')}}</v-btn>
        </v-col>
      </v-row>
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
  }
}
</script>
