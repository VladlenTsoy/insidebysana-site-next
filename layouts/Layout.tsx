import React from "react"
import Footer from "./footer/Footer"
import Header from "./header/Header"
import styled from "./Layout.module.css"
import {Category} from "types/Category"

interface LayoutProps {
    categories: Category[]
}

const Layout: React.FC<LayoutProps> = ({children, categories}) => {
    return (
        <div className={styled.layout}>
            <Header categories={categories}/>
            {children}
            <Footer />
        </div>
    )
}
export default Layout
