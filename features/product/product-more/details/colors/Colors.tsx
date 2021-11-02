import React from "react"
import styled from "./Colors.module.css"
import {ProductColor} from "types/productColor"
import {useRouter} from "next/router"

interface ColorsProps {
    colors: ProductColor["colors"]
    color: ProductColor["color"]
}

const Colors: React.FC<ColorsProps> = ({colors, color}) => {
    const router = useRouter()

    const onClickHandler = (id: number) => {
        router.push(`/product/${id}`)
    }

    return (
        <div className={styled.colors}>
            <div className={styled.title}>Цвет: {color.title}</div>
            <div className={styled.colorsAction}>
                {colors &&
                    colors.map(color => (
                        <div
                            className={`${styled.color} ${
                                Number(router.query.id) === color.product_id && styled.active
                            }`}
                            style={{background: color.hex}}
                            onClick={() => onClickHandler(color.product_id)}
                            key={color.id}
                        />
                    ))}
            </div>
        </div>
    )
}

export default Colors
