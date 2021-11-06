import React, {useState} from "react"
import styled from "./Login.module.css"
import Button from "components/button/Button"
import Input from "components/input/Input"
import {useDispatch} from "store"
import {authUser} from "../authApi"
import {unwrapResult} from "@reduxjs/toolkit"
import Link from "next/link"
import {useRouter} from "next/router"

const Login = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const onSubmitHandler = async (e: any) => {
        e.preventDefault()
        setLoading(true)

        const data = new FormData(e.currentTarget)
        const object: any = {}
        data.forEach((value, key) => {
            object[key] = value
        })

        await dispatch(authUser(object))
            .then(unwrapResult)
            .then(() => {
                setError(null)
                router.push("/")
            }).catch(e => {
                setError(e.message)
                setLoading(false)
            })
    }

    return (
        <div className={styled.login}>
            <h1>Вход</h1>
            <form onSubmit={onSubmitHandler}>
                {error && <div className={styled.errorMessage}>{error}</div>}
                <div className={styled.formController}>
                    <Input placeholder="Почта" required type="email" name="email" id="email" />
                </div>
                <div className={styled.formController}>
                    <Input placeholder="Пароль" required type="password" name="password" id="password" />
                </div>
                {/*<div className={styled.subActions}>*/}
                {/*    <Link to="/auth/forgot-password">Забыли пароль?</Link>*/}
                {/*</div>*/}
                <Button block className={styled.action} typeHtml="submit" loading={loading}>
                    Войти
                </Button>
            </form>
            <div className={styled.registration}>
                <Link href="/auth/registration">
                    <Button type="secondary" block>
                        Регистрация
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default Login
