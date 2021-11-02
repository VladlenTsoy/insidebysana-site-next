import React, {useEffect, useState} from "react"
import styled from "./NavDesktop.module.css"
import Link from "next/link"
import ProductsMenu from "./products-menu/ProductsMenu"
import {useRouter} from "next/router"
import {Category} from "types/Category"

interface NavDesktopProps {
    categories: Category[]
}

const NavDesktop: React.FC<NavDesktopProps> = ({categories}) => {
    const router = useRouter()
    const [activeUrl, setActiveUrl] = useState(router.pathname)

    const onClick = () => router.push("/products/all")

    useEffect(() => {
        setActiveUrl(router.pathname)
    }, [router.pathname])

    return (
        <menu className={styled.navigation}>
            <li><Link href="/"><a className={activeUrl === "/" ? styled.active : ""}>Главная</a></Link></li>
            <li>
                <ProductsMenu categories={categories}>
                    <a
                        onClick={onClick}
                        className={activeUrl.includes("product") ? styled.active : ""}
                        id="nav-products">
                        Каталог
                    </a>
                </ProductsMenu>
            </li>
            <li>
                <Link href="/lookbook">
                    <a className={activeUrl === "/lookbook" ? styled.active : ""}>LOOKBOOK</a>
                </Link>
            </li>
            <li>
                <Link href="/about-us">
                    <a className={activeUrl === "/about-us" ? styled.active : ""}>О Нас</a>
                </Link>
            </li>
            <li>
                <Link href="/contacts">
                    <a className={activeUrl === "/contacts" ? styled.active : ""}>Контакты</a>
                </Link>
            </li>
        </menu>
    )
}

export default NavDesktop