import React from "react"
import Layout from "layouts/Layout"
import AuthLayout from "features/auth/AuthLayout"
import {GetStaticProps, NextPage} from "next"
import {GetCategories} from "services/categoryApi"
import {Category} from "types/Category"
import Registration from "features/auth/registration/Registration"

interface Props {
    categories: Category[]
}

const Index: NextPage<Props> = ({categories}) => {
    return (
        <Layout categories={categories}>
            <AuthLayout>
                <Registration />
            </AuthLayout>
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