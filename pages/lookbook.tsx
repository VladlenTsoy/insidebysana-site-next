import React from "react"
import {Category} from "types/Category"
import Layout from "layouts/Layout"
import {GetStaticProps} from "next"
import {GetCategories} from "services/categoryApi"
import Lookbook from "features/lookbook/Lookbook"

interface Props {
    categories: Category[]
}

const Index: React.FC<Props> = ({categories}) => {
    return (
        <Layout categories={categories}>
            <Lookbook />
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