import {removeCookie, setCookie} from "./cookie"

export const DOMAIN_API =
    process.env.NODE_ENV === "production" ? "https://insidebysana-api.herokuapp.com/api" : "http://localhost:9000/api"

const TOKEN_NAME = "site_token_access"

export const updateToken = (token: string | null) => {
    if (token) setCookie(TOKEN_NAME, token, {expires: 30})
    else removeCookie(TOKEN_NAME)
}
