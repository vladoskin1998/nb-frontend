import { useState } from "react"
import ServicesItemView from "./ServicesItemView"
import { useLocation, useNavigate } from "react-router-dom"
import { useAppDispatch } from "../../../utils/hooks"
import {
    deleteCategories,
    visiableCategories,
} from "../../../services/categories"
import { SERVICES_EVENT } from "../../../types/enum"
import { ServicesListItemViewModal } from "./ServicesListItemViewModal"

export const ServicesListCategorieItemModule = ({
    _id,
    name,
    numberView,
    nextListLink,
    isVisiable,
    categorieId,
    handlerAddServices,
}: {
    _id: string
    name: string
    numberView: number
    nextListLink: string
    isVisiable: boolean
    categorieId: string
    handlerAddServices: () => void
}) => {
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

    const handlerVisiable = () => {
        dispatch(visiableCategories({ id: _id, isVisiable: isTougle }))
    }

    const handlerDeleteItem = () => {
        dispatch(deleteCategories({ id: _id }))
        setIsOpen(false)
    }

    return (
        <>
            <ServicesItemView
                numberView={numberView}
                name={name}
                nextListLink={nextListLink}
                setIsOpen={(b: boolean) => setIsOpen(b)}
            />
            {isOpen && (
                <ServicesListItemViewModal
                    name={name}
                    isTougle={isTougle}
                    onChangeTougle={onChangeTougle}
                    setIsOpen={(b: boolean) => setIsOpen(b)}
                    handlerAddServices={handlerAddServices}
                    handlerEditServices={handlerEditServices}
                    handlerVisiable={handlerVisiable}
                    handlerDeleteItem={handlerDeleteItem}
                    handlerMoveServices={null}
                />
            )}
        </>
    )
}
