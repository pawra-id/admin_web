export const usePath = () => useState<string>('pawraPath', () => {
    const config = useRuntimeConfig()
    const basePath = config.public.pawraPath
    return basePath
})


type UserData = {
    token: string,
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

//state isLoggedIn
export const useIsLoggedIn = () => useState<boolean>('isLoggedIn', () => {
    const userData = useGetUserData()
    if (userData.value !== null) {
        return true
    }
    return false
})