import React from "react"
import {GetStaticProps, NextPage} from "next"
import {GetCategories} from "services/categoryApi"
import Layout from "layouts/Layout"
import {Category} from "types/Category"
import Cart from "features/cart/Cart"

interface Props {
    categories: Category[]
}

const Index: NextPage<Props> = ({categories}) => {
    return (
        <Layout categories={categories}>
            <Cart />
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