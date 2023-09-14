import { useEffect, useState } from "react"
import { AdminSubHeader } from "../../ui/AdminSubHeader"
import { useNavigate, useSearchParams } from "react-router-dom"
import { InputSearch } from "../../ui/InputSearch"
import { SlickCategories } from "../../ui/SlickCategories"
import { useAppSelector } from "../../../utils/hooks"
import { ActivitiesFavorList } from "./ActivitiesFavor"

const ActivitiesEvent = () => {
    const navigate = useNavigate()
    const [search, setSearch] = useState("")
    const { activities } = useAppSelector((s) => s.activitiesReducer)
    const [currentSlide, setCurrentSlide] = useState(0)
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const id = searchParams.get("id")
        const slide = activities.findIndex(item => item._id === id)
        setCurrentSlide(slide !== -1 ? slide + 1 : 0)
    }, [currentSlide])

    const onClickFilterSlick = ({index,id}:{index: number, id:string}) => {
        setCurrentSlide(index)
        navigate(`?id=${id}`)
    }
    const changeAdd = () => {
        navigate("/admin/activities/addactivities")
    }

    const onClickFilter = () => {}

    return (
        <>
            <AdminSubHeader onClickButton={changeAdd}>
                <div className="services__exit">
                    <h5>Activities</h5>
                </div>
            </AdminSubHeader>
            <InputSearch
                placeholder={"Search Events"}
                onClickFilter={onClickFilter}
                value={search}
                changeValue={setSearch}
            />
            <div className="activities__filter">
                <SlickCategories>
                    {[{ name: "All", _id:"" }, ...activities].map((item, index) => (
                        <div
                            className={`activities__filter-item ${
                                index === currentSlide &&
                                "activities__filter-item--active"
                            }`}
                            key={index}
                            onClick={() => onClickFilterSlick({index, id: item._id})}
                        >
                            {item.name}
                        </div>
                    ))}
                </SlickCategories>
            </div>
            <ActivitiesFavorList/>
        </>
    )
}

export default ActivitiesEvent
