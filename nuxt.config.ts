// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['@nuxt/ui','@nuxtjs/supabase'],
  // supabase:{
  //   redirectOptions: {
  //     login: '/login',
  //     callback: '/confirm',
  //     include: undefined,
  //     exclude: [],
  //     cookieRedirect: false
  //   },
  //   cookieName:'sa'
  
  // }
  
})
