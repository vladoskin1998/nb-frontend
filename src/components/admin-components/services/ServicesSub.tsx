import { useAppDispatch, useAppSelector } from "../../../utils/hooks"
import { useNavigate } from "react-router-dom"
import { ServicesItemModule } from "./ServicesItemModule"
import { AdminSubHeader } from "../../ui/AdminSubHeader"
import { useEffect } from "react"
import { IconLeftChevrons } from "../../svg/IconChevrons"
import { useSearchParams } from "react-router-dom"
import { allSubCategories } from "../../../services/categories"

const ServicesSub = () => {
    const navigate = useNavigate()

    const dispatch = useAppDispatch()
    const { subCategories } = useAppSelector((s) => s.categoriesReducer)
    const [searchParams] = useSearchParams()

    const changeAdd = () => {
        navigate("/admin/services/servicesadd")
    }

    useEffect(() => {
        const id = searchParams.get("id")
        dispatch(allSubCategories({ id: id as string }))
    }, [])

    // const addServices = () => {
    //     navigate(`/admin/services/servicesadd?id=${_id}`)
    // }

    return (
        <>
            <AdminSubHeader onClickButton={changeAdd}>
                <div className="services__exit" onClick={() => navigate(-1)}>
                    <button>
                        <IconLeftChevrons />
                    </button>
                    <h6>Services Sub</h6>
                </div>
            </AdminSubHeader>
            <div className="services__all">
                {subCategories?.map((item) => (
                    <ServicesItemModule
                        link={`/admin/services/favor?id=${item._id}`}
                        _id={item._id}
                        name={item.name}
                        numberView={item.numberView}
                        isVisiable={item.isVisiable}
                        key={item._id}
                        addServices={() => {}}
                    />
                ))}
            </div>
        </>
    )
}

export default ServicesSub
