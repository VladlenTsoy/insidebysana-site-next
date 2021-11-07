import {GetStaticPaths, GetStaticProps, NextPage} from "next"
import {Category} from "types/Category"
import {GetCategories} from "services/categoryApi"
import Order from "features/order/Order"
import {GetOrderList} from "../../services/orderApi"
import Layout from "../../layouts/Layout"

interface Props {
    categories: Category[]
}

const Index: NextPage<Props> = ({categories}) => {
    return (
        <Layout categories={categories}>
            <Order />
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

export const getStaticPaths: GetStaticPaths<any> = async () => {
    const orders = await GetOrderList()
    const paths = orders.map(order => ({params: {id: String(order.id)}}))
    return {paths, fallback: false}
}