import React from "react"
import {GetStaticProps, NextPage} from "next"
import {GetCategories} from "services/categoryApi"
import {Category} from "types/Category"
import Layout from "layouts/Layout"
import AccountLayout from "features/account/AccountLayout"
import DeliveryAddresses from "features/account/delivery-addresses/DeliveryAddresses"

interface Props {
    categories: Category[]
}

const Index: NextPage<Props> = ({categories}) => {
    return <Layout categories={categories}>
        <AccountLayout>
            <DeliveryAddresses />
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