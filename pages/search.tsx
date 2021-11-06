import React from "react"
import {GetStaticProps, NextPage} from "next"
import {Category} from "types/Category"
import {GetCategories} from "services/categoryApi"
import Layout from "layouts/Layout"
import ProductSearch from "../features/product/product-search/ProductSearch"

interface IndexProps {
    categories: Category[]
}

const Index: NextPage<IndexProps> = ({categories}) => {
    return (
        <Layout categories={categories}>
            <ProductSearch />
        </Layout>
    )
}

export default Index

export const getStaticProps: GetStaticProps = async () => {
    const categories = await GetCategories()
    return {
        props: {
            categories
        },
        revalidate: 10
    }
}