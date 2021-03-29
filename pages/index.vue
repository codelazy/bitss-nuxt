<template>
  <v-main class="pt-0">
    <v-container fluid >
        <v-row justify="center" align="center" no-gutters class="mx-4 mt-n10">
          <v-col cols="12" sm="8" md="6">
            <h1 class="text-h5 font-weight-black">{{ $t('homepage.banner.bannerTitle') }}</h1>
            <h2 class="text-h3 font-weight-black"><span class="textPrimary--text">{{ $t('homepage.banner.bannerSubTitle1') }}</span> <span class="">{{ $t('homepage.banner.bannerSubTitle2') }}</span> <span class="primary--text">{{ $t('homepage.banner.bannerSubTitle3') }}</span></h2>
            <p class="mt-2 text-h5 font-weight-light">{{ $t('homepage.banner.bannerCaption') }}</p>

            <v-dialog
              v-model="dialog"
              max-width="800px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn  v-bind="attrs" v-on="on" to="#" ripple elevation="0" rounded color="primary" class="text-h6 px-8 font-weight-regular py-8 text-lowercase background primary--text" >
                  <v-icon large left class="mr-4">mdi-play-circle</v-icon>
                  {{ $t('homepage.banner.bannerLink') }}
                </v-btn>
              </template>
              <v-card tile elevation="0" flat class="pa-0">
                <v-card-text class="pa-0">
                  <iframe width="100%" height="390" src="https://www.youtube.com/embed/Otg5SzdoThM" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </v-card-text>
              </v-card>
            </v-dialog>
          </v-col>
          <v-col cols="12" sm="4" md="6">
            <v-img
              :lazy-src="require('../assets/img/banner.svg')"
              max-height="600"
               :src="require('../assets/img/banner.svg')"
            ></v-img>
            
          </v-col>
        </v-row>
    </v-container>
    <v-sheet color="background" class="pt-12 px-8 pb-6">
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
              :disabled="!(company_name && company_url)"
              @click.stop.prevent="submit()"
              block
              depressed
              x-large
              color="primary">{{$t('homepage.form.btnSubmit')}}</v-btn>
          </v-col>
        </v-row>
        
      </form>
    </v-sheet>
    <v-row class="pa-8">
      <template v-for="item in feautured_member">
        <v-col cols="12" sm="3" md="3">
          <v-card elevation="4" class="mt-4 pa-4">
            <h6 v-text="item.title" class="text-center text-h6 font-weight-bold"/>
            <v-img
              :lazy-src="item.img"
              max-height="600"
              :src="item.img"
            ></v-img>
          </v-card>
          
        </v-col>
      </template>
    </v-row>
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
      dialog: false,
      company_name: null,
      company_url: null,
      feautured_member: [
        {title: 'dell.discount.sale', url: 'https://dell.discount.sale', img: 'https://img.freepik.com/free-vector/sale-promotion-banner-template_74379-177.jpg?size=626&ext=jpg&ga=GA1.2.1686371180.1616112000'},
        {title: 'john.discount.sale', url: 'https://john.discount.sale', img: 'https://img.freepik.com/free-vector/sale-promotion-banner-template_74379-177.jpg?size=626&ext=jpg&ga=GA1.2.1686371180.1616112000'},
        {title: 'kendall.discount.sale', url: 'https://kendall.discount.sale', img: 'https://img.freepik.com/free-vector/sale-promotion-banner-template_74379-177.jpg?size=626&ext=jpg&ga=GA1.2.1686371180.1616112000'},
        {title: 'wonder.discount.sale', url: 'https://wonder.discount.sale', img: 'https://img.freepik.com/free-vector/sale-promotion-banner-template_74379-177.jpg?size=626&ext=jpg&ga=GA1.2.1686371180.1616112000'},
      ],
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
