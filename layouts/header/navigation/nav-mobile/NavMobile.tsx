import React, {useState} from "react"
import styled from "./NavMobile.module.css"
import MenuIcon from "assets/images/icons/menu.svg"
import Menu from "./menu/Menu"
import CloseOutlined from "@ant-design/icons/CloseOutlined"
import UserOutlined from "@ant-design/icons/UserOutlined"
import Drawer from "components/drawer/Drawer"
import Socials from "./socials/Socials"
import {useUser} from "features/auth/authSlice"
import {useRouter} from "next/router"
import {Category} from "types/Category"

interface NavMobileProps {
    categories: Category[]
}

const NavMobile: React.FC<NavMobileProps> = ({categories}) => {
    const router = useRouter()
    const {detail} = useUser()
    const [visible, setVisible] = useState(false)

    // Открыть
    const onOpenHandler = () => setVisible(true)

    // Закрыть
    const onCloseHandler = () => setVisible(false)

    // Переход на аккаунт
    const onAccountHandler = () => router.push("/account")

    return (
        <div>
            <button className={styled.buttonMenu} onClick={onOpenHandler}>
                <img src={MenuIcon} alt="" />
            </button>
            <Drawer width={350} visible={visible} maskClosable onClose={onCloseHandler}>
                <div className={styled.container}>
                    <div className={styled.header}>
                        <div className={styled.close} onClick={onCloseHandler}>
                            <CloseOutlined />
                        </div>
                        <div className={styled.account} onClick={onAccountHandler}>
                            <span className={styled.text}>{detail ? "Кабинет" : "Войти"}</span>
                            <UserOutlined className={styled.icon} />
                        </div>
                    </div>
                    <Menu categories={categories} />
                    <Socials />
                </div>
            </Drawer>
        </div>
    )
}

export default NavMobile
