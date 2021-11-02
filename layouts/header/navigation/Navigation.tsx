import React from "react"
import {useScreenSize} from "hooks/useScreenSize"
import NavDesktop from "./nav-desktop/NavDesktop"
import NavMobile from "./nav-mobile/NavMobile"
import {Category} from "../../../types/Category"

interface NavigationProps {
    categories: Category[]
}

const Navigation: React.FC<NavigationProps> = ({categories}) => {
    const {width} = useScreenSize()

    return (
        width > 1200 ? <NavDesktop categories={categories} /> : <NavMobile categories={categories} />
    )
}

export default Navigation