import {ProductColor} from "types/productColor"
import {ProductColorCart} from "types/cart"
import {PromoCode} from "types/PromoCode"
import {Delivery} from "../types/Delivery"

export const ViewItem = (product: ProductColor) => {
    if (window?.dataLayer) {
        // Measure a view of product details. This example assumes the detail view occurs on pageload,
        window?.dataLayer.push({ecommerce: null})  // Clear the previous ecommerce object.
        window?.dataLayer.push({
            event: "view_item",
            ecommerce: {
                items: [{
                    item_name: product.title,
                    item_id: product.id,
                    price: product.price,
                    item_brand: "Inside By Sana",
                    item_variant: product.color.title,
                    item_list_id: "PC" + product.id
                }],
                value: product.price,
                content_type: "product",
                content_ids: [product.id]
            }

        })
    }
}

export const AddToCart = (product: ProductColor) => {
    if (window?.dataLayer) {
        window?.dataLayer.push({ecommerce: null})
        window?.dataLayer.push({
            event: "add_to_cart",
            ecommerce: {
                items: [{
                    item_name: product.title,
                    item_id: product.id,
                    price: product.price,
                    item_brand: "Inside By Sana",
                    item_variant: product.color.title,
                    item_list_id: "PC" + product.id,
                    quantity: 1
                }],
                value: product.price,
                content_type: "product",
                content_ids: [product.id]
            }
        })
    }
}

export const AddToWishlist = (product: ProductColor) => {
    if (window?.dataLayer) {
        window?.dataLayer.push({ecommerce: null})
        window?.dataLayer.push({
            event: "add_to_wishlist",
            ecommerce: {
                items: [{
                    item_name: product.title,
                    item_id: product.id,
                    price: product.price,
                    item_brand: "Inside By Sana",
                    item_variant: product.color.title,
                    item_list_id: "PC" + product.id,
                    quantity: 1
                }],
                value: product.price,
                content_type: "product",
                content_ids: [product.id]
            }
        })
    }
}

export const BeginCheckout = (products: ProductColorCart[]) => {
    if (window?.dataLayer) {
        window?.dataLayer.push({ecommerce: null})
        window?.dataLayer.push({
            event: "begin_checkout",
            ecommerce: {
                items: products.map((product) => ({
                    item_name: product.title,
                    item_id: product.id,
                    price: product.price,
                    item_brand: "Inside By Sana",
                    item_variant: product.color.title,
                    item_list_id: "PC" + product.id,
                    quantity: product.qty
                })),
                value: products.reduce((acc, product) => acc + product.price, 0),
                content_type: "product",
                content_ids: products.map(product => product.id)
            }
        })
    }
}

export const AddShippingInfo = (products: ProductColorCart[]) => {
    if (window?.dataLayer) {
        window?.dataLayer.push({ecommerce: null})
        window?.dataLayer.push({
            event: "add_shipping_info",
            ecommerce: {
                items: products.map((product) => ({
                    item_name: product.title,
                    item_id: product.id,
                    price: product.price,
                    item_brand: "Inside By Sana",
                    item_variant: product.color.title,
                    item_list_id: "PC" + product.id,
                    quantity: product.qty
                })),
                value: products.reduce((acc, product) => acc + product.price, 0),
                content_type: "product",
                content_ids: products.map(product => product.id)
            }
        })
    }
}

export const Purchase = (order: {
    id: number
    payment_id: number
    delivery: Delivery
    products: ProductColorCart[]
    promo_code: PromoCode | null,
    total_price: number
}) => {
    if (window?.dataLayer) {
        window?.dataLayer.push({ecommerce: null})
        window?.dataLayer.push({
            event: "purchase",
            ecommerce: {
                transaction_id: order.id,
                affiliation: "Site",
                value: order.total_price,
                tax: "0.00",
                shipping: order.delivery.price,
                coupon: order.promo_code?.code,
                items: order.products.map((product) => ({
                    item_name: product.title,
                    item_id: product.id,
                    price: product.price,
                    item_brand: "Inside By Sana",
                    item_variant: product.color.title,
                    item_list_id: "PC" + product.id,
                    quantity: product.qty
                })),
                content_type: "product",
                content_ids: order.products.map(product => product.id)
            }
        })
    }
}
