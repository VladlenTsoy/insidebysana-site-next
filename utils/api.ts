import {removeCookie, setCookie} from "./cookie"


if(!process.env.REACT_APP_DOMAIN) throw Error("Error REACT_APP_DOMAIN not find!")

export const DOMAIN = process.env.REACT_APP_DOMAIN_API
export const DOMAIN_API = `${DOMAIN}/api`

const TOKEN_NAME = "site_token_access"

export const updateToken = (token: string | null) => {
    if (token) setCookie(TOKEN_NAME, token, {expires: 30})
    else removeCookie(TOKEN_NAME)
}
