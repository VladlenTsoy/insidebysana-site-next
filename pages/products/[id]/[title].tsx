import React from "react"
import {Category} from "types/Category"
import {GetStaticPaths, GetStaticProps, NextPage} from "next"
import {GetCategories} from "../../../services/categoryApi"
import Layout from "../../../layouts/Layout"
import ProductList from "../../../features/product/product-list/Products"
import HeadMeta from "../../../layouts/head-meta/HeadMeta"

interface IndexProps {
    categories: Category[]
    category?: Category
}

const Index: NextPage<IndexProps> = ({categories, category}) => {
    return (
        <>
            <HeadMeta title={category?.title} />
            <Layout categories={categories}>
                <ProductList category={category} />
            </Layout>
        </>
    )
}

export default Index

export const getStaticProps: GetStaticProps = async ({params}: any) => {
    const {id} = params
    const categories = await GetCategories()
    const category = categories.find(_category => String(_category.id) === id) || null
    return {
        props: {
            categories,
            category: category
        },
        revalidate: 1
    }
}

export const getStaticPaths: GetStaticPaths<any> = async () => {
    const categories = await GetCategories()
    const paths = categories.map(category => ({params: {id: String(category.id), title: category.url}}))
    return {paths, fallback: false}
}