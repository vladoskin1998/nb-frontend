import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { ReactNode } from "react"

export const SlickCategories = ({
    children,
    changeCurrentSlide = () => {},
}: {
    children: ReactNode
    changeCurrentSlide?: (n:number) => void
}) => {
    var settings = {
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 2,
        afterChange: (n:number) => changeCurrentSlide(n)
    }
    return <Slider {...settings}>{children}</Slider>
}
