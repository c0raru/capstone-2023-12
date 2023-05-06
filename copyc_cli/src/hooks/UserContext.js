import axios from 'axios';

import { createContext, useContext, useEffect, useState } from 'react';

const Context = createContext([])

export function UserProvider({children}) {

    const [userinfo, setUserinfo] = useState({
        "loading": true
    })

    useEffect(() => {
        isLogin()
    }, [])

    const isLogin = () => {
        return new Promise((resolve, reject) => {
            axios.get("user/")
            .then(res => {
                const data = {
                    "is_login": true,
                    "data": res.data
                }
                setUserinfo(data)
                resolve(data)
            })
            .catch(err => {
                setUserinfo({
                    "is_login": false
                })
            })            
        })
    }

    const logout = () => {
        return axios.delete("user/").then(isLogin)
    }

    const get = (id) => {
        return axios.get("user/" + id + "/")
    }

    const login = ({username, password}) => {
        return axios.post("user/", {username, password}).then(isLogin)
    }

    const register = (data) => {
        return axios.put("user/", data)
    }

    const socialRegister = ({email, code, fullname, nickname, youtube}) => {
        return axios.put("user/login/", {email, code, fullname, nickname, youtube})
    }

    const findAccount = (fullname, phone) => {
        return axios.post("user/find/username/", {fullname, phone})
    }

    const findPassword = (fullname, phone, username) => {
        return axios.put("user/find/password/", {fullname, phone, username})
    }

    const resetPassword = (fullname, phone, username, code, password) => {
        return axios.post("user/find/password/", {fullname, phone, username, code, password})
    }

    const setThumbnail = (thumbnail) => {
        return axios.post("user/thumbnail/", {thumbnail})
    }

    const sendAuthMail = (email) => {
        return axios.post("user/auth/email/", {email})
    }

    const changePassword = ({password, password_new}) => {
        return axios.post("user/password/", {password, password_new})
    }

    const changeNickname = ({nickname}) => {
        return axios.post("user/nickname/", {nickname})
    }

    const deleteUser = (password) => {
        return axios.post("user/deleteuser/", {password})
    }

    const updateSosok = (sosok) => {
        return axios.post("user/sosok/", {sosok})
    }

    const changeThumbnail = (code) => {
        return axios.post("user/thumbnail/", {code})
    }

    const forgotPassword = ({email, code, password}) => {
        const password_new = password
        return axios.post("user/reset/password/", {email, code, password_new})
    }

    const checkEmail = (email) => {
        return axios.post("user/check/email/", {email})
    }

    const changeProfile = ({nickname, youtube}) => {
        return axios.post("user/profile/", {nickname, youtube})
    }

    const context = {
      isLogin,
      login,
      logout,
      get,
      register,
      userinfo,
      findAccount,
      findPassword,
      sendAuthMail,
      resetPassword,
      setThumbnail,
      changePassword,
      deleteUser,
      updateSosok,
      changeNickname,
      changeThumbnail,
      forgotPassword,
      checkEmail,
      changeProfile,
      socialRegister
    };

    return (
        <Context.Provider value={context}>
            {children}
        </Context.Provider>
    )
}

export function useUser() {
    return useContext(Context);
}

export default {
    UserProvider, useUser
}
