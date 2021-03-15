<template>
  <v-app>
    <v-main>
            
      <v-app-bar
        app
        color="white"
        elevation="0"
        class="py-2">
        <v-row justify="center" align="center" >
          <v-col cols="6">
            <v-row justify="center" align="center" >
              <v-col cols="6">
                <v-img
                  class="d-flex "
                  lazy-src="https://bitss.com/assets/img/bitss-logo.jpg"
                  max-height="50"
                  max-width="120"
                  src="https://bitss.com/assets/img/bitss-logo.jpg"
                ></v-img>
              </v-col>
              <v-col cols="6">
                  <nuxt-link :to="switchLocalePath('en')" class="mx-4">English</nuxt-link>
                  <nuxt-link :to="switchLocalePath('zh')" class="mx-4">Chinese</nuxt-link>
                
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-app-bar>
      
      <nuxt />
    </v-main>
  </v-app>
</template>
<script>
export default {
  head () {
    return this.$nuxtI18nHead()
  },
  data () {
    return {
    }
  }
}
</script>