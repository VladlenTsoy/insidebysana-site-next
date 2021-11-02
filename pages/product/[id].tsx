import React from "react"
import {GetStaticPaths, GetStaticProps, NextPage} from "next"
import {GetProductById, GetProductIds} from "services/productApi"
import {ProductColor} from "types/productColor"
import Layout from "layouts/Layout"
import {GetCategories} from "../../services/categoryApi"
import {Category} from "../../types/Category"

interface ProductProps {
    product: ProductColor
    categories: Category[]
}

const Product: NextPage<ProductProps> = ({product, categories}) => {
    console.log(product)
    return (
        <Layout categories={categories}>
        </Layout>
    )
}

export default Product


export const getStaticProps: GetStaticProps = async ({locale, params}: any) => {
    const {id} = params
    const product = await GetProductById(id)
    const categories = await GetCategories()
    return {
        props: {
            categories,
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