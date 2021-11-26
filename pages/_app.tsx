import "../styles/globals.css"
import type {AppProps} from "next/app"
import {persistor, store} from "../store"
import {Provider} from "react-redux"
import {PersistGate} from "redux-persist/integration/react"
import HeadMeta from "../layouts/head-meta/HeadMeta"

function MyApp({Component, pageProps}: AppProps) {
    return <>
        <HeadMeta>
            {/* Facebook Pixel Code */}
            <script dangerouslySetInnerHTML={{
                __html: `!function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                    n.queue=[];t=b.createElement(e);t.async=!0;
                    t.src=v;s=b.getElementsByTagName(e)[0];
                    s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '230761784901784');
                fbq('track', 'PageView');`
            }} />
            <noscript>
                <img
                    height="1" width="1" style={{display: "none"}}
                    src="https://www.facebook.com/tr?id=230761784901784&ev=PageView&noscript=1"
                />
            </noscript>
            {/* End Facebook Pixel Code */}
            {/* Yandex.Metrika counter  */}
            <script
                dangerouslySetInnerHTML={{
                    __html: `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

                ym(83295820, "init", {
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true,
                webvisor:true,
                ecommerce:"dataLayer"
            });`
                }}
            />
            <noscript>
                <div>
                    <img
                        src="https://mc.yandex.ru/watch/83295820" alt=""
                        style={{position: "absolute", left: "-9999px"}}
                    />
                </div>
            </noscript>
            {/* Yandex.Metrika counter  */}
        </HeadMeta>
        <Provider store={store}>
            <PersistGate persistor={persistor} loading={null}>
                <Component {...pageProps} />
            </PersistGate>
        </Provider>
    </>
}

export default MyApp
