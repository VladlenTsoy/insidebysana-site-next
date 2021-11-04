import React from "react"
import Title from "components/title/Title"
import styled from "./Lookbook.module.css"
import Link from "next/link"
import {ResponseLookbook} from "services/lookbookApi"
import {LookbookCategory} from "types/Lookbook"

interface LookbookCategoryProps {
    lookbookCategories: LookbookCategory[]
}

export const LookbookCategories: React.FC<LookbookCategoryProps> = ({lookbookCategories}) => {
    return (
        <>
            {lookbookCategories.map(category => (
                <Link href={`/lookbook/${category.id}`} key={category.id} passHref>
                    <a className={styled.lookbookItem}>
                        <img src={category.url_image} alt={`lookbook-${category.id}`} />
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
                        <img src={item.url_image} alt={`lookbook-${item.id}`} />
                    </div>
                ))}
                {children}
            </div>
        </>
    )
}

export default Lookbook
