import React, {useEffect} from "react"
import LoaderBlock from "components/loader-block/LoaderBlock"
import Button from "components/button/Button"
import {logoutUser} from "../auth/authApi"
import {useDispatch} from "store"
import HistoryOutlined from "@ant-design/icons/HistoryOutlined"
import CarOutlined from "@ant-design/icons/CarOutlined"
import IdcardOutlined from "@ant-design/icons/IdcardOutlined"
import KeyOutlined from "@ant-design/icons/KeyOutlined"
import styled from "./AccountLayout.module.css"
import {useUser} from "features/auth/authSlice"
import {useRouter} from "next/router"
import Link from "next/link"

const Account = () => {
    const dispatch = useDispatch()
    const {detail, loading} = useUser()
    const router = useRouter()

    const logout = () => {
        dispatch(logoutUser())
    }

    useEffect(() => {
        if (detail)
            router.push("/account/order-history")
        else
            router.push("/auth/login")
    }, [detail])

    if (loading) return <LoaderBlock />

    return (
        <div className="container">
            <div className={styled.header}>
                <div className={styled.welcome}>
                    <h1>Добро пожаловать! {detail?.full_name}</h1>
                </div>
                <div className={styled.logout}>
                    <Button onClick={logout}>Выйти</Button>
                </div>
            </div>

            <div className={styled.content}>
                <div className={styled.sidebar}>
                    <Link href="/account/order-history" passHref>
                        <a><HistoryOutlined /> История заказов</a>
                    </Link>
                    <Link href="/account/delivery-addresses" passHref>
                        <a><CarOutlined /> Адреса доставки</a>
                    </Link>
                    <Link href="/account/profile" passHref>
                        <a><IdcardOutlined /> Контактные данные</a>
                    </Link>
                    <Link href="/account/change-password" passHref>
                        <a><KeyOutlined /> Сменить пароль</a>
                    </Link>
                </div>
                <div className={styled.container}>
                </div>
            </div>
        </div>
    )
}

export default Account
