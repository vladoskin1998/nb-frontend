import { Route, Routes, useNavigate } from "react-router-dom"
import { Loader } from "../../ui/Loader"
import ActivitiesEvent from "./ActivitiesEvent"
import { useAppDispatch, useAppSelector } from "../../../utils/hooks"
import ActivitiesAll from "./ActivitiesAll"
import { AdminSubHeader } from "../../ui/AdminSubHeader"
import { useEffect } from "react"
import { allActivities } from "../../../services/activities"
import ActivitiesAdd from "./ActivitiesAdd"

const Activities = () => {
    const { isLoad } = useAppSelector((s) => s.activitiesReducer)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const changeAdd = () => {
        navigate("/admin/activities/addactivities")
    }

    useEffect(() => {
        dispatch(
            allActivities()
        )
    }, [])

    return (
        <>
            <div className="admin">
                <AdminSubHeader onClickButton={changeAdd}>
                    <div className="services__exit">
                        <h5>Activities</h5>
                    </div>
                </AdminSubHeader>
                <Routes>
                    <Route path="addactivities" element={<ActivitiesAdd />} />
                    <Route path="eventactivities" element={<ActivitiesEvent />} />
                    <Route path="*" element={<ActivitiesAll />} />
                </Routes>
            </div>
            {isLoad && <Loader />}
        </>
    )
}

export default Activities
