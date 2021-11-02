import React from "react"
import styled from "./Logo.module.css"
import LogoImage from "./logo.png"
import {useRouter} from "next/router"

const Logo = () => {
    const router = useRouter()

    // Клик по логотипу
    const onClickHandler = () =>
        router.push("/")

    return (
        <div className={styled.logo} onClick={onClickHandler}>
            <img src={LogoImage} alt="inside by Sana" />
        </div>
    )
}

export default Logo