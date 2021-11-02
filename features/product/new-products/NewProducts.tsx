import React from "react"
import Title from "components/title/Title"
import styled from "./NewProducts.module.css"
import ClothesCard from "components/clothes-card/ClothesCard"
import LoaderBlock from "components/loader-block/LoaderBlock"
import GridClothesCard from "components/grid-clothes-card/GridClothesCard"
import {ProductColorCard} from "types/productColor"

interface NewProductsProps {
    products: ProductColorCard[]
}

const NewProducts: React.FC<NewProductsProps> = ({products}) => {
    return (
        <div className={styled.newProducts}>
            <Title level={2}>Новинки</Title>
            <GridClothesCard>
                {products.map(product => (
                    <ClothesCard product={product} key={product.id} />
                ))}
            </GridClothesCard>
        </div>
    )
}

export default NewProducts
