import React from "react"
import styled from "./Order.module.css"
import OrderSuccessful from "../cart/order/order-successful/OrderSuccessful"
import LoaderBlock from "components/loader-block/LoaderBlock"
import PaymentWaiting from "./payment-waiting/PaymentWaiting"
import Title from "components/title/Title"
import {useGetOrderByIdQuery} from "./orderApi"
import Link from "next/link"
import {useRouter} from "next/router"

const Order: React.FC = () => {
    const router = useRouter()
    const {data: order, isLoading, error} = useGetOrderByIdQuery(String(router.query.id))

    if (isLoading) return <LoaderBlock />

    if (error) {
        return (
            <div className={`container ${styled.wrapper}  ${styled.notFound}`}>
                <p>Срок действия вашей брони, к сожалению, истёк.</p>
                <p>Вы можете оформить новый заказ.</p>
            </div>
        )
    }

    if (!order || order?.payment_state === 1)
        return (
            <div className={`container ${styled.wrapper} ${styled.notFound}`}>
                <p>К сожалению, заказ с указанным вами номером не найден.</p>
                <p>
                    Пожалуйста, попробуйте ещё раз или перейдите в раздел <Link href="/cart" passHref>
                    <a>"Корзина"</a>
                </Link>.
                </p>
            </div>
        )

    if (order.payment_state === -1)
        return (
            <div className={`container ${styled.wrapper}  ${styled.notFound}`}>
                <p>Срок действия вашей брони, к сожалению, истёк.</p>
                <p>Вы можете оформить новый заказ.</p>
            </div>
        )

    if (order?.payment_id !== 3 && order.payment_state === 0)
        return (
            <div className={`container ${styled.wrapper}`}>
                <PaymentWaiting order={order} />
            </div>
        )

    return (
        <div className={`container ${styled.wrapper}`}>
            <OrderSuccessful orderId={router.query.id} />
        </div>
    )
}

const OrderWraper = () => {
    const router = useRouter()

    return (
        <>
            <Title level={1}>Заказ #{router.query.id}</Title>
            <Order />
        </>
    )
}

export default OrderWraper
