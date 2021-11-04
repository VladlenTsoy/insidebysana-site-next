import React from "react"
import Title from "components/title/Title"
import styled from "./Lookbook.module.css"
import Link from "next/link"
import {ResponseLookbook} from "services/lookbookApi"
import {LookbookCategory} from "types/Lookbook"
import Image from "next/image"

interface LookbookCategoryProps {
    lookbookCategories: LookbookCategory[]
}

export const LookbookCategories: React.FC<LookbookCategoryProps> = ({lookbookCategories}) => {
    return (
        <>
            {lookbookCategories.map(category => (
                <Link href={`/lookbook/${category.id}`} key={category.id} passHref>
                    <a className={styled.lookbookItem}>
                        <div className={styled.image}>
                            <Image src={category.url_image} alt={`lookbook-${category.id}`} layout="fill"
                                   objectFit="cover" />
                        </div>
                    </a>
                </Link>
            ))}
        </>
    )
}

interface LookbookProps {
    lookbook: ResponseLookbook
}

const Lookbook: React.FC<LookbookProps> = ({lookbook, children}) => {
    return (
        <>
            <Title level={1}>{lookbook?.title}</Title>
            <div className="container">
                {lookbook.images.map(item => (
                    <div className={styled.lookbookItem} key={item.id}>
                        <div className={styled.image}>
                            <Image src={item.url_image} alt={`lookbook-${item.id}`} layout="fill" objectFit="cover" />
                        </div>
                    </div>
                ))}
                {children}
            </div>
        </>
    )
}

export default Lookbook
