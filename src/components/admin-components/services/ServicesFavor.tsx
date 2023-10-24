import { useState } from "react"
import { IconLeftChevrons } from "../../svg/IconChevrons"
import { AdminSubHeader } from "../../ui/AdminSubHeader"
import { useNavigate, useSearchParams } from "react-router-dom"
import { InputSearch } from "../../ui/InputSearch"
import ServicesFavorList from "./ServicesFavorList"

const ServicesFavor = () => {

    const [search, setSearch] = useState("")
    const [openFilter, setOpenFilter] = useState(true)
    const [searchParams] = useSearchParams()
    
    const navigate = useNavigate()

    const changeAdd = () => {
        const categoryId = searchParams.get("categoryId")
        const subCategoryId = searchParams.get("subCategoryId")
        navigate(`/publish/service?categoryId=${categoryId}&subCategoryId=${subCategoryId}`)
    }

    const exit = () => navigate(-1)

    return (
        <>
            <AdminSubHeader onClickButton={changeAdd}>
                <div className="services__exit" onClick={exit}>
                    <button>
                        <IconLeftChevrons />
                    </button>
                    <h6>Publish Services</h6>
                </div>
            </AdminSubHeader>
            <InputSearch
                placeholder={"Search Subcategory Name"}
                value={search}
                onClickFilter={() => setOpenFilter(!openFilter)}
                changeValue={(s: string) => setSearch(s)}
            />
            <div>
                <ServicesFavorList changeAdd={changeAdd}/>
            </div>
        </>
    )
}

export default ServicesFavor
