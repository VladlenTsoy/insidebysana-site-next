import {BannerType} from "types/Banner"
import {DOMAIN_API} from "utils/api"

type GetBannersType = () => Promise<BannerType[]>

export const GetBanners: GetBannersType = async () => {
    try {
        const response = await fetch(DOMAIN_API + "/banners")
        return await response.json()
    } catch (e) {
        console.error(e)
    }
    return []
}
