import { useState } from "react"
import { IconLeftChevrons } from "../../svg/IconChevrons"
import { AdminSubHeader } from "../../ui/AdminSubHeader"
import { useNavigate } from "react-router-dom"
import { InputSearch } from "../../ui/InputSearch"
import { IconLocationPoint } from "../../svg/IconsLocation"
import { IconServicesAllPoint } from "../../svg/IconServicesAll"
import {
    IconStars,
    IconComment,
    IconLike,
    IconPicker,
} from "../../svg/IconFavor"

const data = [
    {
        id: "ertge44354",
        image: "",
        name: "Оказываю услуги такси в городе Киев",
        user: {
            id: "987654356765",
            name: "User Name",
            mark: "4.5",
            markNumber: "808",
            image: "",
        },
        comment: "1234",
        like: "23",
        date: new Date(),
        location: "9081 Lakewood Gardens Junktion",
    },
    {
        id: "gweg3fwev",
        image: "",
        name: "Оказываю услуги такси в городе Киев",
        user: {
            id: "ge3f3f3feewge",
            name: "User Name",
            mark: "4.5",
            markNumber: "808",
            image: "",
        },
        comment: "1234",
        like: "23",
        date: new Date(),
        location: "9081 Lakewood Gardens Junktion",
    },
    {
        id: "wegweg3gwe",
        image: "",
        name: "Оказываю услуги такси в городе Киев",
        user: {
            id: "ewgewv3grhr",
            name: "User Name",
            mark: "4.5",
            markNumber: "808",
            image: "",
        },
        comment: "1234",
        like: "23",
        date: new Date(),
        location: "9081 Lakewood Gardens Junktion",
    },
    {
        id: "errtegrt443",
        image: "",
        name: "Оказываю услуги такси в городе Киев",
        user: {
            id: "987654356765",
            name: "User Name",
            mark: "4.5",
            markNumber: "808",
            image: "",
        },
        comment: "1234",
        like: "23",
        date: new Date(),
        location: "9081 Lakewood Gardens Junktion",
    },
]

const ServicesFavorList = () => {
    return (
        <>
            {data.map((item) => {
                return (
                    <div className="services__favor-item" key={item.id}>
                        <div className="services__favor-item-row1">
                            <img
                                src={item.image || "/Images/favor.png"}
                                alt=""
                                className="services__favor-item-row1-img"
                            />
                            <div>
                                <h5 className="services__favor-item-row1-title">
                                    {item.name}
                                </h5>
                                <div className="services__favor-item-row1-footer">
                                    <img
                                        src={
                                            item.user.image ||
                                            "/Images/favor-avatar-image.png"
                                        }
                                        alt=""
                                        className="services__favor-item-row1-userimg"
                                    />
                                    <h5>{item.user.name}</h5>
                                    <IconStars />
                                    <span>{item.user.mark}</span>
                                    <span>
                                        {"(" + item.user.markNumber + ")"}
                                    </span>
                                </div>
                            </div>
                            <button>
                                <IconServicesAllPoint />
                            </button>
                        </div>
                        <div>
                            <div className="services__favor-item-row2">
                                <IconComment />
                                <span>{item.comment}</span>
                                <IconPicker />
                                <span>{item.date.toLocaleString()}</span>
                            </div>
                            <div className="services__favor-item-row2 services__favor-item-row2-2">
                                <IconLike />
                                <span>{item.like}</span>
                                <div className="services__favor-item-row2-svg">
                                    <IconLocationPoint />
                                </div>

                                <span>{item.location}</span>
                            </div>
                        </div>
                    </div>
                )
            })}
        </>
    )
}

export default ServicesFavorList
