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
import ServicesFavorList from "./ServicesFavorList"

const data = [
    {
        id: "123456543345",
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
        id: "123456543345",
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
        id: "123456543345",
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

const ServicesFavor = () => {
    const [isOpenAdd, setIsOpenAdd] = useState(false)
    const [search, setSearch] = useState("")
    const [openFilter, setOpenFilter] = useState(true)

    const navigate = useNavigate()
    const changeAdd = () => {
        setIsOpenAdd((s) => !s)
        navigate("servicesadd")
    }

    const exit = () => navigate(-1)

    return (
        <>
            <AdminSubHeader onClickButton={changeAdd}>
                <div className="services__exit" onClick={exit}>
                    <button>
                        <IconLeftChevrons />
                    </button>
                    <h6>ServicesFavor</h6>
                </div>
            </AdminSubHeader>
            <InputSearch
                placeholder={"Search Subcategory Name"}
                value={search}
                onClickFilter={() => setOpenFilter(!openFilter)}
                changeValue={(s: string) => setSearch(s)}
            />
            <div>
                <ServicesFavorList />
            </div>
        </>
    )
}

export default ServicesFavor
