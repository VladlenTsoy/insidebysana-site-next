import React from "react"
import ImageBlock from "components/image-block/ImageBlock"
import Link from "next/link"
import {ProductColor} from "types/productColor"
import styled from "./ModalProductInfo.module.css"
import Button from "components/button/Button"
import {formatPrice} from "utils/formatPrice"
import {useSelectAllSkuCart} from "features/cart/cartSlice"

interface ModalProductInfoProps {
    product: ProductColor
    close: () => void
}

const ModalProductInfo: React.FC<ModalProductInfoProps> = ({product, close}) => {
    const skus = useSelectAllSkuCart()
    return (
        <>
            <div className={styled.content}>
                {skus.length < 2 && (
                    <>
                        <p className={styled.text}>Спасибо!</p>
                        <p className={`${styled.text} ${styled.mb}`}>Вы добавили товар в корзину:</p>
                    </>
                )}
                {skus.length === 2 && (
                    <>
                        <p className={`${styled.text} ${styled.mb}`}>
                            <b>Только сейчас приобретая два изделия, вы получаете ещё два в подарок 😍</b>
                            <br />
                            <b>Добавьте в корзину ещё 2 товара, которые хотите получить в подарок</b>
                        </p>
                    </>
                )}
                {skus.length === 3 && (
                    <p className={`${styled.text} ${styled.mb}`}>
                        <b>Пожалуйста, добавьте ещё один товар в корзину для подарка.</b>
                    </p>
                )}

                <div className={styled.imageBlock}>
                    <div className={styled.image}>
                        <ImageBlock src={product.images[0].url} />
                    </div>
                </div>

                <p className={styled.title}>{product.title}</p>
                <p className={styled.price}>{formatPrice(product.price, product.discount)} сум</p>
                <div className={styled.button}>
                    <Link href="/cart/order">
                        <Button type="secondary" filled>
                            оформить заказ
                        </Button>
                    </Link>
                </div>
                <div className={styled.actions}>
                    <Link href="/cart" passHref><a>ПРОСМОТРЕТЬ КОРЗИНУ</a></Link>
                    <div onClick={close}>ПРОДОЛЖИТЬ ПОКУПКИ</div>
                </div>
            </div>
        </>
    )
}
export default ModalProductInfo
