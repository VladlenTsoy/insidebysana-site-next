import {DOMAIN_API} from "utils/api"
import {ProductColor, ProductColorCard} from "types/productColor"

type GetNewProductsType = () => Promise<ProductColorCard[]>

export const GetNewProducts: GetNewProductsType = async () => {
    try {
        const response = await fetch(DOMAIN_API + "/new-products")
        return await response.json()
    } catch (e) {
        console.error(e)
    }
    return []
}

type GetProductIdsType = () => Promise<number[]>

export const GetProductIds: GetProductIdsType = async () => {
    try {
        const response = await fetch(DOMAIN_API + "/product/ids")
        return await response.json()
    } catch (e) {
        console.error(e)
    }
    return []
}

type GetProductByIdType = (id: string) => Promise<ProductColor>

export const GetProductById: GetProductByIdType = async (id: string) => {
    try {
        const response = await fetch(DOMAIN_API + `/product-color/${id}`)
        return await response.json()
    } catch (e) {
        console.error(e)
    }
    return null
}

type GetFeaturedProductsByIdType = (id: string) => Promise<ProductColorCard[]>

export const GetFeaturedProductsById: GetFeaturedProductsByIdType = async (id) => {
    try {
        const response = await fetch(DOMAIN_API + `/featured-products/${id}`)
        return await response.json()
    } catch (e) {
        console.error(e)
    }
    return []
}
