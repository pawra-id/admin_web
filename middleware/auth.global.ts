export default defineNuxtRouteMiddleware((to, from) => {
    const userData = localStorage.getItem('userData');
    var isLoggedIn = userData === 'null' || userData === null ? false : true;

    if (to.path !== '/login' && !isLoggedIn) {
        return navigateTo('/login');
    }
    else if (to.path === '/login' && isLoggedIn) {
        return navigateTo('/');
    }
});
