import React, {useCallback, useEffect, useState} from "react"
import styled from "./Details.module.css"
import {formatPrice} from "utils/formatPrice"
import Colors from "./colors/Colors"
import Sizes from "./sizes/Sizes"
import Measurements from "./measurements/Measurements"
import {useStickyBlockScroll} from "hooks/useStickyBlockScroll"
import Properties from "./properties/Properties"
import CartButton from "./cart-button/CartButton"
import {Size} from "types/Size"
import WishlistButton from "./wishlist-button/WishlistButton"

interface DetailsProps {
    product: any
}

const Details: React.FC<DetailsProps> = ({product}) => {
    const ref = useStickyBlockScroll()
    const [size, setSize] = useState<Size["id"] | null>(null)
    const [requireSize, setRequireSize] = useState(false)

    const selectSizeHandler = useCallback(sizeId => {
        setSize(sizeId)
    }, [])

    const outputErrorSizeHandler = useCallback(() => {
        setRequireSize(true)
    }, [])

    useEffect(() => {
        if (size) setRequireSize(false)
    }, [size])

    return (
        <div className={styled.details}>
            <div className={styled.info} ref={ref} id="product-details-info">
                <h1 className={styled.title}>
                    {product.title}
                </h1>
                <div className={styled.tagId}>
                    ID: PC{product.id}
                    {size ? `S${size}` : null}
                </div>
                <div className={styled.price}>
                    {product.discount && (
                        <div className={styled.prevPrice}>
                            <span className={styled.oldPrice}>{formatPrice(product.price)}</span> -{" "}
                            <span className={styled.discount}>{Math.ceil(product.discount.discount)}%</span>
                        </div>
                    )}
                    <div className={styled.mainPrice}>{formatPrice(product.price, product.discount)} сум</div>
                </div>
                <Colors colors={product.colors} color={product.color} />
                <Sizes
                    sizes={product.sizes}
                    requireSize={requireSize}
                    selectSizeHandler={selectSizeHandler}
                />
                <CartButton product={product} sizeId={size} outputErrorSizeHandler={outputErrorSizeHandler} />
                 {/*<div className={styled.buyNow}>*/}
                {/*<Button type="primary" filled block>Купить сейчас</Button>*/}
                {/*</div>*/}
                <WishlistButton productId={product.id} />
                <Properties properties={product.properties} productId={product.product_id}>
                    <Measurements productId={product.id} />
                </Properties>
                {/*<ScrollActionButton/>*/}
            </div>
        </div>
    )
}

export default Details
