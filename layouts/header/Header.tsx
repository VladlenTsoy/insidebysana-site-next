import React, {useEffect} from "react"
import AccountMenu from "./account-menu/AccountMenu"
import Navigation from "./navigation/Navigation"
import {useDispatch} from "../../store"
import Logo from "./logo/Logo"
import HeaderAnimation from "./HeaderAnimation"
import {fetchUser} from "features/auth/authApi"
import {useSelector} from "react-redux"
import {authSelector} from "features/auth/authSlice"
import {fetchCart} from "features/cart/cartApi"
import {fetchWishlist} from "features/wishlist/wishlistApi"
import {useRouter} from "next/router"
import {Category} from "types/Category"

interface HeaderProps {
    categories: Category[]
}

const Header: React.FC<HeaderProps> = ({categories}) => {
    const {token, detail} = useSelector(authSelector)
    const dispatch = useDispatch()
    const router = useRouter()

    // Загрузка пользователя
    useEffect(() => {
        if (token) {
            const promise = dispatch(fetchUser())
            return () => {
                promise.abort()
            }
        }
    }, [dispatch, token])

    // Вывод корзины и избранного
    useEffect(() => {
        if (detail || router.pathname === "/cart") {
            const promiseCart = dispatch(fetchCart())
            const promiseWishlist = dispatch(fetchWishlist())
            return () => {
                promiseCart.abort()
                promiseWishlist.abort()
            }
        }
    }, [detail, dispatch, router])

    return (
        <HeaderAnimation>
            <Logo />
            <Navigation categories={categories} />
            <AccountMenu />
        </HeaderAnimation>
    )
}

export default React.memo(Header)
