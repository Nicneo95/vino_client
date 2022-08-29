import React, { useEffect, useState } from "react";

import UserContext from '../contexts/UserContext';

import {
    userLogin,
    userRegister,
    getUserInfo,
    getUserInfoFromLocalStorage,
    refreshAccessToken,
    getHttpHeaders,
    userLogout,

} from '../utilities/users'

export default function UserProvider(props) {

    let [userInfo, setUserInfo] = useState();
    let [loginStatus, setLoginStatus] = useState(false);

    const context = {
        userLogin: async (email, password) => {
            let loginStatus = await userLogin(email, password)
            if (loginStatus === true) {
                setLoginStatus(true)
            } else {
                return loginStatus
            }
        },

        userRegister : async(first_name, last_name, email, password) => {
            let registerStatus = await userRegister(first_name, last_name, email, password)
            if(registerStatus === true){
                setLoginStatus(true)
            } else {
                return registerStatus
            }
        },

        getUserInfo: () => {
            return userInfo
        },

        userLogout: async () => {
            let logoutStatus = await userLogout()
            if (logoutStatus === true) {
                setLoginStatus(false)
            }
            setUserInfo(null)
            localStorage.removeItem(`loggedInCart`)
        },

        getLoginStatus: () => {
            return loginStatus
        }
    }

    useEffect(() => {

        const fetchUserData = async () => {

            let authHeaders = getHttpHeaders();

            let userInfoResult = await getUserInfo(authHeaders)

            setUserInfo(userInfoResult)
        }

        if (loginStatus) {
            fetchUserData();

            setInterval(async () => {
                // i.e. only get new access token if user is still logged in
                if (localStorage.getItem('userInfo')) {
        
                    let accessToken = await refreshAccessToken()
        
                    if (accessToken) {

                        console.log('////////')

                        let userTokenInfo = JSON.parse(localStorage.getItem('userTokenInfo'))
        
                        userTokenInfo.accessToken = accessToken
        
                        localStorage.setItem('userTokenInfo', JSON.stringify(userTokenInfo))
                    } else {
                        setLoginStatus(false)
                    }
                }
            }, 1000 * 60 * 12)
        }

    }, [loginStatus])

    useEffect(() => {
        let userInfo = getUserInfoFromLocalStorage();
        userInfo ? setLoginStatus(true) : setLoginStatus(false)
        setUserInfo(userInfo)

        let checkingRefreshToken = setInterval(async () => {
            // i.e. only get new access token if user is still logged in
            if (localStorage.getItem('userInfo')) {
    
                let accessToken = await refreshAccessToken()
    
                if (accessToken) {
                    let userTokenInfo = JSON.parse(localStorage.getItem('userTokenInfo'))
    
                    userTokenInfo.accessToken = accessToken
    
                    localStorage.setItem('userTokenInfo', JSON.stringify(userTokenInfo))
                } else {
                    setLoginStatus(false)
                }
            }
        }, 1000 * 30)

        if(loginStatus){
            clearInterval(checkingRefreshToken)
        }

    }, [])

    return <UserContext.Provider value={context}>
        {props.children}
    </UserContext.Provider>
}
