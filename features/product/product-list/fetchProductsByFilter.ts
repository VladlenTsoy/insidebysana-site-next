import {createAsyncThunk} from "@reduxjs/toolkit"
import {ThunkProps} from "store"
import {Size} from "types/Size"
import {Category} from "types/Category"
import {ProductColorCard} from "types/productColor"
import {Color} from "types/Color"
import {DOMAIN_API} from "utils/api"

type ReturnedType = {
    products: ProductColorCard[]
    sizes: Size[]
    colors: Color[]
    categories: Category[]
    price: {
        min: number
        max: number
    }
}

type ArgsProps = {
    price: {
        min: number
        max: number
    }
    sort: {column: string; dir: string}
    colorIds: any[]
    categoryId?: any
    sizeIds?: any[]
    subCategoryIds?: any[]
}

export const fetchProductsByFilter = createAsyncThunk<ReturnedType, ArgsProps, ThunkProps>(
    "product-cards/fetch",
    async (data, {signal}) => {
        const response = await fetch(DOMAIN_API + "/product-colors", {
            method: "post",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            signal,
            body: JSON.stringify(data)
        })
        if (response.ok) return await response.json()
        throw await response.json()
    }
)
