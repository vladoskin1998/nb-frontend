import { useAppDispatch, useAppSelector } from "../../../utils/hooks"
import {  useNavigate } from "react-router-dom";
import { ServicesItem } from "./ServicesItem";
import { AdminSubHeader } from '../../ui/AdminSubHeader'
import { useEffect, useState } from "react";
import { IconLeftChevrons } from "../../svg/IconChevrons";
import { useSearchParams } from 'react-router-dom';
import { allSubCategories } from "../../../services/categories";

interface CategoriesResponseInterface {
    _id: string,
    name: string,
    numberView: number
}


const ServicesSub = () => {
    const navigate = useNavigate()

    
    const [isOpenAdd, setIsOpenAdd] = useState(false)
    const dispatch = useAppDispatch()
    const { subCategories } = useAppSelector((s) => s.categoriesReducer)
       const [searchParams] = useSearchParams();

    const changeAdd = () => {
        setIsOpenAdd(s => !s)
        navigate('/admin/services/servicesadd')
    }

    const exit = () => navigate(-1)

    useEffect(() => {
        const id = searchParams.get('id');
        dispatch(
            allSubCategories({id: id as string})
        )
    }, [])


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
                            isVisiable={item.isVisiable}
                            key={item._id}
                        />
                    )
                }
            </div>
        </>

    )
}

export default ServicesSub