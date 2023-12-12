export default defineNuxtRouteMiddleware((to, from) => {
    const userData = localStorage.getItem('userData');
    const isLoggedIn = userData !== null;
    console.log('isLoggedIn', isLoggedIn);

    if (to.path !== '/login' && !isLoggedIn) {
        return navigateTo('/login');
    }
    else if (to.path === '/login' && isLoggedIn) {
        return navigateTo('/');
    }
});
