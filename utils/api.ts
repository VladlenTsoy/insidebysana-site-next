import {getCookie, removeCookie, setCookie} from "./cookie"

export const DOMAIN_API =
    process.env.NODE_ENV === "production" ? "https://api.insidebysana.uz/api" : "http://localhost:9000/api"

const isSite = process.env.REACT_APP_BUILD_TARGET === "site"
const TOKEN_NAME = isSite ? "site_token_access" : "crm_token_access"
const TOKEN = getCookie(TOKEN_NAME)

export const updateToken = (token: string | null) => {
    if (token) setCookie(TOKEN_NAME, token, {expires: 30})
    else removeCookie(TOKEN_NAME)
}
