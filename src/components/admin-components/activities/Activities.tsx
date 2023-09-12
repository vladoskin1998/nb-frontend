import { Route, Routes, useNavigate } from "react-router-dom"
import { Loader } from "../../ui/Loader"
import ActivitiesEvent from "./ActivitiesEvent"
import { useAppSelector } from "../../../utils/hooks"
import ActivitiesAll from "./ActivitiesAll"
import { AdminSubHeader } from "../../ui/AdminSubHeader"

const Activities = () => {
    const { isLoad } = useAppSelector((s) => s.activitiesReducer)
    const navigate = useNavigate()

    const changeAdd = () => {
        navigate("/admin/activities/addactivities")
    }

    return (
        <>
            <div className="admin">
                <AdminSubHeader onClickButton={changeAdd}>
                    <div className="services__exit">
                        <h5>Activities</h5>
                    </div>
                </AdminSubHeader>
                <Routes>
                    <Route path="addactivities" element={<ActivitiesAll />} />
                    <Route path="allactivities" element={<ActivitiesAll />} />
                    <Route path="*" element={<ActivitiesEvent />} />
                </Routes>
            </div>
            {isLoad && <Loader />}
        </>
    )
}

export default Activities
