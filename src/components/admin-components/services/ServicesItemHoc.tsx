import { useEffect, useState } from "react"
import ServicesItem from "./ServicesItem"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAppDispatch } from "../../../utils/hooks"
import {
    deleteCategories,
    deleteSubCategories,
    visiableCategories,
    visiableSubCategories,
} from "../../../services/categories"

export const ServicesItemHoc = ({
    _id,
    name,
    numberView,
    link,
    isVisiable,
    addServices
}: {
    _id: string
    name: string
    numberView: number
    link: string
    isVisiable: boolean
    addServices: () => void
}) => {
    const [isOpen, setIsOpen] = useState(false)

    const dispatch = useAppDispatch()
    const [isTougle, setIsTougle] = useState(isVisiable)
    const location = useLocation()

    const onChangeTougle = () => {
        setIsTougle((s) => !s)
    }

    useEffect(() => {
        handlerVisiable()
    }, [isTougle])



    const handlerVisiable = () => {
        dispatch(
            location.pathname.includes("servicessub")
                ? visiableSubCategories({ id: _id, isVisiable: isTougle })
                : visiableCategories({ id: _id, isVisiable: isTougle })
        )
    }

    const handlerDeleteItem = () => {
        dispatch(
            location.pathname.includes("servicessub")
                ? deleteSubCategories({ id: _id })
                : deleteCategories({ id: _id })
        )
        setIsOpen(false)
    }

    return (
        <ServicesItem
            numberView={numberView}
            isTougle={isTougle}
            name={name}
            link={link}
            isOpen={isOpen}
            addServices={addServices}
            handlerDeleteItem={handlerDeleteItem}
            onChangeTougle={onChangeTougle}
            setIsOpen={(b: boolean) => setIsOpen(b)}
        />
    )
}
