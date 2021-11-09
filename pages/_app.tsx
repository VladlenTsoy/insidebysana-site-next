import "../styles/globals.css"
import type {AppProps} from "next/app"
import {persistor, store} from "../store"
import {Provider} from "react-redux"
import {PersistGate} from "redux-persist/integration/react"
import HeadMeta from "../layouts/head-meta/HeadMeta"

function MyApp({Component, pageProps}: AppProps) {
    return <>
        <HeadMeta />
        <Provider store={store}>
            <PersistGate persistor={persistor} loading={null}>
                <Component {...pageProps} />
            </PersistGate>
        </Provider>
    </>
}

export default MyApp
