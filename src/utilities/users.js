import axios from 'axios'
import jwt_decode from "jwt-decode";

const BASE_API_URL = "https://vino-wine.herokuapp.com/api"


export async function userLogin(email, password) {
    try {
        let userLoginResponse = await axios.post(BASE_API_URL + '/user/login', {
            email,
            password
        })
        if (userLoginResponse.data.accessToken) {
            localStorage.setItem('userTokenInfo', JSON.stringify(userLoginResponse.data))

            return true
        } else {
            return userLoginResponse.data.error
        }
    } catch (e) {
      
        return e.response.data
    }
}

export async function userRegister(first_name, last_name, email, password){
    try{
        let userRegisterResponse = await axios.post(BASE_API_URL + '/user/register', {
            first_name,
            last_name,
            email,
            password
        })
        if(userRegisterResponse.data.accessToken){
            localStorage.setItem('userTokenInfo', JSON.stringify(userRegisterResponse.data))
            console.log('register', userRegisterResponse.data.accessToken)
            return true
        } else {
            console.log('testing register 2', userRegisterResponse.data.message)
            return userRegisterResponse.data.message
        }
    } catch (e) {
        return e.response.data.message
    }
}

export async function getUserInfo(headers) {
    let userInfoResponse = await axios.get(BASE_API_URL + '/user/profile', { headers: headers })
    localStorage.setItem('userInfo', JSON.stringify(userInfoResponse.data))
    return userInfoResponse.data
}

export function getUserInfoFromLocalStorage() {
    return JSON.parse(localStorage.getItem('userInfo'))
}

export function getRefreshToken() {
    let userTokenInfo = JSON.parse(localStorage.getItem('userTokenInfo'))
    return userTokenInfo.refreshToken ? userTokenInfo.refreshToken : null
}

export async function refreshAccessToken() {
    let userTokenInfo = JSON.parse(localStorage.getItem('userTokenInfo'))
    let result = checkTokenValidity(userTokenInfo.refreshToken)
    if(result){
        try {
            let accessTokenResponse = await axios.post(BASE_API_URL + '/user/refresh', {
                refreshToken: userTokenInfo.refreshToken
            })      
            console.log('= = = = = =')      

            return accessTokenResponse.data.accessToken
        } catch (e) {
            console.log('=======')
            localStorage.removeItem('userTokenInfo')
            localStorage.removeItem('userInfo')
            localStorage.removeItem('loggedInCart')

            console.log(e)
        }
    }    
}

export function getHttpHeaders() {
    let userTokenInfo = JSON.parse(localStorage.getItem('userTokenInfo'))
    if (userTokenInfo.accessToken) {
        let headers = {
            Authorization: `Bearer ${userTokenInfo.accessToken}`
        }

        return headers

    } else {
        console.log('////////')
        return null;
    }
}

export async function userLogout() {
    try {

        let refreshToken = getRefreshToken()

        await axios.post(BASE_API_URL + '/user/logout', { refreshToken: refreshToken })

        localStorage.removeItem('userInfo')
        localStorage.removeItem('userTokenInfo')

        return true

    } catch (e) {
        console.log(e)
    }
}

export function checkTokenValidity(token){
    let decodedToken = jwt_decode(token);
    if(decodedToken.exp > decodedToken.iat){
        return true
    } else {
        localStorage.removeItem('userTokenInfo')
        localStorage.removeItem('userInfo')
        localStorage.removeItem('loggedInCart')
        
        return false
    }
}