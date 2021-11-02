import React from "react"
import {GetStaticPaths, GetStaticProps, NextPage} from "next"
import {GetProductIds, GetProductById} from "services/productApi"
import {ProductColor} from "types/productColor"
import Layout from "layouts/Layout"
import ProductMore from "features/product/product-more/ProductMore"

interface ProductProps {
    product: ProductColor
}

const Product: NextPage<ProductProps> = ({product}) => {
    console.log(product)
    return (
        <Layout>
            <ProductMore product={product} />
        </Layout>
    )
}

export default Product


export const getStaticProps: GetStaticProps = async ({locale, params}: any) => {
    const {id} = params
    const product = await GetProductById(id)
    return {
        props: {
            product
        },
        revalidate: 10
    }
}

export const getStaticPaths: GetStaticPaths<any> = async () => {
    const ids = await GetProductIds()
    const paths = ids.map(id => ({params: {id: String(id)}}))
    return {paths, fallback: false}
}