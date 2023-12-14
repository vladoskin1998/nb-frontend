import React, { useEffect, useState } from "react"
import { UserHeaderMain } from "../header/UserHeaderMain"
import { InputSearch } from "../../ui/InputSearch"
import Slider from "react-slick"
import { IconLeftChevrons, IconRightChevrons } from "../../svg/IconChevrons"
import { IconProfileInfoBookmark } from "../../svg/IconProfileInfo"
import { IconArrowRight } from "../../svg/IconArrow"
import { IconStars } from "../../svg/IconFavor"
import { IconAdminClose } from "../../svg/IconAdminHeader"
import { IconLocationAim, IconLocationPoint } from "../../svg/IconsLocation"
import { IconNeibs } from "../../svg/IconPassEye"
import { useAppSelector } from "../../../utils/hooks"
import { baseURL, roleUrl } from "../../../utils/config"
import { useNavigate } from "react-router-dom"
import { ServiceHttp } from "../../../http/service-http"
import {
    ParticipantType,
    PublishEventItemInterface,
    PublishServiceItemInterface,
} from "../../../types/types"
import { ActivitiesHttp } from "../../../http/activities-http"

const advService = [
    "Ger discount for every order, only valid for today",
    "Ger discount for every order, only valid for today",
    "Ger discount for every order, only valid for today",
    "Ger discount for every order, only valid for today",
    "Ger discount for every order, only valid for today",
    "Ger discount for every order, only valid for today",
    "Ger discount for every order, only valid for today",
]

export const UserActivitiesMain = () => {
    const [searsh, setSearch] = useState("")
    const [currentSlideFirst, setCurrentSlideFirst] = useState(0)
    const { activities } = useAppSelector((s) => s.activitiesReducer)
    const { role,_id} = useAppSelector((s) => s.userReducer)
    const [publishActivities, setPublishActivities] = useState<
      PublishEventItemInterface[]
    >([])
    const navigate = useNavigate()

      

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

    useEffect(() => {
        ActivitiesHttp.getTenPublishActivities().then((s) => setPublishActivities(s))
    }, [])

    const toProfileInfo = (prop: {
        _id: string
        email: string
        role: string
        fullName: string
        avatarFileName: string
    }) => {
        navigate("/profileinfo", {
            state: prop,
        })
    }

    const openChat = (_id:string) => {
        navigate(`${roleUrl(role)}/messeges/chat?headerUserId=${_id}`, {
            state: {
                participants: [
                    {
                        userId: _id,
                    },
                ],
            },
        })
    }

    const toPublishActivities = (_id: string) => {
        navigate(`/user/activities/publish-activities-item?publishActivitiesId=${_id}`)
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
                            <div className="user__services-adv-item-body" onClick={() => navigate("/user/activities/user-activities-special-offers")}>
                                <div
                                    className={`user__services-adv-item ${
                                        index === currentSlideFirst &&
                                        "user__services-adv-item--active"
                                    }`}
                                >
                                    <div>
                                        <h6 className="user__services-adv-item-undertitle">
                                            Offer AC Activities
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
                <h5 className="user__services-category-title">Activities</h5>
                <button
                    className="user__services-category-button"
                    onClick={() => navigate("/user/activities/user-activities-categories")}
                >
                    View all
                </button>
            </div>
            <div className="user__services-category-slick">
                <Slider {...settingsSecond}>
                    {activities.map((item) => (
                        <div
                            className="user__services-category-item-body"
                            onClick={() =>
                                navigate(
                                    `/user/activities/user-publish-activities-list?id=${item._id}`
                                )
                            }
                        >
                            <div className="user__services-category-item">
                                <div className="user__services-category-item-img">
                                    <img
                                        src={`${baseURL}/uploads/activities/${item.fileName}`}
                                        alt=""
                                    />
                                </div>

                                <div className="user__services-category-item-text">
                                    <b>{item.name}</b>{" "}
                                    <span>{item.numberView}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
            <div className="user__services-category user__services-last-title">
                <h5 className="user__services-category-title">
                    Latest Event
                </h5>
            </div>
            <div className="user__services-last">
                {publishActivities.slice(0, 2).map((item) => (
                    <div className="user__services-last-item" onClick={() => toPublishActivities(item._id)}>
                        <div className="user__services-last-item-img">
                            <div className="user__services-last-item-img-1 user__services-last-item-img-info">
                                <div className="user__services-last-item-img-text">
                                    {item.activitiesId.name}
                                </div>
                            </div>
                            <img
                                src={`${baseURL}/uploads/publish_activities/${item.filesName[0]}`}
                                alt=""
                            />
                            <div className="user__services-last-item-img-2 user__services-last-item-img-info">
                                <div className="user__services-last-item-img-text">
                                    <IconStars />
                                    <b>4.5</b>
                                    <span>{"( 808 )"}</span>
                                </div>
                            </div>
                        </div>
                        <div className="user__services-last-item-info">
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
            <button
                className="user__services-last-button user__services-last-button"
                onClick={() =>
                    navigate(`/user/activities/user-last-publish-activities`)
                }
            >
                View all
            </button>
            <div className="user__services-category user__services-last-title user__services-users-header">
                <h5 className="user__services-category-title">
                    Providers nearby
                </h5>
                <h6 className="user__services-users-subtitle">
                    Discover service providers in your <br /> area based on your
                    searches
                </h6>
            </div>
            <div className="user__services-category-slick">
                <Slider {...settingsSecond}>
                    {publishActivities
                        .filter(
                            (value, index, self) =>
                                index ===
                                self.findIndex(
                                    (obj) => obj.userId._id === value.userId._id
                                ) && value.userId._id !== _id
                        )
                        .map((item) => (
                            <div className="user__services-category-item-body">
                                <div className="user__services-users-item">
                                    <button className="user__services-users-item-close">
                                        <IconAdminClose />
                                    </button>
                                    <div
                                        className="user__services-users-item-avatar"
                                        onClick={() =>
                                            toProfileInfo({
                                                ...item?.userId,
                                            })
                                        }
                                    >
                                        <img
                                            src={`${baseURL}/uploads/avatar/${item?.userId?.avatarFileName}`}
                                            alt=""
                                        />
                                    </div>
                                    <div>
                                        <h5 className="user__services-users-item-name">
                                            {item?.userId?.fullName}{" "}
                                            <span>{  new Date()?.getFullYear() - ( new Date(item.userIdentityId?.dateBirth || new Date())?.getFullYear())}</span>
                                        </h5>
                                        <h6 className="user__services-users-item-subtitle">
                                            {item?.userIdentityId
                                                ?.profession?.[0]?.title || ""}
                                        </h6>
                                        <div className="user__services-users-item-location">
                                            <IconLocationPoint /> <b>1 km </b>
                                            from you
                                        </div>
                                    </div>
                                    <button
                                        className="user__services-users-item-message"
                                        onClick={() =>
                                            openChat(item.userId._id)
                                        }
                                    >
                                        <IconNeibs />
                                        Messege
                                    </button>
                                </div>
                            </div>
                        ))}
                </Slider>
            </div>
        </>
    )
}


