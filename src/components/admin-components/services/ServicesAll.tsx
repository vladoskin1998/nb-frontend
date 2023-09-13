import { useNavigate } from "react-router-dom"
import { ServicesItemModule } from "./ServicesItemModule"
import { AdminSubHeader } from "../../ui/AdminSubHeader"
import {useAppSelector } from "../../../utils/hooks"

const ServicesAll = () => {
    const navigate = useNavigate()

    const { categories } = useAppSelector((s) => s.categoriesReducer)

    const changeAdd = () => {
        navigate("/admin/services/servicesadd")
    }

    const addServices = (_id: string) => {
        navigate(`/admin/services/servicesadd?id=${_id}`)
    }

    return (
        <>
            <AdminSubHeader onClickButton={changeAdd}>
                <div className="services__exit">
                    <h5>All Services</h5>
                </div>
            </AdminSubHeader>
            <div className="services__all">
                {categories.map((item) => (
                    <ServicesItemModule
                        link={`/admin/services/servicessub?id=${item._id}`}
                        _id={item._id}
                        name={item.name}
                        numberView={item.numberView}
                        isVisiable={item.isVisiable}
                        key={item._id}
                        addServices={() => addServices(item._id)}
                    />
                ))}
            </div>
        </>
    )
}

export default ServicesAll
