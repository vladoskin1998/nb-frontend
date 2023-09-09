import { ServicesInterface } from "../../../types/services"
import { Link, useNavigate } from "react-router-dom";
import { ServicesItem } from "./ServicesItem";
import { AdminSubHeader } from '../../ui/AdminSubHeader'
import { useState } from "react";
import { IconLeftChevrons } from "../../svg/IconChevrons";

const list: ServicesInterface[] = [
    {
        id: "987654321",
        name: "Sub Category",
        numberView: 100,
    },
    {
        id: "987654321",
        name: "Sub Category",
        numberView: 100,
    },
    {
        id: "987654321",
        name: "Sub Category",
        numberView: 100,
    },
    {
        id: "987654321",
        name: "Sub Category",
        numberView: 100,
    },
    {
        id: "987654321",
        name: "Sub Category",
        numberView: 100,
    },
];

const ServicesSub = () => {
    const [isOpenAdd, setIsOpenAdd] = useState(false)

    const navigate = useNavigate()
    const changeAdd = () => {
        setIsOpenAdd(s => !s)
        navigate('servicesadd')
    }

    const exit = () => navigate(-1)

    return (
        <>
            <AdminSubHeader onClickButton={changeAdd}>
                <div className="services__exit" onClick={exit}>
                    <button>
                        <IconLeftChevrons />
                    </button>
                    <h6>
                        All Services
                    </h6>
                </div>
            </AdminSubHeader>
            <div className="services__all">
                {
                    list.map((item) =>
                        <Link to={`favor?id=${item.id}`}>
                            <ServicesItem name={item.name} numberView={item.numberView} />
                        </Link>
                    )
                }
            </div>
        </>

    )
}

export default ServicesSub