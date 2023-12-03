import React, { useState } from "react"
import { UserHeaderMain } from "../header/UserHeaderMain"
import { InputSearch } from "../../ui/InputSearch"
import Slider from "react-slick"
import { IconLeftChevrons, IconRightChevrons } from "../../svg/IconChevrons"
import { IconProfileInfoBookmark } from "../../svg/IconProfileInfo"
import { IconArrowRight } from "../../svg/IconArrow"
import { IconStars } from "../../svg/IconFavor"

const advService = [
    "Ger discount for every order, only valid for today",
    "Ger discount for every order, only valid for today",
    "Ger discount for every order, only valid for today",
    "Ger discount for every order, only valid for today",
    "Ger discount for every order, only valid for today",
    "Ger discount for every order, only valid for today",
    "Ger discount for every order, only valid for today",
]

const categories = [
    {
        fileName: "/Images/burgerdelete.png",
        name: "Delivery",
        numberSub: 489,
    },
    {
        fileName: "/Images/burgerdelete.png",
        name: "Delivery",
        numberSub: 489,
    },
    {
        fileName: "/Images/burgerdelete.png",
        name: "Delivery",
        numberSub: 489,
    },
]

const services = [
    {
        title: "Cleaning premises quickly and efficiently i... ",
        text: "Experience  the convenience with our Delivery x2 service. Get your packages delivered to your door...",
        filesName: "/Images/MaskDelete.png",
    },
    {
        title: "Cleaning premises quickly and efficiently i... ",
        text: "Experience  the convenience with our Delivery x2 service. Get your packages delivered to your door...",
        filesName: "/Images/MaskDelete.png",
    },
]

export const UserServicesMain = () => {
    const [searsh, setSearch] = useState("")
    const [currentSlideFirst, setCurrentSlideFirst] = useState(0)

    const settingsFirst = {
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        className: "user__services-adv-ins",
        afterChange: (n: number) => setCurrentSlideFirst(n),
    }

    const settingsSecond = {
        infinite: false,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        className: "user__services-category-slick-ins",
    }

    return (
        <>
            <UserHeaderMain />
            <div className="user__newsfeed-search">
                <InputSearch
                    placeholder={
                        <>
                            Search<span> NeightborHarbor</span>
                        </>
                    }
                    value={searsh}
                    changeValue={setSearch}
                />
            </div>
            <div className="user__services-adv">
                <div className="user__services-adv-slick">
                    <Slider {...settingsFirst}>
                        {advService.map((item, index) => (
                            <div className="user__services-adv-item-body">
                                <div
                                    className={`user__services-adv-item ${
                                        index === currentSlideFirst &&
                                        "user__services-adv-item--active"
                                    }`}
                                >
                                    <div>
                                        <h6 className="user__services-adv-item-undertitle">
                                            Offer AC Service
                                        </h6>
                                        <h4 className="user__services-adv-item-title">
                                            Today’s Special!
                                        </h4>
                                        <h5 className="user__services-adv-item-subtitle">
                                            {item}
                                        </h5>
                                        <button className="user__services-adv-item-button">
                                            Grab Offer <IconRightChevrons />
                                        </button>
                                    </div>
                                    <div className="user__services-adv-item-img">
                                        <img
                                            src="/Images/MaskDelete.png"
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
            <div className="user__newsfeed-steper-body">
                {advService.map((item, index) => (
                    <div
                        className={`user__newsfeed-steper-item ${
                            index <= currentSlideFirst &&
                            "user__newsfeed-steper-item-active"
                        }`}
                    />
                ))}
            </div>
            <div className="user__services-category">
                <h5 className="user__services-category-title">Categories</h5>
                <button className="user__services-category-button">
                    View all
                </button>
            </div>
            <div className="user__services-category-slick">
                <Slider {...settingsSecond}>
                    {categories.map((item) => (
                        <div className="user__services-category-item-body">
                            <div className="user__services-category-item">
                                <div className="user__services-category-item-img">
                                    <img src={item.fileName} alt="" />
                                </div>

                                <div className="user__services-category-item-text">
                                    <b>{item.name}</b>{" "}
                                    <span>{item.numberSub}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
            <div className="user__services-category user__services-last-title">
                <h5 className="user__services-category-title">
                    Latest Services
                </h5>
            </div>
            <div className="user__services-last">
                {services.map((item) => (
                    <div className="user__services-last-item">
                        <div className="user__services-last-item-img">
                            <div className="user__services-last-item-img-1 user__services-last-item-img-info">
                                <div className="user__services-last-item-img-text">Cleaning</div>
                                
                            </div>
                            <img src={item.filesName} alt="" />
                            <div className="user__services-last-item-img-2 user__services-last-item-img-info">
                                <div className="user__services-last-item-img-text">
                                    <IconStars/>
                                    <b>4.5</b>
                                    <span>{'( 808 )'}</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="user__services-last-item-row1">
                                <h5 className="user__services-last-item-title">
                                    {item.title}
                                </h5>
                                <button>
                                    <IconProfileInfoBookmark />
                                </button>
                            </div>
                            <h6 className="user__services-last-item-text">
                                {item.text}
                            </h6>
                            <div className="user__services-last-item-foot">
                                1 km
                                    <IconArrowRight />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <button className="user__services-last-button user__services-last-button">
                    View all
            </button>
        </>
    )
}
