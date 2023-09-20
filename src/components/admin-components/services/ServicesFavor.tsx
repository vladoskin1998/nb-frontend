import { useState } from "react"
import { IconLeftChevrons } from "../../svg/IconChevrons"
import { AdminSubHeader } from "../../ui/AdminSubHeader"
import { useNavigate } from "react-router-dom"
import { InputSearch } from "../../ui/InputSearch"
import ServicesFavorList from "./ServicesFavorList"

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
