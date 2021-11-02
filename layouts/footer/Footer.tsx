import React from "react"
import styled from "./Footer.module.css"
import Link from "next/link"
import Newsletter from "./newsletter/Newsletter"

const Footer = () => {
    const year = new Date().getFullYear()

    return (
        <>
            <div className={styled.footer}>
                <div className={styled.footerColumn}>
                    <h4>Покупателям</h4>
                    <div className={styled.navigation}>
                        <Link href="/public-offer">Публичная оферта</Link>
                        <Link href="/return-policy">Политика возврата</Link>
                        <Link href="/privacy-policy">Политика конфиденциальности</Link>
                        <Link href="/payment">Оплата</Link>
                        <Link href="/delivery">Доставка</Link>
                        <Link href="/cookies">Cookies</Link>
                    </div>
                </div>
                <div className={styled.footerColumn}>
                    <h4>О компании</h4>
                    <div className={styled.navigation}>
                        <Link href="/about-us">О нас</Link>
                        <Link href="/contacts">Адрес шоурума</Link>
                        <Link href="/contacts">Контакты</Link>
                        <a href="https://www.instagram.com/insidebysana" target="_blank" rel="noreferrer">
                            Instagram
                        </a>
                        <a href="https://www.facebook.com/insidebysana" target="_blank" rel="noreferrer">
                            Telegram
                        </a>
                        <Link href="/lookbook">Lookbook</Link>
                    </div>
                </div>
                <div className={styled.footerColumn}>
                    <h4>Новостная рассылка</h4>
                    <Newsletter />
                </div>
            </div>
            <div className={styled.copyright}>
                {year} © InsideBySana. All rights reserved. Design and development by{" "}
                <a href="http://limitless.uz">Vladlen</a>.
            </div>
        </>
    )
}

export default Footer
