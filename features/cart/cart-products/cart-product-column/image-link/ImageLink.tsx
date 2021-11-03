import React from "react"
import styled from "./ImageLink.module.css"
import ImageBlock from "components/image-block/ImageBlock"
import {ProductColorCart} from "types/cart"
import {useRouter} from "next/router"

interface ImageLinkProps {
    id: ProductColorCart["id"]
    image: ProductColorCart["url_thumbnail"]
    priority?: boolean
    width?: number
    height?: number
    layout?: "fill" | "fixed" | "intrinsic" | "responsive"
}

const ImageLink: React.FC<ImageLinkProps> = (
    {
        image,
        id,
        priority,
        width,
        height,
        layout
    }
) => {
    const router = useRouter()

    const onClickProduct = () =>
        router.push(`/product/${id}`)

    return (
        <div className={styled.imageBlock}>
            <div className={styled.image} onClick={onClickProduct}>
                <ImageBlock
                    src={image}
                    priority={priority}
                    width={width}
                    height={height}
                    layout={layout}
                />
            </div>
        </div>
    )
}

export default React.memo<ImageLinkProps>(ImageLink)