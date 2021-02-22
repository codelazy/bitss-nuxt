import colors from 'vuetify/es5/util/colors'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - bitss',
    title: 'bitss',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'nuxt-i18n'
  ],

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        light: {
          primary: colors.purple.darken3,
        },
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  //i18n Translation
  i18n: {
    locales:  [ 
      { code: 'en', iso: 'en-US', file: 'en.js', dir: 'ltr' },
      { code: 'zh', iso: 'zh-HK', file: '../i18n/hk.js'},
      { code: 'fr', iso: 'fr-FR', file: 'fr.js' },
    ],
    defaultLocale: 'en',
    vueI18n: {
      fallbackLocale: 'en',
      messages: {
        en: {
          welcome: 'Welcome',
          homepage: {
            banner: {
              bannerTitle: 'Shortened URL, decrypted.',
              bannerSubTitle: 'Say hello to branded human-readable links.',
              bannerLink: 'https://communicate.effectively.today',
            },
            form: {
              textfieldLinkPlaceholder: 'Place your target link here...',
              textfieldBrandPlaceholder: 'What is your brand?',
              btnSubmit: 'Create'
            },
          },
          login: {
            pageTitle: 'Sign in to your account',
            form: {
              namePlaceholder: 'Name',
              emailPlaceholder: 'Email',
              submit: 'Sign in',
              rememberMe: 'Remember me',
              forgotPassword: 'Forgot password?',
            }
          },
          register: {
            pageTitle: 'Create an account',
            form: {
              namePlaceholder: 'Name',
              emailPlaceholder: 'Email',
              submit: 'Register',
              termsConditions: 'Agree on Terms and Conditions',
              forgotPassword: 'Forgot password?',
            }
          },
        },
        fr: {
          welcome: 'Bienvenue',
          homepage: {
            banner: {
              bannerTitle: 'URL raccourcie, décryptée.',
              bannerSubTitle: 'Dites bonjour aux liens lisibles par lhomme.',
              bannerLink: 'https://communicate.effectively.today',
            },
          },
        },
        zh: {
          homepage: {
            banner: {
              bannerTitle: 'URL縮短，已解密。',
              bannerSubTitle: '向品牌可讀鏈接打個招呼。',
              bannerLink: 'https://communicate.effectively.today',
            },
            form: {
              textfieldLinkPlaceholder: '將您的目標鏈接放在這裡...',
              textfieldBrandPlaceholder: '你的品牌是什麼？',
              btnSubmit: '創建',
            },
          },
          login: {
            pageTitle: '登錄到您的帳戶',
            form: {
              rememberMe: '記住賬號',
              forgotPassword: '忘記密碼?',
              namePlaceholder: '姓名',
              emailPlaceholder: '電子郵件',
              submit: '登錄旅館'
            }
          },
          register: {
            pageTitle: '創建一個帳戶',
            form: {
              namePlaceholder: 'Name',
              emailPlaceholder: 'Email',
              submit: 'Register',
              termsConditions: 'Agree on Terms and Conditions',
              forgotPassword: 'Forgot password?',
            }
          },
        },
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
