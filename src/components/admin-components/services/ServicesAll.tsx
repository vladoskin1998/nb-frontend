import { IconServicesAllPlus, IconServicesAllPoint } from "../../svg/IconServicesAll"
import { ServicesInterface } from "../../../types/services"
import { Link, useNavigate } from "react-router-dom";
import { ServicesItem } from "./ServicesItem";
import { AdminSubHeader } from '../../ui/AdminSubHeader'
import { useEffect, useState } from "react";
import { IconBottomChevrons } from "../../svg/IconChevrons"
import $api from "../../../http";
import { AxiosResponse } from "axios";

interface CategoriesResponseInterface {
    _id: string,
    name: string,
    numberView: number
}

const ServicesAll = () => {
    const [isOpenAdd, setIsOpenAdd] = useState(false)
    const [categories, setCategories] = useState<CategoriesResponseInterface[]>([])

    const navigate = useNavigate()
    const changeAdd = () => {
        setIsOpenAdd(s => !s)
        navigate('/admin/services/servicesadd')
    }

    const getAllCategories = () => {
        $api.get('categories/all-categories')
            .then((r: AxiosResponse<CategoriesResponseInterface[]>) => {
                setCategories(r.data)
            })
            .catch(e => alert(e))
    }

    useEffect(() => {
        getAllCategories()
    }, [])


    return (
        <>
            <AdminSubHeader onClickButton={changeAdd}>
                <div className="services__exit">
                    <h5>
                        All Services
                    </h5>
                    <button>
                        <IconBottomChevrons />
                    </button>
                </div>
            </AdminSubHeader>
            <div className="services__all">
                {
                    categories.map((item) =>
                        <ServicesItem link={`/admin/services/servicessub?id=${item._id}`}
                            _id={item._id}
                            name={item.name}
                            numberView={item.numberView}
                        />
                    )
                }
            </div>
        </>
    )
}

export default ServicesAll

