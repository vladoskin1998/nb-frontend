import { useState } from "react"
import { AdminSubHeader } from "../../ui/AdminSubHeader"
import { useNavigate } from "react-router-dom"
import { InputSearch } from "../../ui/InputSearch"

const ActivitiesEvent = () => {
    const navigate = useNavigate()
    const [search, setSearch] = useState("")

    const onClickFilter = () => {}

    return (
        <>
            <InputSearch
                placeholder={"Search Events"}
                onClickFilter={onClickFilter}
                value={search}
                changeValue={setSearch}
            />
        </>
    )
}

export default ActivitiesEvent
