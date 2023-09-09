import { IconServicesAllPlus, IconServicesAllPoint } from "../../svg/IconServicesAll"
import { ServicesInterface } from "../../../types/services"
import { Link, useNavigate } from "react-router-dom";
import { ServicesItem } from "./ServicesItem";
import { AdminSubHeader } from '../../ui/AdminSubHeader'
import { useState } from "react";
import { IconBottomChevrons } from "../../svg/IconChevrons"

const list: ServicesInterface[] = [
    {
        id: "123456789",
        name: "Category",
        numberView: 100,
    },
    {
        id: "123456789",
        name: "Category",
        numberView: 100,
    },
    {
        id: "123456789",
        name: "Category",
        numberView: 100,
    },
    {
        id: "123456789",
        name: "Category",
        numberView: 100,
    },
    {
        id: "123456789",
        name: "Category",
        numberView: 100,
    },
];
const ServicesAll = () => {
    const [isOpenAdd, setIsOpenAdd] = useState(false)

    const navigate = useNavigate()
    const changeAdd = () => {
        setIsOpenAdd(s => !s)
        navigate('servicesadd')
    }



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
                    list.map((item) =>
                        <Link to={`servicessub?id=${item.id}`}>
                            <ServicesItem name={item.name} numberView={item.numberView} />
                        </Link>
                    )
                }
            </div>
        </>

    )
}

export default ServicesAll