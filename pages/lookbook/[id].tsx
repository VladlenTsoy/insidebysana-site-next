import React from "react"
import {GetStaticPaths, GetStaticProps} from "next"
import {
    GetLookbookByCategoryId,
    GetLookbookCategories,
    GetLookbookCategoriesExceptId,
    ResponseLookbook
} from "services/lookbookApi"
import {GetCategories} from "services/categoryApi"
import {Category} from "types/Category"
import {LookbookCategory} from "types/Lookbook"
import Layout from "layouts/Layout"
import Lookbook, {LookbookCategories} from "features/lookbook/Lookbook"

interface Props {
    categories: Category[]
    lookbook: ResponseLookbook
    lookbookCategories: LookbookCategory[]
}

const Index: React.FC<Props> = ({categories, lookbook, lookbookCategories}) => {
    return (
        <Layout categories={categories}>
            <Lookbook lookbook={lookbook}>
                <LookbookCategories lookbookCategories={lookbookCategories} />
            </Lookbook>
        </Layout>
    )
}

export default Index

export const getStaticProps: GetStaticProps = async ({params}: any) => {
    const {id} = params
    const categories = await GetCategories()
    const lookbook = await GetLookbookByCategoryId(id)
    const lookbookCategories = await GetLookbookCategoriesExceptId(lookbook.id)

    return {
        props: {
            categories,
            lookbook,
            lookbookCategories
        },
        revalidate: 1
    }
}

export const getStaticPaths: GetStaticPaths<any> = async () => {
    const lookbookCategories = await GetLookbookCategories()
    const paths = lookbookCategories.map(category => ({params: {id: String(category.id)}}))
    return {paths, fallback: false}
}