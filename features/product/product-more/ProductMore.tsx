import React from "react"
import styled from "./ProductMore.module.css"
// import LoaderBlock from "components/loader-block/LoaderBlock"
import Details from "./details/Details"
// import SlidersProperties from "./sliders-properties/SlidersProperties"
// import FeaturedProducts from "./featured-and-recent/FeaturedProducts"
// import RecentProducts from "./featured-and-recent/RecentProducts"
import {ProductColor} from "types/productColor"

export interface ProductMoreProps {
    product: ProductColor
}

const ProductMore: React.FC<ProductMoreProps> = ({product}) => {
    return (
        <>
            <div className={styled.product} id="product" key={product.id}>
                {/*<SlidersProperties product={product} />*/}
                <Details product={product} />
            </div>
            {/*<FeaturedProducts productId={product.product_id} />*/}
            {/*<RecentProducts productColorId={Number(product.id)} />*/}
        </>
    )
}

export default ProductMore
