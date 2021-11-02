import React, {useCallback} from "react"
import Title from "components/title/Title"
import styled from "./FeaturedProducts.module.css"
import LoaderBlock from "components/loader-block/LoaderBlock"
import Carousel from "./Carousel"
import {getCookie, setCookie} from "utils/cookie"
import {useRouter} from "next/router"
import {useGetRecentProductsByIdQuery} from "../../productApi"

const RecentProducts: React.FC = () => {
    const router = useRouter()
    const productColorId = router.query.id

    const setLocalRecent = useCallback(ids => {
        setCookie("InsideBySana_Recent", JSON.stringify(ids), {expires: 7})
    }, [])

    const params = () => {
        const ids = JSON.parse(getCookie("InsideBySana_Recent") || "[]")
        const key = ids.indexOf(productColorId)
        if (key > -1) ids.splice(key, 1)
        ids.push(productColorId)
        setLocalRecent(ids)

        return {productColorId, ids}
    }

    const {data: products = [], isLoading, isFetching} = useGetRecentProductsByIdQuery(params())

    if (isLoading || isFetching) return <LoaderBlock />

    if (!products.length) return <></>

    return (
        <div className={styled.featuredProducts} id="recent-products">
            <Title level={3}>Недавно вы смотрели</Title>
            <Carousel products={products} />
        </div>
    )
}

export default RecentProducts
