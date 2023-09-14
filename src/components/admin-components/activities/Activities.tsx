import { Route, Routes } from "react-router-dom"
import { Loader } from "../../ui/Loader"
import ActivitiesEvent from "./ActivitiesEvent"
import { useAppDispatch, useAppSelector } from "../../../utils/hooks"
import ActivitiesAll from "./ActivitiesAll"
import { useEffect } from "react"
import { allActivities } from "../../../services/activities"
import ActivitiesAdd from "./ActivitiesAdd"

export const Activities = () => {
    const { isLoad } = useAppSelector((s) => s.activitiesReducer)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(allActivities())
    }, [])

    return (
        <>
            <div className="admin">
                <Routes>
                    <Route path="addactivities" element={<ActivitiesAdd />} />
                    <Route
                        path="eventactivities"
                        element={<ActivitiesEvent />}
                    />
                    <Route path="*" element={<ActivitiesAll />} />
                </Routes>
            </div>
            {isLoad && <Loader />}
        </>
    )
}
