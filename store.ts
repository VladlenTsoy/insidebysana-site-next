import {configureStore} from "@reduxjs/toolkit"
import {useDispatch as useDefaultDispatch} from "react-redux"
import {
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    persistCombineReducers
} from "redux-persist"
import storage from "redux-persist/lib/storage"
// import {bannerApi} from "./home/bannerApi"
import {productApi} from "features/product/productApi"
// import {categoryApi} from "layouts/header/navigation/nav-desktop/products-menu/categories-menu/categoryApi"
// import {lookbookApi} from "./lookbook/lookbookApi"
// import {orderApi} from "./orders/orderApi"
import wishlist from "features/wishlist/wishlistSlice"
import cart from "features/cart/cartSlice"
import app from "layouts/appSlice"
import auth from "features/auth/authSlice"
// import product from "./products/productSlice"
// import {deliveryApi} from "./cart/order/order-creation/left-block/delivery/deliveryApi"
// import {additionalServiceApi} from "./cart/order/order-creation/left-block/additional-service/additionalServiceApi"
// import {cityApi} from "./cart/order/order-creation/left-block/information/delivery-address/cityApi"
// import {countryApi} from "./cart/order/order-creation/left-block/information/delivery-address/countryApi"
// import {addressApi} from "./account/delivery-addresses/addressApi"
import {newsletterApi} from "./layouts/footer/newsletter/newsletterApi"
import {measurementApi} from "features/product/product-more/details/measurements/measurementApi"


const persistConfig = {
    key: "root",
    storage
}

const persistedCombineReducers = persistCombineReducers(persistConfig, {
    // [bannerApi.reducerPath]: bannerApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    // [categoryApi.reducerPath]: categoryApi.reducer,
    // [lookbookApi.reducerPath]: lookbookApi.reducer,
    // [orderApi.reducerPath]: orderApi.reducer,
    // [deliveryApi.reducerPath]: deliveryApi.reducer,
    // [cityApi.reducerPath]: cityApi.reducer,
    // [countryApi.reducerPath]: countryApi.reducer,
    // [addressApi.reducerPath]: addressApi.reducer,
    [newsletterApi.reducerPath]: newsletterApi.reducer,
    [measurementApi.reducerPath]: measurementApi.reducer,
    // [additionalServiceApi.reducerPath]: additionalServiceApi.reducer,
    wishlist,
    app,
    cart,
    auth
    // product
})

export const store = configureStore({
    reducer: persistedCombineReducers,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        })
            .concat(productApi.middleware)
            .concat(measurementApi.middleware)
})

export const persistor = persistStore(store)

export type StoreState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export interface ThunkProps {
    dispatch: AppDispatch
    state: StoreState
    extra?: unknown
    rejectValue?: unknown
}

export const useDispatch = () => useDefaultDispatch<AppDispatch>()
