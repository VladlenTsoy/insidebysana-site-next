import {createApi} from "@reduxjs/toolkit/query/react"
import {ProductColorCard} from "types/productColor"
import baseQuery from "utils/apiConfig"

export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery,
    endpoints: build => ({
        getProductsBySearch: build.mutation<ProductColorCard[], string>({
            query: search => ({
                url: `search-products`,
                method: "POST",
                body: {search}
            })
        }),
        getFeaturedProductsById: build.query<ProductColorCard[], number>({
            query: id => `featured-products/${id}`
        }),
        getRecentProductsById: build.query<ProductColorCard[], {ids: number[]; productColorId: any}>({
            query: body => ({
                url: `recent-products`,
                method: "POST",
                body: body
            })
        })
    })
})

export const {
    useGetProductsBySearchMutation,
    useGetFeaturedProductsByIdQuery,
    useGetRecentProductsByIdQuery
} = productApi
