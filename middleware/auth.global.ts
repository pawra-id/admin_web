export default defineNuxtRouteMiddleware((to, from) => {
    const userData = localStorage.getItem('userData');
    var isLoggedIn = userData === 'null' || userData === null ? false : true;

    if (to.path !== '/login' && !isLoggedIn) {
        return navigateTo('/login');
    }
    else if (to.path === '/login' && isLoggedIn) {
        return navigateTo('/');
    }

    //if current time is past token expiration time, logout
    if (isLoggedIn) {
        const tokenExpiration = JSON.parse(userData).expires_in;
        const currentTime = new Date().getTime();
        if (currentTime > tokenExpiration) {
            localStorage.removeItem('userData');
            return navigateTo('/login');
        }
    }
});
