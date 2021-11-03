import React, {useCallback, useEffect} from "react"
import styled from "./CartProductColumn.module.css"
import Link from "next/link"
import {formatPrice} from "utils/formatPrice"
import {useScreenSize} from "hooks/useScreenSize"
import {ProductColorCart} from "types/cart"
import RemoveButton from "./remove-button/RemoveButton"
import QtyInput from "./qty-input/QtyInput"
import ImageLink from "./image-link/ImageLink"
import {updateQtyCart} from "../../cartApi"
import {useDispatch} from "store"

interface CartProductColumnProps {
    product: ProductColorCart
    addTotalPrice: (sku: ProductColorCart["sku"], price: ProductColorCart["price"]) => void
    removeProductFromTotalPrice: (sku: ProductColorCart["sku"]) => void
}

const CartProductColumn: React.FC<CartProductColumnProps> = (
    {
        product,
        addTotalPrice,
        removeProductFromTotalPrice
    }
) => {
    const {width} = useScreenSize()
    const dispatch = useDispatch()

    // Изменения цены продукта
    const onChangeHandler = useCallback(
        (val: number) => {
            // Обновление в состоянии проекта
            dispatch(updateQtyCart({sku: product.sku, qty: val}))
        },
        [dispatch, product]
    )

    useEffect(() => {
        addTotalPrice(product.sku, product.total_price)
    }, [product, addTotalPrice])

    return (
        <>
            <div className={styled.imageDetails}>
                <ImageLink id={product.id} image={product.url_thumbnail} />
                <div className={styled.details}>
                    <Link href={`/product/${product.id}`} passHref>
                        <a className={styled.title}>{product.title}</a>
                    </Link>
                    <div className={styled.size}>{product.size.title}</div>
                    <div className={styled.price}>
                        {product.discount && (
                            <div className={styled.prevPrice}>
                                <span className={styled.oldPrice}>{formatPrice(product.price)}</span> -{" "}
                                <span className={styled.discount}>
                                    {Math.ceil(product.discount.discount)}%
                                </span>
                            </div>
                        )}
                        <div className={styled.mainPrice}>
                            {formatPrice(product.price, product.discount)} сум
                        </div>
                    </div>
                    {width < 767 && (
                        <div>
                            <QtyInput
                                qty={product.qty}
                                sizeQty={product.size.qty}
                                onChange={onChangeHandler}
                            />
                        </div>
                    )}
                </div>
            </div>
            {width > 767 && (
                <div className={styled.qty}>
                    <QtyInput qty={product.qty} sizeQty={product.size.qty} onChange={onChangeHandler} />
                    <RemoveButton
                        sku={product.sku}
                        removeProductFromTotalPrice={removeProductFromTotalPrice}
                    />
                </div>
            )}
            <div className={styled.total}>
                <div className={styled.totalPrice}>
                    {!!product.total_price ? (
                        `${formatPrice(product.total_price)} сум`
                    ) : (
                        <span className={styled.free}>Бесплатно</span>
                    )}
                </div>
                {!!(product.promotion && product.qty > product.promotion) && (
                    <div className={styled.promotion}>+ {product.promotion} бесплатно</div>
                )}
                {width < 767 && (
                    <RemoveButton
                        sku={product.sku}
                        removeProductFromTotalPrice={removeProductFromTotalPrice}
                    />
                )}
            </div>
        </>
    )
}

export default CartProductColumn
