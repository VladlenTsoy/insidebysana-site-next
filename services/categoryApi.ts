import {Category} from "types/Category"
import {DOMAIN_API} from "utils/api"

type GetCategoriesType = () => Promise<Category[]>

export const GetCategories: GetCategoriesType = async () => {
    try {
        const response = await fetch(DOMAIN_API + "/categories")
        return await response.json()
    } catch (e) {
        console.error(e)
    }
    return []
}
