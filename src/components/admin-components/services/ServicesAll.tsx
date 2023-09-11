import { useNavigate } from "react-router-dom"
import { ServicesItem } from "./ServicesItem"
import { AdminSubHeader } from "../../ui/AdminSubHeader"
import { useEffect, useState } from "react"
import { IconBottomChevrons } from "../../svg/IconChevrons"
import { useAppDispatch, useAppSelector } from "../../../utils/hooks"
import { allCategories } from "../../../services/categories"

interface CategoriesResponseInterface {
    _id: string
    name: string
    numberView: number
}

const ServicesAll = () => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { categories } = useAppSelector((s) => s.categoriesReducer)

    const [isOpenAdd, setIsOpenAdd] = useState(false)
 
    const changeAdd = () => {
        setIsOpenAdd((s) => !s)
        navigate("/admin/services/servicesadd")
    }

    useEffect(() => {
        dispatch(allCategories())
    }, [])

    return (
        <>
            <AdminSubHeader onClickButton={changeAdd}>
                <div className="services__exit">
                    <h5>All Services</h5>
                    <button>
                        <IconBottomChevrons />
                    </button>
                </div>
            </AdminSubHeader>
            <div className="services__all">
                {categories.map((item) => (
                    <ServicesItem
                        link={`/admin/services/servicessub?id=${item._id}`}
                        _id={item._id}
                        name={item.name}
                        numberView={item.numberView}
                        isVisiable={item.isVisiable}
                        key={item._id}
                    />
                ))}
            </div>
        </>
    )
}

export default ServicesAll
