import {createAsyncThunk} from "@reduxjs/toolkit"
import {ThunkProps} from "store"
import {ProductColorCart} from "types/cart"
import {DOMAIN_API} from "utils/api"

export const addToCart = createAsyncThunk<ProductColorCart["sku"], ProductColorCart["sku"], ThunkProps>(
    "cart/add",
    (sku, {getState}) => {
        const {auth} = getState()
        if (auth.detail) {
            fetch(DOMAIN_API + "/user/cart/add", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({sku})
            }).then()
        }
        return sku
    }
)

export const clearCart = createAsyncThunk<[], undefined, ThunkProps>("cart/clear", (_, {getState}) => {
    const {auth} = getState()
    if (auth.detail) {
        fetch(DOMAIN_API + "/user/cart/clear", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        }).then()
    }
    return []
})

export const fetchCart = createAsyncThunk<{
    skus: ProductColorCart["sku"][]
    products: ProductColorCart[]
},
    undefined,
    ThunkProps>("cart/fetch", async (_, {signal, getState}) => {
    const {auth, cart} = getState()
    if (auth.detail) {
        const response = await fetch(DOMAIN_API + "/user/cart", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            signal,
            body: JSON.stringify({skus: cart.skus})
        })
        if (response.ok) return await response.json()
        else return response.text()
    }
    const response = await fetch(DOMAIN_API + "/cart", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        signal,
        body: JSON.stringify({skus: cart.skus})
    })
    if (response.ok) return await response.json()
    else return response.text()
})

export const removeFromCart = createAsyncThunk<ProductColorCart["sku"], ProductColorCart["sku"], ThunkProps>(
    "cart/remove",
    (sku, {getState}) => {
        const {auth} = getState()
        if (auth.detail) {
            fetch(DOMAIN_API + "/user/cart/remove", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({sku})
            }).then()
        }
        return sku
    }
)

export const updateQtyCart = createAsyncThunk<{
    sku: ProductColorCart["sku"]
    qty: ProductColorCart["qty"]
},
    {
        sku: ProductColorCart["sku"]
        qty: ProductColorCart["qty"]
    },
    ThunkProps>("cart/update/qty", ({sku, qty}, {getState}) => {
    const {auth} = getState()
    if (auth.detail) {
        fetch(DOMAIN_API + "user/cart/update/qty", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({sku, qty})
        }).then()
    }
    return {sku, qty}
})
