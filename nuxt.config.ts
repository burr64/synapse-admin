// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-02-12',
  css: ['~/assets/css/tailwind.css'],
  devServer: {
    host: '0.0.0.0',
    port: 3000
  },
  devtools: { enabled: true },
  modules: [
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxtjs/i18n',
    '@nuxtjs/google-fonts',
    '@nuxt/icon'
  ],
  i18n: {
    defaultLocale: process.env.DEFAULT_LOCALE || 'en',
    locales: [
      { code: 'ru', name: 'Russian', file: 'ru.json' }
    ]
  },
  runtimeConfig: {
    public: {
      homeserverUrl: process.env.HOMESERVER_URL,
      defaultLocale: process.env.DEFAULT_LOCALE,
      serverName: process.env.SERVER_NAME,
      mainColor: '#' + process.env.MAIN_COLOR || "#0dbd8c"
    }
  },
  googleFonts: {
    families: {
      Roboto: true
    },
    display: 'swap',
  }
})