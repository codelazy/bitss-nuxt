<template>
  
    <v-app >
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
        <v-flex class="d-flex justify-space-between">
          <v-img
            class="d-flex"
            lazy-src="https://bitss.com/assets/img/bitss-logo.jpg"
            max-height="50"
            max-width="120"
            src="https://bitss.com/assets/img/bitss-logo.jpg"
          ></v-img>
          <!-- <nuxt-link :to="switchLocalePath('en')" class="mx-4">English</nuxt-link>
          <nuxt-link :to="switchLocalePath('zh')" class="mx-4">Chinese</nuxt-link> -->

          <v-list dense tile elevation="0" flat >
            <v-list-item-group
              v-model="selectedNav"
              color="primary"
              class="d-flex"
            >
              <v-list-item
                v-for="(item, i) in nav"
                :key="i"
                class="mx-4"
                :to="item.url"
              >
                <v-list-item-content  :class="item.className">
                  <v-list-item-title v-text="item.title"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-flex>
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
    
    <v-footer
      dark
      padless
    >
      <v-card
        flat
        tile
        color="primary"
        class="white--text text-center"
      >
        <v-card-text>
          <v-btn
            v-for="icon in icons"
            :key="icon"
            class="mx-4 white--text"
            icon
          >
            <v-icon size="24px">
              {{ icon }}
            </v-icon>
          </v-btn>
        </v-card-text>
  
        <v-card-text class="white--text pt-0">
          Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum. Praesent ut risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum tempor vel ut orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
        </v-card-text>
  
        <v-divider></v-divider>
  
        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
        </v-card-text>
      </v-card>
    </v-footer>
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
      selectedNav: 0,
      icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram',
      ],
      nav: [
        { title: 'Home', url: '/' },
        { title: 'Why Bitss' },
        { title: 'Login', className: 'login', url: '/login' },
        { title: 'Get Started', className: 'get-started' },
      ],
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
