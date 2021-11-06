import {createAsyncThunk} from "@reduxjs/toolkit"
import {ThunkProps} from "store"
import {Client as User} from "types/Client"
import {getCookie, removeCookie} from "utils/cookie"
import {DOMAIN_API} from "utils/api"

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
    throw await response.json()
})

// Вывод пользователя
export const fetchUser = createAsyncThunk<User, undefined, ThunkProps>(
    "user/fetch",
    async (_, {signal, getState}) => {
        const {auth} = getState()
        const response = await fetch(DOMAIN_API + "/client", {
            headers: {
                Authorization: "Bearer " + auth.token,
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            signal
        })
        if (response.ok) return await response.json()
        else {
            removeCookie("site_token_access")
            throw await response.json()
        }
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
    ThunkProps>("user/logout", async (_, {signal, getState}) => {
    const {auth} = getState()
    const response = await fetch(DOMAIN_API + "/client/logout", {
        method: "delete",
        headers: {
            Authorization: "Bearer " + auth.token,
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        signal
    })
    if (response.ok) return await response.json()
    throw await response.json()
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
    throw await response.json()
})

export const updateUser = createAsyncThunk<User,
    {
        full_name: string | null
        email: string | null
        phone: string | null
    },
    ThunkProps>("user/update", async (data, {signal, getState}) => {
    const {auth} = getState()
    const response = await fetch(DOMAIN_API + "/client/update", {
        method: "post",
        headers: {
            Authorization: "Bearer " + auth.token,
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        signal,
        body: JSON.stringify(data)
    })
    if (response.ok) return await response.json()
    throw await response.json()
})

export const changePassword = createAsyncThunk<{
    status: string
},
    {
        password: string
    },
    ThunkProps>("user/change-password", async (data, {signal, getState}) => {
    const {auth} = getState()
    const response = await fetch(DOMAIN_API + "/client/change-password", {
        method: "post",
        headers: {
            Authorization: "Bearer " + auth.token,
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        signal,
        body: JSON.stringify(data)
    })
    if (response.ok) return await response.json()
    throw await response.json()
})
