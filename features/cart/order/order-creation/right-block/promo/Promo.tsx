import React, {Dispatch, SetStateAction, useCallback, useState} from "react"
import styled from "./Promo.module.css"
import Input from "components/input/Input"
import Button from "components/button/Button"
import {PromoCode} from "types/PromoCode"
// import {apiRequest} from "utils/api"
import {formatPrice} from "utils/formatPrice"
import Alert from "components/alert/Alert"
import {DOMAIN_API} from "utils/api"

interface PromoCodeProps {
    setPromoCode: Dispatch<SetStateAction<PromoCode | null>>
    promoCode: PromoCode | null
}

const Promo: React.FC<PromoCodeProps> = ({promoCode, setPromoCode}) => {
    const [loading, setLoading] = useState(false)
    const [code, setCode] = useState("")
    const [error, setError] = useState<string | null>(null)

    const fetchPromoCode = useCallback(async (code) => {
        setLoading(true)
        try {
            const response = await fetch(DOMAIN_API + "/promo-code", {
                method: "post",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({code})
            })
            setPromoCode(await response.json())
        } catch (e) {
            // @ts-ignore
            setError(e.message)
            setPromoCode(null)
        }
        setLoading(false)
    }, [setPromoCode])

    const onChangeHandler = (e: any) => {
        e.preventDefault()
        setCode(e.currentTarget.value)
    }

    const onSubmitHandler = async (e: any) => {
        e.preventDefault()
        setError(null)
        await fetchPromoCode(code)
    }

    return (
        <div className={styled.wrapper}>
            {error && <Alert type="error">{error}</Alert>}
            <form className={styled.promo} onSubmit={onSubmitHandler}>
                <Input className={styled.promoInput} placeholder="Промо-код" onChange={onChangeHandler} value={code} />
                <Button type="secondary" typeHtml="submit" filled disabled={!code.length}
                        loading={loading}>Применить</Button>
            </form>
            {
                promoCode &&
                <div className={styled.promoCodeInfo}>
                    <div>
                        Скидка
                    </div>
                    <div>
                        {
                            promoCode.type === "percent" ?
                                `${promoCode.discount}%` :
                                `${formatPrice(promoCode.discount)} сум`
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default Promo