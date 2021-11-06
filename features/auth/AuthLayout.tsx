import React from "react"
import styled from "./AuthLayout.module.css"

const AuthLayout: React.FC = ({children}) => {
    return (
        <div className={styled.auth}>
            {children}
        </div>
    )
}

export default AuthLayout
