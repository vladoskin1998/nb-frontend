
import { Route, Routes } from "react-router-dom"
import ServicesAll from "./ServicesAll"
import ServicesSub from "./ServicesSub"
import ServicesFavor from "./ServicesFavor"
import { Loader } from "../../ui/Loader"
import { useAppSelector } from "../../../utils/hooks"
import { useEffect } from "react"
import { useAppDispatch } from "../../../utils/hooks"
import { allCategories } from "../../../services/categories"
import ServicesAddModule from "./ServicesAddModule"

export const Services = () => {
    const { isLoad } = useAppSelector((s) => s.categoriesReducer)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(allCategories())
    }, [])
    return (
        <>
            <div className="admin">
                <Routes>
                    <Route path="servicessub" element={<ServicesSub />} />
                    <Route path="favor" element={<ServicesFavor />} />
                    <Route path="servicesadd" element={<ServicesAddModule />} />
                    <Route path="" element={<ServicesAll />} />
                </Routes>
            </div>
            {isLoad && <Loader />}
        </>
    )
}
