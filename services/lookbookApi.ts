import {Lookbook, LookbookCategory} from "types/Lookbook"
import {DOMAIN_API} from "utils/api"

export interface ResponseLookbook {
    id: number
    title: string
    images: Lookbook[]
}

type GetLookbookType = () => Promise<ResponseLookbook>

export const GetLookbook: GetLookbookType = async () => {
    try {
        const response = await fetch(DOMAIN_API + "/lookbook")
        return await response.json()
    } catch (e) {
        console.error(e)
    }
    return []
}

type GetLookbookCategoriesType = () => Promise<LookbookCategory[]>

export const GetLookbookCategories: GetLookbookCategoriesType = async () => {
    try {
        const response = await fetch(DOMAIN_API + `/lookbook-categories`)
        return await response.json()
    } catch (e) {
        console.error(e)
    }
    return []
}

type GetLookbookCategoriesExceptIdType = (categoryId: number) => Promise<LookbookCategory[]>

export const GetLookbookCategoriesExceptId: GetLookbookCategoriesExceptIdType = async (categoryId) => {
    try {
        const response = await fetch(DOMAIN_API + `/lookbook-categories/${categoryId}`)
        return await response.json()
    } catch (e) {
        console.error(e)
    }
    return []
}

type GetLookbookByCategoryIdType = (categoryId: number) => Promise<ResponseLookbook>

export const GetLookbookByCategoryId: GetLookbookByCategoryIdType = async (categoryId) => {
    try {
        const response = await fetch(DOMAIN_API + `/lookbook/category/${categoryId}`)
        return await response.json()
    } catch (e) {
        console.error(e)
    }
    return []
}