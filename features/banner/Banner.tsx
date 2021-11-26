import React from "react"
import styles from "./Banner.module.css"
import ImageBlock from "components/image-block/ImageBlock"
import Button from "components/button/Button"
import {Carousel} from "react-responsive-carousel"
import {BannerType} from "types/Banner"
import {useRouter} from "next/router"
import BannerImage from "assets/images/banner.jpg"
import {useScreenSize} from "../../hooks/useScreenSize"

interface BannerProps {
    banners: BannerType[]
}

const Banner: React.FC<BannerProps> = ({banners}) => {
    const {width} = useScreenSize()
    const router = useRouter()

    return (
        <div className={styles.wrapper}>
            <Carousel
                className={styles.banner}
                autoPlay
                interval={10000}
                dynamicHeight
                showArrows={false}
                showIndicators={true}
                showStatus={false}
                infiniteLoop={true}
                showThumbs={false}
                swipeScrollTolerance={10}
                preventMovementUntilSwipeScrollTolerance
            >
                {width > 767 ? banners.map((banner, key) => {
                    const onClickHandler = () => router.push(banner.button_link)

                    return <div className={styles.slider} key={key}>
                        <ImageBlock src={banner.url_image} priority={key === 0} quality={100} />
                        <div className={styles.container}>
                            <div className={styles.info}>
                                <div className={styles.title}>{banner.title}</div>
                                <div className={styles.action}>
                                    <Button filled onClick={onClickHandler}>{banner.button_title}</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                }) : [
                    <div className={styles.slider} key="mob">
                        <ImageBlock src={BannerImage} priority quality={100} />
                        <div className={styles.container}>
                            <div className={styles.info}>
                                {/*<div className={styles.title}>BLACK FRIDAY</div>*/}
                                <div className={styles.action}>
                                    <Button filled onClick={() => router.push("/products/all")}>Подробнее</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                ]
                }
            </Carousel>
        </div>
    )
}

export default Banner
