import {DOMAIN_API} from "utils/api"

type GetOrderListType = () => Promise<{id: number}[]>

export const GetOrderList: GetOrderListType = async () => {
    try {
        const response = await fetch(DOMAIN_API + "/order-list")
        return await response.json()
    } catch (e) {
        console.error(e)
    }
    return []
}
