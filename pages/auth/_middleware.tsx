import {NextFetchEvent, NextRequest, NextResponse} from "next/server"

export const middleware = (req: NextRequest) => {
    if (req.cookies.site_token_access)
        return NextResponse.redirect("/account/order-history")
    else
        return NextResponse.next()
}