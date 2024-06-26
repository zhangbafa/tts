// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['@nuxt/ui','@nuxtjs/supabase'],
  colorMode: {
    preference: 'light'
  },
  supabase:{
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      include: [''],
      exclude: ['/','/free','/sse','/pro'],
      cookieRedirect: true
    },
    cookieOptions: {
      maxAge: 60 * 60 * 24 * 7,
      sameSite: 'lax',
      secure: true
    }
  
  }
  
})
