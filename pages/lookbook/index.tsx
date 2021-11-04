import React from "react"
import {Category} from "types/Category"
import Layout from "layouts/Layout"
import {GetStaticProps} from "next"
import {GetCategories} from "services/categoryApi"
import Lookbook, {LookbookCategories} from "features/lookbook/Lookbook"
import {GetLookbook, GetLookbookCategories, ResponseLookbook} from "../../services/lookbookApi"
import {LookbookCategory} from "../../types/Lookbook"

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

export const getStaticProps: GetStaticProps = async () => {
    const categories = await GetCategories()
    const lookbook = await GetLookbook()
    const lookbookCategories = await GetLookbookCategories(lookbook.id)
    return {
        props: {
            categories,
            lookbook,
            lookbookCategories
        },
        revalidate: 10
    }
}