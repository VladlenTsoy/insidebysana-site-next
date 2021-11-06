import React from "react"
import Title from "components/title/Title"
import ClothesCard from "components/clothes-card/ClothesCard"
import LoaderBlock from "components/loader-block/LoaderBlock"
import EmptyBlock from "components/empty-block/EmptyBlock"
import {useLoadingProducts, useSelectAllProducts} from "../productSlice"
import GridClothesCard from "components/grid-clothes-card/GridClothesCard"
import FilterSort from "./filter-sort/FilterSort"
import {Category} from "../../../types/Category"

export interface ProductListProps {
    category?: Category
}

const ProductList: React.FC<ProductListProps> = ({category}) => {
    const loading = useLoadingProducts()
    const products = useSelectAllProducts()

    return (
        <div>
            <Title level={1}>{category?.title || "Новинки"}</Title>
            <FilterSort />
            {loading ? (
                <LoaderBlock key="product-loading" />
            ) : products.length ? (
                <GridClothesCard>
                    {products.map(product => (
                        <ClothesCard
                            product={product}
                            key={product.id}
                        />
                    ))}
                </GridClothesCard>
            ) : (
                <EmptyBlock />
            )}
        </div>
    )
}

export default ProductList
