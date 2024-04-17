export default defineNuxtRouteMiddleware((to, _from) => {
    const session = useSupabaseSession()
    // const user = useSupabaseUser()
    // console.log(user)
    console.log('已经登录了')
    // if (!session.value) {
    //  // return navigateTo('/login')
    // }
  })
  