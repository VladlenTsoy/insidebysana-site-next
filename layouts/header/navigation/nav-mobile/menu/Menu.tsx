import React from "react"
import styled from "./Menu.module.css"
import Link from "next/link"
import Collapse, {Panel} from "rc-collapse"
import "rc-collapse/assets/index.css"
import motion from "utils/collapseMotionUtil"
import LeftOutlined from "@ant-design/icons/LeftOutlined"
import CategoriesMenu from "../../nav-desktop/products-menu/categories-menu/CategoriesMenu"
import {Category} from "types/Category"

const expandIcon = ({isActive}: any) =>
    <LeftOutlined className={`${styled.icon} ${isActive && styled.active}`} />

interface MenuProps {
    categories: Category[]
}

const Menu: React.FC<MenuProps> = ({categories}) => {
    return (
        <div className={styled.menu}>
            <ul>
                <li>
                    <Link href="/">
                        <a>Главная</a>
                    </Link>
                </li>
                <li>
                    <Collapse openMotion={motion} className="menu-categories" expandIcon={expandIcon}>
                        <Panel header="Каталог" key="categories">
                            <div className={styled.categories}>
                                <Link href={`/products/all`}>
                                    <a>Все</a>
                                </Link>
                                <CategoriesMenu categories={categories} />
                            </div>
                        </Panel>
                    </Collapse>
                </li>
                <li>
                    <Link href="/lookbook">
                        <a>LookBook</a>
                    </Link>
                </li>
                <li>
                    <Link href="/about-us">
                        <a>О нас</a>
                    </Link>
                </li>
                <li>
                    <Link href="/contacts">
                        <a>Контакты</a>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default Menu