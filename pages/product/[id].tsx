import React from "react"
import {GetStaticPaths, GetStaticProps, NextPage} from "next"
import {GetFeaturedProductsById, GetProductById, GetProductIds} from "services/productApi"
import {ProductColor, ProductColorCard} from "types/productColor"
import Layout from "layouts/Layout"
import {GetCategories} from "services/categoryApi"
import {Category} from "types/Category"
import ProductMore from "features/product/product-more/ProductMore"
import FeaturedProducts from "features/product/product-more/featured-and-recent/FeaturedProducts"
import RecentProducts from "features/product/product-more/featured-and-recent/RecentProducts"
import HeadMeta from "../../layouts/head-meta/HeadMeta"

interface ProductProps {
    product: ProductColor
    featuredProducts: ProductColorCard[]
    categories: Category[]
}

const Product: NextPage<ProductProps> = (
    {
        product,
        categories,
        featuredProducts
    }
) => {
    return (
        <>
            <HeadMeta title={product.title} image={product.images[0].url} />
            <Layout categories={categories}>
                <ProductMore product={product} />
                <FeaturedProducts products={featuredProducts} />
                <RecentProducts />
            </Layout>
        </>
    )
}

export default Product

export const getStaticProps: GetStaticProps = async ({params}: any) => {
    const {id} = params
    const product = await GetProductById(id)
    const featuredProducts = await GetFeaturedProductsById(id)
    const categories = await GetCategories()
    return {
        props: {
            categories,
            product,
            featuredProducts
        },
        revalidate: 10
    }
}

export const getStaticPaths: GetStaticPaths<any> = async () => {
    const ids = await GetProductIds()
    const paths = ids.map(id => ({params: {id: String(id)}}))
    return {paths, fallback: false}
}