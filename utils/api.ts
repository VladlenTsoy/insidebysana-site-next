import {removeCookie, setCookie} from "./cookie"


if(!process.env.NEXT_PUBLIC_DOMAIN_API) throw Error("Error NEXT_PUBLIC_DOMAIN_API not find!")

export const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN_API
export const DOMAIN_API = `${DOMAIN}/api`

const TOKEN_NAME = "site_token_access"

export const updateToken = (token: string | null) => {
    if (token) setCookie(TOKEN_NAME, token, {expires: 30})
    else removeCookie(TOKEN_NAME)
}
