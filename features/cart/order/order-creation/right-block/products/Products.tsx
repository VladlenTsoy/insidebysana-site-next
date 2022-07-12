import React from "react"
import styled from "./Products.module.css"
import ImageBlock from "components/image-block/ImageBlock"
import {formatPrice} from "utils/formatPrice"
import {useLoadingCart, useSelectAllProductCart} from "../../../../cartSlice"
import LoaderBlock from "components/loader-block/LoaderBlock"

const Products = () => {
    const loading = useLoadingCart()
    const products = useSelectAllProductCart()

    if (loading) return <LoaderBlock />

    return (
        <div className={styled.products}>
            {products.map((product: any) => (
                <div className={styled.product} key={product.sku}>
                    <div className={styled.imageBlock}>
                        <div className={styled.image}>
                            <ImageBlock src={product.url_thumbnail} alt={product.title} />
                        </div>
                    </div>
                    <div className={styled.info}>
                        <div className={styled.title}>{product.title}</div>
                        <div className={styled.size}>{product.size.title}</div>
                    </div>
                    <div className={styled.price}>
                        {product.discount && (
                            <div className={styled.discount}>
                                <span className={styled.oldPrice}>
                                    {formatPrice(product.price * product.qty)}
                                </span>{" "}
                                -{" "}
                                <span className={styled.priceDiscount}>
                                    {Math.ceil(product.discount.discount)}%
                                </span>
                            </div>
                        )}
                        <div className={styled.totalPrice}>
                            {product.total_price ? `${formatPrice(product.total_price)} сум` : "Бесплатно"}
                            {Boolean(product.promotion && product.qty > 1) && (
                                <div>+ {product.promotion} бесплатно</div>
                            )}
                        </div>
                        <div className={styled.qty}>
                            <span>кол-во:</span> {product.qty}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default React.memo(Products)
