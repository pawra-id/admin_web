export const usePath = () => useState<string>('pawraPath', () => {
    const config = useRuntimeConfig()
    // const basePath = config.public.pawraPath
    const basePath = import.meta.env.VITE_PAWRA_BASE_URL
    return basePath
})


type UserData = {
    access_token: string,
    token_type: string,
    user: {
        id: number,
        username: string,
        email: string,
        created_at: string,
        updated_at: string
        password: string,
        longitude: string,
        latitude: string,
        summary: string,
        image: string,
    }
}

export const useGetUserData = () => useState<UserData>('getUserData', () => {
    const userData = localStorage.getItem('userData')
    if (userData) {
        return JSON.parse(userData)
    }
    return null
})

export const useSetUserData = (userData: UserData) => {
    localStorage.setItem('userData', JSON.stringify(userData))
}

export const useRemoveUserData = () => {
    localStorage.removeItem('userData')
}

export const useLogout = () => {
    useRemoveUserData()
    //refresh the page
    window.location.reload()
    navigateTo('/login')
}


//////////////////////////////Alert state
//simple state variable
export const useShowAlert = () => useState<boolean>('showAlert', () => false)

//state function that catch the alert details
export const useAlertMessage = () => useState<string>('alertMessage', () => '')
export const useAlertType = () => useState<string>('alertType', () => 'success')




