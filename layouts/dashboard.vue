<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="mini"
      :clipped="clipped"
      :fixed="$vuetify.breakpoint.mdAndUp"
      :absolute="$vuetify.breakpoint.smAndDown"
      :temporary="$vuetify.breakpoint.smAndDown"
      app
    >
      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :href="item.href"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list-item>
        <v-btn
          class="hidden-md-and-up"
          text
          elevation="0"
          @click.stop="drawer = !drawer"
        >
          <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon> BACK
        </v-btn>
      </v-list-item>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      color="white"
      fixed
      app
      flat
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-img src="https://bitss.com/assets/img/bitss-logo.jpg" max-height="40px" max-width="200px" aspect-ratio="1.7" position="left" contain class="my-2"></v-img>
      
      <v-spacer />
    </v-app-bar>
    <v-main>
      
        <v-sheet color="grey lighten-4" class="fill-height">
        <nuxt />
        </v-sheet>
      
    </v-main>
    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
    </v-navigation-drawer>
    
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        { title: 'Explore', icon: 'mdi-home-city', href: '/' },
        // { title: 'Inspire', icon: 'mdi-account', href: '/inspire' },
        { title: 'Collection', icon: 'mdi-account', href: '/collection' },
        { title: 'Redeem', icon: 'mdi-account-group-outline', href: '/redeem' },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  },
  computed: {
    mini() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return false
        case 'sm': return false
        case 'md': return false
        case 'lg': return false
        case 'xl': return false
      }
    }
  },
}
</script>
