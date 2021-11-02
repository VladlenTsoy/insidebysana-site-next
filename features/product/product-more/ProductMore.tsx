import React from "react"
import styled from "./ProductMore.module.css"
import Details from "./details/Details"
import SlidersProperties from "./sliders-properties/SlidersProperties"
import {ProductColor} from "types/productColor"

export interface ProductMoreProps {
    product: ProductColor
}

const ProductMore: React.FC<ProductMoreProps> = ({product}) => {
    return (
        <div className={styled.product} id="product" key={product.id}>
            <SlidersProperties product={product} />
            <Details product={product} />
        </div>
    )
}

export default ProductMore
