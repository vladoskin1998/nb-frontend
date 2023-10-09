import { useState } from "react"
import ServicesItemView from "./ServicesItemView"
import { useLocation, useNavigate } from "react-router-dom"
import { useAppDispatch } from "../../../utils/hooks"
import {
    deleteCategories,
    deleteSubCategories,
    visiableCategories,
    visiableSubCategories,
} from "../../../services/categories"
import ServicesItemViewModal from "./ServicesItemViewModal"
import { SERVICES_EVENT } from "../../../types/enum"
import {ServicesListItemViewModal} from "./ServicesListItemViewModal"

export const ServicesListItemModule = ({
    _id,
    name,
    numberView,
    link,
    isVisiable,
    categorieId,
    handlerAddServices
}: {
    _id: string
    name: string
    numberView: number
    link: string
    isVisiable: boolean
    categorieId: string
    handlerAddServices: () => void

}) => {
    const location = useLocation()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    
    const [isOpen, setIsOpen] = useState(false)
    const [isTougle, setIsTougle] = useState(isVisiable)

    const onChangeTougle = () => {
        setIsTougle((s) => !s)
    }

    const handlerEditServices = () => {
        navigate("/admin/services/services-add", {
            state: {
                event: SERVICES_EVENT.EDIT_SERVICES,
                categorieId: categorieId,
            },
        })
    }

    const handlerMoveServices = () => {
        navigate("/admin/services/services-add", {
            state: {
                event: SERVICES_EVENT.EDIT_SUB_SERVICES,
                categorieId: categorieId,
            },
        })
    }

    const handlerVisiable = () => {
        dispatch(
            location.pathname.includes("services-list-sub")
                ? visiableSubCategories({ id: _id, isVisiable: isTougle })
                : visiableCategories({ id: _id, isVisiable: isTougle })
        )
    }

    const handlerDeleteItem = () => {
        dispatch(
            location.pathname.includes("services-list-sub")
                ? deleteSubCategories({ id: _id })
                : deleteCategories({ id: _id })
        )
        setIsOpen(false)
    }

    return (
        <>
            <ServicesItemView
                numberView={numberView}
                name={name}
                link={link}
                setIsOpen={(b: boolean) => setIsOpen(b)}
            />
            {
                isOpen &&
                <ServicesListItemViewModal
                    name={name}
                    isTougle={isTougle}
                    onChangeTougle={onChangeTougle}
                    setIsOpen={(b: boolean) => setIsOpen(b)}

                    handlerAddServices={handlerAddServices}
                    handlerEditServices={handlerEditServices}
                    handlerMoveServices={handlerMoveServices}
                    handlerVisiable={handlerVisiable}
                    handlerDeleteItem={handlerDeleteItem}
                />
            }
        </>
    )
}
