import React, {useCallback, useState} from "react"
import RightBlock from "./right-block/RightBlock"
import LeftBlock from "./left-block/LeftBlock"
import Header from "./header/Header"
import {PromoCode} from "types/PromoCode"
import styled from "./OrderCreation.module.css"
import {Delivery} from "types/Delivery"
import {useSelectAllProductCart} from "../../cartSlice"
import {useDispatch} from "store"
import {clearCart} from "../../cartApi"
import {redirectPost} from "utils/redirectPost"
import {AdditionalService} from "types/AdditionalService"
import {useUser} from "features/auth/authSlice"
import {DOMAIN_API} from "../../../../utils/api"
import {Purchase} from "../../../../utils/analyticEvents"

interface OrderCreationProps {
    onClose: () => void
    updateOrderId: (orderId: number) => void
}

const OrderCreation: React.FC<OrderCreationProps> = ({onClose, updateOrderId}) => {
    const dispatch = useDispatch()
    const {detail, token} = useUser()
    const [promoCode, setPromoCode] = useState<PromoCode | null>(null)
    const [total, setTotal] = useState<number>(0)
    const [step, setStep] = useState("information")
    const [information, setInformation] = useState(
        detail
            ? {
                full_name: detail.full_name,
                phone: detail.phone,
                email: "",
                country: 1,
                city: "",
                address: "",
                client_address_id: 0
            }
            : {
                full_name: "",
                phone: "",
                email: "",
                country: 1,
                city: "",
                address: "",
                client_address_id: 0
            }
    )
    const [delivery, setDelivery] = useState<Delivery | null>(null)
    const [additionalService, setAdditionalService] = useState<AdditionalService | null>(null)
    const products = useSelectAllProductCart()

    const changeStep = useCallback(step => {
        setStep(step)
    }, [])

    const onChangeInformation = useCallback((values: any) => {
        setInformation(values)
        setStep("delivery")
    }, [])

    const onChangeDelivery = useCallback((values: any) => {
        setDelivery(values)
    }, [])

    const onSubmitDelivery = useCallback(() => {
        setStep("additional-service")
    }, [])

    const onSubmitAdditionalService = useCallback(() => {
        setStep("payment")
    }, [])

    const onChangeAdditionalService = useCallback((values: any) => {
        setAdditionalService(values)
    }, [])

    const onSubmitPayment = useCallback(
        async (paymentId: number) => {
            if (delivery) {
                const response = await fetch(DOMAIN_API + (token ? "/client/order" : "/order"), {
                    method: "post",
                    headers: {
                        Authorization: "Bearer " + token,
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        payment_id: paymentId,
                        delivery_id: delivery.id,
                        products: products,
                        promo_code: promoCode,
                        total_price: total + delivery.price,
                        information,
                        additionalService
                    })
                })
                if (response.ok) {
                    const {payment_opts, order_id} = await response.json()
                    //
                    Purchase({
                        id: order_id,
                        promo_code: promoCode,
                        payment_id: paymentId,
                        delivery: delivery,
                        products: products,
                        total_price: total + delivery.price,
                    })

                    await dispatch(clearCart())
                    if (payment_opts)
                        //
                        redirectPost(payment_opts.url, payment_opts.form, payment_opts.method)
                    else updateOrderId(order_id)
                }
            }
        },
        [
            delivery,
            products,
            promoCode,
            total,
            information,
            dispatch,
            updateOrderId,
            token,
            additionalService
        ]
    )

    return (
        <div className={styled.wrapper}>
            <div className={styled.mobileHeader}>
                <Header onClose={onClose} step={step} changeStep={changeStep} />
            </div>
            <div className={styled.container}>
                <LeftBlock
                    additionalService={additionalService}
                    step={step}
                    onChangeInformation={onChangeInformation}
                    onChangeDelivery={onChangeDelivery}
                    onClose={onClose}
                    changeStep={changeStep}
                    onSubmitDelivery={onSubmitDelivery}
                    information={information}
                    delivery={delivery}
                    onSubmitPayment={onSubmitPayment}
                    onSubmitAdditionalService={onSubmitAdditionalService}
                    onChangeAdditionalService={onChangeAdditionalService}
                />
                <RightBlock
                    additionalService={additionalService}
                    delivery={delivery}
                    setPromoCode={setPromoCode}
                    promoCode={promoCode}
                    setTotal={setTotal}
                    total={total}
                />
            </div>
        </div>
    )
}
export default OrderCreation
