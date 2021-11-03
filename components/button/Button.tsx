import React from "react"
import styled from "./Button.module.css"
import LoadingOutlined from "@ant-design/icons/LoadingOutlined"

interface ButtonProps {
    type?: "primary" | "secondary" | "default"
    size?: "large" | "small" | "middle"
    filled?: boolean
    link?: boolean
    disabled?: boolean
    loading?: boolean
    block?: boolean
    icon?: React.ReactFragment
    onClick?: HTMLButtonElement["click"]
    className?: HTMLButtonElement["className"]
    typeHtml?: "submit" | "reset" | "button"
    children: React.ReactNode
}

interface ButtonRefProps extends ButtonProps {
    innerRef: React.Ref<HTMLButtonElement>
}

const Button: React.FC<ButtonRefProps> = (
    {
        innerRef,
        children,
        typeHtml = "button",
        size = "middle",
        type = "default",
        filled,
        loading,
        link,
        icon,
        block,
        onClick,
        disabled,
        className
    }
) => {
    return (
        <button
            ref={innerRef}
            type={typeHtml}
            disabled={disabled || loading}
            onClick={onClick}
            className={`
                ${styled.button}
                ${styled[type]}
                ${styled[size]}
                ${!link ? (filled ? styled.filled : styled.ghost) : styled.link}
                ${block && styled.block}
                ${className}
            `}>
            {
                loading ?
                    <span className={styled.icon}><LoadingOutlined /></span> :
                    icon && <span className={styled.icon}>{icon}</span>
            }
            {children}
        </button>
    )
}

export default React.forwardRef<HTMLButtonElement, ButtonProps>(
    (props, ref) =>
        <Button innerRef={ref} {...props} >
            {props.children}
        </Button>
)