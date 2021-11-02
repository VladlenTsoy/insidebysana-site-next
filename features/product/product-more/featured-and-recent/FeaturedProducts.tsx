import React from "react"
import styled from "./FeaturedProducts.module.css"
import {ProductColorCard} from "types/productColor"
import Title from "components/title/Title"
import Carousel from "./Carousel"

interface RecommendedProps {
    products: ProductColorCard[]
}

const FeaturedProducts: React.FC<RecommendedProps> = ({products}) => {
    if (!products.length) return <></>
    return (
        <div className={styled.featuredProducts} id="featured-products">
            <Title level={3}>Вам также может понравиться</Title>
            <Carousel products={products} />
        </div>
    )
}

export default FeaturedProducts
