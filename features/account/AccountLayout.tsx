import React from "react"
import styled from "./AccountLayout.module.css"
import Button from "components/button/Button"
import Link from "next/link"
import HistoryOutlined from "@ant-design/icons/HistoryOutlined"
import CarOutlined from "@ant-design/icons/CarOutlined"
import IdcardOutlined from "@ant-design/icons/IdcardOutlined"
import KeyOutlined from "@ant-design/icons/KeyOutlined"
import {useDispatch} from "../../store"
import {useUser} from "../auth/authSlice"
import {useRouter} from "next/router"
import {logoutUser} from "../auth/authApi"

const AccountLayout: React.FC = ({children}) => {
    const dispatch = useDispatch()
    const {detail} = useUser()
    const router = useRouter()

    const logout = () => {
        dispatch(logoutUser())
        router.push("/")
    }

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
                    {children}
                </div>
            </div>
        </div>
    )
}

export default AccountLayout