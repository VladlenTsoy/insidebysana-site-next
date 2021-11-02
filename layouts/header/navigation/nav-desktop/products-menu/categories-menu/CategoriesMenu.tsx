import React from "react"
import Link from "next/link"
import {Category} from "types/Category"

interface CategoriesMenuProps {
    categories: Category[]
}

const CategoriesMenu: React.FC<CategoriesMenuProps> = ({categories}) => {
    return (
        <>
            {categories.map(category => (
                <Link href={`/products/${category.id}/${category.url}`} key={category.id}>
                    {category.title}
                </Link>
            ))}
        </>
    )
}

export default CategoriesMenu
