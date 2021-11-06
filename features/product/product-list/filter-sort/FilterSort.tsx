import React, {useEffect, useState} from "react"
import styled from "./FilterSort.module.css"
import Filter from "./filter/Filter"
import {fetchProductsByFilter} from "../fetchProductsByFilter"
import {useDispatch} from "store"
import {useScreenSize} from "hooks/useScreenSize"
import FilterMobile from "./filter-mobile/FilterMobile"
import {useCurrentFilter} from "features/product/productSlice"
import {useRouter} from "next/router"

const FilterSort = () => {
    const {colorIds, price, sizeIds, subCategoryIds} = useCurrentFilter()
    const [sort] = useState({column: "created_at", dir: "desc"})
    const {width} = useScreenSize()
    const dispatch = useDispatch()
    const router = useRouter()

    useEffect(() => {
        const promise = dispatch(
            fetchProductsByFilter({
                sort,
                categoryId: router.query?.id,
                colorIds,
                price,
                sizeIds,
                subCategoryIds
            })
        )
        return () => {
            promise.abort()
        }
    }, [dispatch, router, sort, colorIds, price, sizeIds, subCategoryIds])

    return (
        <div className={styled.filterAction}>
            <div className={styled.filterActionContainer}>
                {width > 767 ? <Filter /> : <FilterMobile />}
            </div>
        </div>
    )
}

export default FilterSort
