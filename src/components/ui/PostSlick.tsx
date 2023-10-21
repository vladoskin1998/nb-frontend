import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { ReactNode, useState } from "react"

export const PostSlick = ({
    children,
    list,
    changeCurrentSlide = () => {},
}: {
    children: ReactNode
    list: string[]
    changeCurrentSlide?: (n: number) => void
}) => {

    const [widthBar,setWidthBar] = useState(6)

    var settings = {
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        afterChange: (n: number) => {
            changeCurrentSlide(n)
            setWidthBar(n*16 + 6)
        },
    }
    return (
        <div className="ui-post-slider">
            <Slider {...settings}>{children}</Slider>
            <div className="ui-post-slider-list">
                {list.map((it, id) => (
                    <div className="ui-post-slider-list-item">
                        {!id && <div  className="ui-post-slider-bar" style={{width:`${widthBar}px`}}/>}
                    </div>
                ))}
            </div>
            
        </div>
    )
}
