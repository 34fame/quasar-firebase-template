module.exports = function () {
   return {
      supportTS: false,

      boot: [
         'config',
         'i18n',
         'axios',
         'apexcharts',
         'firebase',
         'loading',
         'logger',
         'notify',
         'storage',
      ],

      css: ['app.sass'],

      extras: ['fontawesome-v5', 'roboto-font', 'material-icons'],

      build: {
         env: require('dotenv').config().parsed,
         vueRouterMode: 'history',
         chainWebpack() {},
      },

      devServer: {
         https: false,
         port: 8080,
         open: true,
      },

      framework: {
         iconSet: 'material-icons',
         lang: 'en-us',
         config: {},
         importStrategy: 'auto',
         plugins: ['Dialog', 'Loading', 'LocalStorage', 'SessionStorage', 'Notify'],
      },

      animations: ['slideInLeft', 'slideInRight', 'slideOutLeft', 'slideOutRight'],

      ssr: {
         pwa: false,
      },

      pwa: {
         workboxPluginMode: 'GenerateSW',
         workboxOptions: {},
         manifest: {
            name: `Quasar App`,
            short_name: `Quasar App`,
            description: `A Quasar Framework app`,
            display: 'standalone',
            orientation: 'portrait',
            background_color: '#ffffff',
            theme_color: '#027be3',
            icons: [
               {
                  src: 'icons/icon-128x128.png',
                  sizes: '128x128',
                  type: 'image/png',
               },
               {
                  src: 'icons/icon-192x192.png',
                  sizes: '192x192',
                  type: 'image/png',
               },
               {
                  src: 'icons/icon-256x256.png',
                  sizes: '256x256',
                  type: 'image/png',
               },
               {
                  src: 'icons/icon-384x384.png',
                  sizes: '384x384',
                  type: 'image/png',
               },
               {
                  src: 'icons/icon-512x512.png',
                  sizes: '512x512',
                  type: 'image/png',
               },
            ],
         },
      },

      cordova: {},

      capacitor: {
         hideSplashscreen: true,
      },

      electron: {
         bundler: 'packager',
         packager: {},

         builder: {
            appId: 'client',
         },

         nodeIntegration: true,

         extendWebpack() {},
      },
   }
}
