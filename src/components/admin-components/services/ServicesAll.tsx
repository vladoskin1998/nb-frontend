import { useNavigate } from "react-router-dom"
import { ServicesItemHoc } from "./ServicesItemHoc"
import { AdminSubHeader } from "../../ui/AdminSubHeader"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../../utils/hooks"
import { allCategories } from "../../../services/categories"

const ServicesAll = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { categories } = useAppSelector((s) => s.categoriesReducer)

    const changeAdd = () => {
        navigate("/admin/services/servicesadd")
    }

    useEffect(() => {
        dispatch(allCategories())
    }, [])

    const addServices = (_id:string) => {
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
                    <ServicesItemHoc
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
