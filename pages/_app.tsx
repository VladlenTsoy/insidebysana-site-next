import "../styles/globals.css"
import type {AppProps} from "next/app"
import {persistor, store} from "../store"
import {Provider} from "react-redux"
import {PersistGate} from "redux-persist/integration/react"
import HeadMeta from "../layouts/head-meta/HeadMeta"
import {Analytics} from "@vercel/analytics/react"

function MyApp({Component, pageProps}: AppProps) {
    return <>
        <HeadMeta>
            {/* Google Tag Manager */}
            <script dangerouslySetInnerHTML={{
                __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-NZ25ZS3');`
            }} />
            {/* End Google Tag Manager */}
        </HeadMeta>
        <Provider store={store}>
            <PersistGate persistor={persistor} loading={null}>
                <Component {...pageProps} />
            </PersistGate>
        </Provider>
        {/* Google Tag Manager (noscript) */}
        <noscript>
            <iframe
                src="https://www.googletagmanager.com/ns.html?id=GTM-NZ25ZS3"
                height="0" width="0" style={{display: "none", visibility: "hidden"}} />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <Analytics />
    </>
}

export default MyApp
