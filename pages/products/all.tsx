import React from "react"
import {Category} from "types/Category"
import {GetStaticProps, NextPage} from "next"
import {GetCategories} from "services/categoryApi"
import Layout from "layouts/Layout"
import ProductList from "features/product/product-list/Products"

interface IndexProps {
    categories: Category[]
}

const Index: NextPage<IndexProps> = ({categories}) => {
    return (
        <Layout categories={categories}>
            <ProductList />
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