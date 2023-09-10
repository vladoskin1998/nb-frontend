import { ServicesInterface } from "../../../types/services"
import { Link, useNavigate } from "react-router-dom";
import { ServicesItem } from "./ServicesItem";
import { AdminSubHeader } from '../../ui/AdminSubHeader'
import { useEffect, useState } from "react";
import { IconLeftChevrons } from "../../svg/IconChevrons";
import $api from "../../../http";
import { AxiosResponse } from "axios";
import { useSearchParams } from 'react-router-dom';

interface CategoriesResponseInterface {
    _id: string,
    name: string,
    numberView: number
}


const ServicesSub = () => {
    const [isOpenAdd, setIsOpenAdd] = useState(false)
    const [subCategories, setSubCategories] = useState<CategoriesResponseInterface[]>([])

    const navigate = useNavigate()
    const changeAdd = () => {
        setIsOpenAdd(s => !s)
        navigate('/admin/services/servicesadd')
    }

    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');

    const exit = () => navigate(-1)

    const getSubCategories = () => {
        $api.get(`categories/sub-categories?id=${id}`)
            .then((r: AxiosResponse<CategoriesResponseInterface[]>) => {
                setSubCategories(r.data)
            })
            .catch(e => alert(e))
    }

    useEffect(() => {
        getSubCategories()
    }, [])

    console.log(id);


    return (
        <>
            <AdminSubHeader onClickButton={changeAdd}>
                <div className="services__exit" onClick={exit}>
                    <button >
                        <IconLeftChevrons />
                    </button>
                    <h6 >
                        ServicesSub
                    </h6>
                </div>
            </AdminSubHeader>
            <div className="services__all">
                {
                    subCategories?.map((item) =>
                        <ServicesItem link={`/admin/services/favor?id=${item._id}`}
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

export default ServicesSub