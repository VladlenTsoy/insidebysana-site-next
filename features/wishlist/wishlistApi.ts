import {createAsyncThunk} from "@reduxjs/toolkit"
import {ThunkProps} from "store"
import {ProductColorCart} from "types/cart"
import {Wishlist} from "types/wishlist"
import {DOMAIN_API} from "../../utils/api"

export const addToWishlist = createAsyncThunk<ProductColorCart["id"], ProductColorCart["id"], ThunkProps>(
    "wishlist/add",
    (productColorId, {getState}) => {
        const {auth} = getState()
        if (auth.detail) {
            fetch(DOMAIN_API + "/user/wishlist/add", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({productColorId})
            }).then()
        }
        return productColorId
    }
)

export const removeFromWishlist = createAsyncThunk<ProductColorCart["id"],
    ProductColorCart["id"],
    ThunkProps>("wishlist/remove", (productColorId, {getState}) => {
    const {auth} = getState()
    if (auth.detail) {
        fetch(DOMAIN_API + "/user/wishlist/remove", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({productColorId})
        }).then()
    }
    return productColorId
})

export const fetchWishlist = createAsyncThunk<{
    products: Wishlist[]
    productColorIds: Wishlist["product_color_id"][]
},
    undefined,
    ThunkProps>("wishlist/fetch", async (_, {signal, getState}) => {
    const {wishlist, auth} = getState()
    const productColorIds = wishlist.items
    if (auth.detail) {
        const response = await fetch(DOMAIN_API + "/user/wishlist", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            signal,
            body: JSON.stringify({productColorIds})
        })
        if (response.ok) return await response.json()
        else return response.text()
    }
    const response = await fetch(DOMAIN_API + "/wishlist", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        signal,
        body: JSON.stringify({productColorIds})
    })
    if (response.ok) return await response.json()
    else return response.text()
})
