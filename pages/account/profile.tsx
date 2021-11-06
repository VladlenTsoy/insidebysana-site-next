import React from "react"
import {Category} from "types/Category"
import {GetStaticProps, NextPage} from "next"
import {GetCategories} from "services/categoryApi"
import Layout from "layouts/Layout"
import AccountLayout from "features/account/AccountLayout"
import Profile from "features/account/profile/Profile"

interface Props {
    categories: Category[]
}

const Index:NextPage<Props> = ({categories}) => {
    return <Layout categories={categories}>
        <AccountLayout>
            <Profile />
        </AccountLayout>
    </Layout>
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