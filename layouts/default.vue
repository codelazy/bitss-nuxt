<template>
  <v-app>
    <template  v-if="this.$route.path == '/login' || this.$route.path == '/zh/login' ||  this.$route.path == '/zh/register' ||  this.$route.path == '/register'">
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
      
    </template>
    <template v-else>
      <v-app dark>
        <v-navigation-drawer
          v-model="drawer"
          :mini-variant="miniVariant"
          :clipped="clipped"
          fixed
          app
        >
          <v-list>
            <v-list-item
              v-for="(item, i) in items"
              :key="i"
              :to="item.to"
              router
              exact
            >
              <v-list-item-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title v-text="item.title" />
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
        <v-app-bar
          :clipped-left="clipped"
          fixed
          app
          color="white"
          elevation="0"
          class="py-2"
        >
            <v-img
              class="d-flex"
              lazy-src="https://bitss.com/assets/img/bitss-logo.jpg"
              max-height="50"
              max-width="120"
              src="https://bitss.com/assets/img/bitss-logo.jpg"
            ></v-img>
            <nuxt-link :to="switchLocalePath('en')" class="mx-4">English</nuxt-link>
            <nuxt-link :to="switchLocalePath('zh')" class="mx-4">Chinese</nuxt-link>
            <!-- <a
              href="zh"
              @click="$router.push(localeRoute({
                name: 'index',
                params: { locale: 'zh' }
              }))">Navigate</a> -->
          
          <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
          <v-btn
            icon
            @click.stop="miniVariant = !miniVariant"
          >
            <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
          </v-btn>
          <v-btn
            icon
            @click.stop="clipped = !clipped"
          >
            <v-icon>mdi-application</v-icon>
          </v-btn>
          <v-btn
            icon
            @click.stop="fixed = !fixed"
          >
            <v-icon>mdi-minus</v-icon>
          </v-btn>
          <v-toolbar-title v-text="title" />
          <v-spacer />
          <v-btn
            icon
            @click.stop="rightDrawer = !rightDrawer"
          >
            <v-icon>mdi-menu</v-icon>
          </v-btn> -->
        </v-app-bar>
        <v-main>
          <nuxt />
        </v-main>
        <v-navigation-drawer
          v-model="rightDrawer"
          :right="right"
          temporary
          fixed
        >
          <v-list>
            <v-list-item @click.native="right = !right">
              <v-list-item-action>
                <v-icon light>
                  mdi-repeat
                </v-icon>
              </v-list-item-action>
              <v-list-item-title>Switch drawer (click me)</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
      </v-app>
    </template>
  </v-app>
</template>

<script>

export default {
  head () {
    return this.$nuxtI18nHead()
  },
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  }
}
</script>
