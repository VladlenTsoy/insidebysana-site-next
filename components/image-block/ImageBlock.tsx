import React, {useEffect, useState} from "react"
import styled from "./ImageBlock.module.css"
import NextImage from "next/image"
import LoadingOutlined from "@ant-design/icons/LoadingOutlined"
import WarningOutlined from "@ant-design/icons/WarningOutlined"

interface ImageBlockProps {
    src: string
    alt?: string
    priority?: boolean
    width?: number
    height?: number
    layout?: "fill" | "fixed" | "intrinsic" | "responsive"
    quality?: number | string;
}

const ImageBlock: React.FC<ImageBlockProps> = (
    {
        src,
        alt,
        priority,
        width,
        height,
        layout = "fill",
        quality
    }
) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        const image = new Image()
        image.src = src
        setLoading(!image.complete)
        image.onload = () => {
            setLoading(false)
        }
        image.onerror = () => {
            setError(true)
        }

        return () => {
            image.onload = null
            image.onerror = null
        }
    }, [src])

    return (
        <div className={styled.imageBlock}>
            {
                !error ?
                    loading ?
                        <div className={styled.loading}>
                            <LoadingOutlined />
                        </div> :
                        <div className={styled.image}>
                            <NextImage
                                src={src}
                                alt={alt}
                                layout={layout}
                                priority={priority}
                                width={width}
                                height={height}
                                objectFit="cover"
                                quality={quality}
                            />
                        </div> :
                    <div className={styled.loading}>
                        <WarningOutlined />
                    </div>
            }
        </div>
    )
}

export default ImageBlock