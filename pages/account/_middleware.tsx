import {NextFetchEvent, NextRequest, NextResponse} from "next/server"

export const middleware = (req: NextRequest) => {
    if (req.cookies.site_token_access) {
        if (req.url === "/account")
            return NextResponse.redirect("/account/order-history")
        return NextResponse.next()
    } else
        return NextResponse.redirect("/auth/login")
}