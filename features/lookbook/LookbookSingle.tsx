import EmptyBlock from "components/empty-block/EmptyBlock"
import LoaderBlock from "components/loader-block/LoaderBlock"
import Title from "components/title/Title"
import React from "react"
import {useGetLookbookByCategoryIdQuery} from "./lookbookApi"
import styled from "./Lookbook.module.css"
import {LookbookCategories} from "./Lookbook"
import {useRouter} from "next/router"

interface ParamsProps {
    id: string
}

const LookbookSingle: React.FC = () => {
    const {query} = useRouter()
    const {data: lookbook, isLoading} = useGetLookbookByCategoryIdQuery(String(query.id))
    return (
        <>
            <Title level={1}>{isLoading ? "LOOKBOOK" : lookbook?.title}</Title>
            <div className="container">
                {isLoading ? (
                    <LoaderBlock />
                ) : lookbook ? (
                    lookbook.images.map(item => (
                        <div className={styled.lookbookItem} key={item.id}>
                            <img src={item.url_image} alt={`lookbook-${item.id}`} />
                        </div>
                    ))
                ) : (
                    <EmptyBlock />
                )}
                {lookbook && <LookbookCategories categoryId={lookbook.id} />}
            </div>
        </>
    )
}
export default LookbookSingle
