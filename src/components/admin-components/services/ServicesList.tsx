import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { AdminSubHeader } from "../../ui/AdminSubHeader"
import { useAppDispatch, useAppSelector } from "../../../utils/hooks"
import { SERVICES_EVENT } from "../../../types/enum"
import { useEffect, useState } from "react"
import { allSubCategories } from "../../../services/categories"
import { ServicesListCategorieItemModule } from "./ServicesListCategorieItemModule"
import { CategoriesItemInterface, SubCategoriesItemInterface } from "../../../reducer/categories"
import { ServicesListSubCategorieItemModule } from "./ServicesListSubCategorieItemModule"

export const ServicesList = ({ event }: { event: SERVICES_EVENT }) => {
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { categories, subCategories } = useAppSelector(
        (s) => s.categoriesReducer
    )
    const [searchParams] = useSearchParams()

    const [categorieId, setCategorieId] = useState("")

    useEffect(() => {
        if (event === SERVICES_EVENT.SUB_LIST) {
            const id = searchParams.get("id")
            setCategorieId(id as string)
            dispatch(allSubCategories({ id: id as string }))
        }
    }, [event])

    const handlerAddServices = () => {
        navigate("/admin/services/services-add", {
            state: {
                event:
                    event === SERVICES_EVENT.SUB_LIST
                        ? SERVICES_EVENT.EDIT_SUB_SERVICES
                        : SERVICES_EVENT.ADD_SERVICES,
                categorieId:
                    event === SERVICES_EVENT.SUB_LIST ? categorieId : "",
            },
        })
    }

    return (
        <>
            <AdminSubHeader onClickButton={handlerAddServices}>
                <div className="services__exit">
                    <h5>
                        {location.pathname ===
                        "/admin/services/services-list-sub"
                            ? "Sub Services"
                            : "All Services"}
                    </h5>
                </div>
            </AdminSubHeader>
            <div className="services__all">
                {event === SERVICES_EVENT.LIST
                    ? categories.map((item: CategoriesItemInterface) => (
                          <ServicesListCategorieItemModule
                              categorieId={item._id}
                              _id={item._id}
                              nextListLink={
                                  `/admin/services/services-list-sub?id=${item._id}&categoryId=${item?.categoryId || ""}`
                              }
                              name={item.name}
                              numberView={item.numberView}
                              isVisiable={item.isVisiable}
                              key={item._id}
                              handlerAddServices={handlerAddServices}
                          />
                      ))
                    : subCategories.map((item: SubCategoriesItemInterface) => (
                          <ServicesListSubCategorieItemModule
                              categorieId={categorieId}
                              _id={item._id}
                              nextListLink={
                                  `/admin/services/favor?id=${item._id}&categoryId=${item?.categoryId || ""}&subCategoryId=${item?.subCategoryId || ""}`
                              }
                              name={item.name}
                              numberView={item.numberView}
                              isVisiable={item.isVisiable}
                              key={item._id}
                              handlerAddServices={handlerAddServices}
                          />
                      ))}
            </div>
        </>
    )
}
