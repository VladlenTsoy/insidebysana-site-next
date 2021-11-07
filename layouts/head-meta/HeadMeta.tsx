import React from "react"
import Head from "next/head"
import DefaultImage from "assets/images/logo-2-white.svg"

interface HeadMetaProps {
    title?: string
    description?: string
    image?: string
}

const HeadMeta: React.FC<HeadMetaProps> = ({title, description, image, children}) => {
    const defaultTitle = "Bellissimo Pizza - Бесплатная доставка пиццы по Ташкенту"
    const defaultDesc = "Bellissimo Pizza - Бесплатная доставка за 45 минут или пицца бесплатно!"
    return (
        <Head>
            <title key="head-title">
                {title || defaultTitle}
            </title>
            <meta
                key="head-description"
                name="description"
                content={
                    description || defaultDesc
                }
            />
            {children}
            {/* OG */}
            <meta property="og:type" content="article" />
            <meta property="og:title" content={title || defaultTitle} />
            <meta property="og:description" content={description || defaultDesc} />
            <meta property="og:image" content={image || DefaultImage} />
            <meta property="og:url" content="m.bellissimo.uz" />
            <meta property="og:site_name" content="Bellissimo Pizza" />
            {/* Twitter */}
            <meta name="twitter:title" content={title || defaultTitle} />
            <meta name="twitter:description" content={description || defaultDesc} />
            <meta name="twitter:image" content={image || DefaultImage} />
        </Head>
    )
}
export default HeadMeta
