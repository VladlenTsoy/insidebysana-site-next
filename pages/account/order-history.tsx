import React from "react"
import Layout from "layouts/Layout"
import {Category} from "types/Category"
import {GetStaticProps} from "next"
import {GetCategories} from "services/categoryApi"
import AccountLayout from "features/account/AccountLayout"
import OrderHistory from "features/account/order-history/OrderHistory"

interface Props {
    categories: Category[]
}

const Index: React.FC<Props> = ({categories}) => {
    return <Layout categories={categories}>
        <AccountLayout>
            <OrderHistory />
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