import {createAsyncThunk} from "@reduxjs/toolkit"
// import {apiRequest} from "utils/api"
import {ThunkProps} from "store"
import {User} from "./user"
import {getCookie, removeCookie} from "utils/cookie"
import {DOMAIN_API} from "../../utils/api"

// Авторизация пользователя
export const authUser = createAsyncThunk<{
    token: string
},
    {
        email: string
        password: string
    },
    ThunkProps>("user/auth", async (data, {signal}) => {
    const response = await fetch(DOMAIN_API + "/client/login", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        signal,
        body: JSON.stringify(data)
    })
    if (response.ok) return await response.json()
    else return response.text()
})

// Вывод пользователя
export const fetchUser = createAsyncThunk<User, undefined, ThunkProps>(
    "user/fetch",
    async (_, {signal}) => {
        const response = await fetch(DOMAIN_API + "/user/", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            signal
        })
        if (response.ok) return await response.json()
        else {
            removeCookie("site_token_access")
            return response.text()
        }
        // return (await apiRequest("get", `/`, {signal, type: "user"}).catch(e => {
        //     if (e.message === "error_token") removeCookie("site_token_access")
        // })) as User
    },
    {
        condition(_) {
            if (!getCookie("site_token_access")) return false
        },
        dispatchConditionRejection: true
    }
)

// Завершения сеанса
export const logoutUser = createAsyncThunk<{
    status: "success"
},
    undefined,
    ThunkProps>("user/logout", async (_, {signal}) => {
    const response = await fetch(DOMAIN_API + "/user/logout", {
        method: "delete",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        signal
    })
    if (response.ok) return await response.json()
    else return response.text()
})

//
export const registrationUser = createAsyncThunk<{
    token: string
},
    {
        full_name: string
        login: string
        password: string
    },
    ThunkProps>("user/registration", async (data, {signal}) => {
    const response = await fetch(DOMAIN_API + "/client/registration", {
        method: "post",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        signal,
        body: JSON.stringify(data)
    })
    if (response.ok) return await response.json()
    else return response.text()
})

export const updateUser = createAsyncThunk<User,
    {
        full_name: string | null
        email: string | null
        phone: string | null
    },
    ThunkProps>("user/update", async (data, {signal}) => {
    const response = await fetch(DOMAIN_API + "/user/update", {
        method: "post",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        signal,
        body: JSON.stringify(data)
    })
    if (response.ok) return await response.json()
    else return response.text()
})

export const changePassword = createAsyncThunk<{
    status: string
},
    {
        password: string
    },
    ThunkProps>("user/change-password", async (data, {signal}) => {
    const response = await fetch(DOMAIN_API + "/user/change-password", {
        method: "post",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        signal,
        body: JSON.stringify(data)
    })
    if (response.ok) return await response.json()
    else return response.text()
})
