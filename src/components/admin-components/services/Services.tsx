
import { Route, Routes } from "react-router-dom"
import ServicesAll from "./ServicesAll"
import ServicesFavor from "./ServicesFavor"
import { Loader } from "../../ui/Loader"
import { useAppSelector } from "../../../utils/hooks"
import { useEffect } from "react"
import { useAppDispatch } from "../../../utils/hooks"
import { allCategories } from "../../../services/categories"

import { ServicesAdd } from "./ServicesAdd"
import { ServicesList } from "./ServicesList"
import { SERVICES_EVENT } from "../../../types/enum"

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

                    <Route path="favor" element={<ServicesFavor />} />
                    
                    <Route path="services-add" element={<ServicesAdd />} />
                    <Route path="services-list-sub" element={<ServicesList event={SERVICES_EVENT.SUB_LIST}/>} />
                    <Route path="" element={<ServicesList event={SERVICES_EVENT.LIST}/>} />

                    {/* <Route path="" element={<ServicesAll />} /> */}
                </Routes>
            </div>
            {isLoad && <Loader />}
        </>
    )
}
