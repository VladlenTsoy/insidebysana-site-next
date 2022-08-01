import React from "react"
import {ProductColor} from "types/productColor"
import styled from "../Details.module.css"
import Button from "components/button/Button"
import HeartOutlined from "@ant-design/icons/HeartOutlined"
import HeartFilled from "@ant-design/icons/HeartFilled"
import {useDispatch} from "store"
import {wishlistSelector} from "features/wishlist/wishlistSlice"
import {useSelector} from "react-redux"
import {removeFromWishlist, addToWishlist} from "features/wishlist/wishlistApi"
import {AddToWishlist} from "../../../../../utils/analyticEvents"

interface WishlistButtonProps {
    product: ProductColor
}

const WishlistButton: React.FC<WishlistButtonProps> = ({product}) => {
    const wishlist = useSelector(wishlistSelector)
    const dispatch = useDispatch()

    const addToWishlistHandler = () => {
        AddToWishlist(product)
        dispatch(addToWishlist(product.id))
    }

    const removeFromWishlistHandler = () => dispatch(removeFromWishlist(product.id))

    return (
        <div className={styled.addToWishlist}>
            {wishlist.items.includes(product.id) ? (
                <Button
                    type="primary"
                    link
                    block
                    size="small"
                    icon={<HeartFilled />}
                    onClick={removeFromWishlistHandler}
                >
                    Удалить из избранного
                </Button>
            ) : (
                <Button
                    type="primary"
                    link
                    block
                    size="small"
                    icon={<HeartOutlined />}
                    onClick={addToWishlistHandler}
                >
                    Добавить в избранное
                </Button>
            )}
        </div>
    )
}

export default WishlistButton
