export default defineNuxtRouteMiddleware(async (to, from) => {
    const userData = localStorage.getItem('userData');
    var isLoggedIn = userData === 'null' || userData === null ? false : true;

    if (to.path !== '/login' && !isLoggedIn) {
        return navigateTo('/login');
    }
    else if (to.path === '/login' && isLoggedIn) {
        return navigateTo('/');
    }

   
    // //refresh token
    // if (isLoggedIn) {
    //     const pawraPath = usePath()
    //     const userData = JSON.parse(localStorage.getItem('userData') ?? '');
    //     const token = userData.access_token;

    //     //request to refresh token POST /token/refresh
    //     const response = await useFetch(`${pawraPath.value}/token/refresh`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json'
    //         },
    //         body: JSON.stringify({ access_token: token }),
    //         onResponseError: (error) => {
    //             // console.log(error);
    //             return navigateTo(from.path);
    //         }
    //     }).then((res) => {
    //         console.log(res);
    //         localStorage.setItem('userData', JSON.stringify(res.data));
    //     }).catch((err) => {
    //         localStorage.setItem('userData', '');
    //     });
    // }
});
