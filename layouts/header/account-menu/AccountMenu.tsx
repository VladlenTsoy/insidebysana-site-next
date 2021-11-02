import React from "react"
import styled from "./AccountMenu.module.css"
import Link from "next/link"
import UserOutlined from "@ant-design/icons/UserOutlined"
import SearchOutlined from "@ant-design/icons/SearchOutlined"
import ShoppingOutlined from "@ant-design/icons/ShoppingOutlined"
import ShoppingFilled from "@ant-design/icons/ShoppingFilled"
import HeartOutlined from "@ant-design/icons/HeartOutlined"
import HeartFilled from "@ant-design/icons/HeartFilled"
import {useSelector} from "react-redux"
import {wishlistSelector} from "features/wishlist/wishlistSlice"
import {useSelectAllSkuCart} from "features/cart/cartSlice"

const AccountMenu = () => {
    const cartSkus = useSelectAllSkuCart()
    const wishlist = useSelector(wishlistSelector)

    return (
        <div className={styled.accountMenu}>
            <menu>
                <li>
                    <Link href="/account">
                        <a>
                            <UserOutlined />
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href="/search">
                        <a>
                            <SearchOutlined />
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href="/wishlist">
                        <a className={styled.wishlist}>
                            {wishlist.items.length ? (
                                <>
                                    <HeartFilled />
                                    <span className={styled.badge}>{wishlist.items.length}</span>
                                </>
                            ) : (
                                <HeartOutlined />
                            )}
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href="/cart">
                        <a className={styled.cart}>
                            {cartSkus.length ? (
                                <>
                                    <ShoppingFilled />
                                    <span className={styled.badge}>{cartSkus.length}</span>
                                </>
                            ) : (
                                <ShoppingOutlined />
                            )}
                        </a>
                    </Link>
                </li>
            </menu>
        </div>
    )
}

export default AccountMenu
