import type {GetStaticProps, NextPage} from "next"
import {GetBanners} from "services/bannerApi"
import {BannerType} from "types/Banner"
import Layout from "layouts/Layout"
import Banner from "features/banner/Banner"
import NewProducts from "features/product/new-products/NewProducts"
import {ProductColorCard} from "types/productColor"
import {GetNewProducts} from "services/productApi"
import {GetCategories} from "services/categoryApi"
import {Category} from "types/Category"

interface HomeProps {
    banners: BannerType[]
    products: ProductColorCard[]
    categories: Category[]
}

const Home: NextPage<HomeProps> = ({banners, products, categories}) => {
    return (
        <Layout categories={categories}>
            <Banner banners={banners} />
            <NewProducts products={products} />
        </Layout>
    )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
    const banners = await GetBanners()
    const products = await GetNewProducts()
    const categories = await GetCategories()

    return {
        props: {
            banners,
            products,
            categories
        },
        revalidate: 1
    }
}