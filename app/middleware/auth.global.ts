export default defineNuxtRouteMiddleware((to, from) => {
  const accessToken = useCookie('access_token')

  if (to.path === '/auth' && accessToken.value) {
    return navigateTo('/')
  }

  if (!accessToken.value && to.path !== '/auth') {
    return navigateTo('/auth')
  }
})
