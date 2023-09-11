import React, { useEffect, useState } from "react"
import { Modal } from "../../ui/Modal"
import { IconPicker } from "../../svg/IconFavor"
import { IosTougle } from "../../ui/IosTougle"
import { useAppDispatch } from "../../../utils/hooks"
import { useLocation, useNavigate } from "react-router-dom"
import {
    deleteCategories,
    deleteSubCategories,
    visiableCategories,
    visiableSubCategories,
} from "../../../services/categories"

const ServicesModal = ({
    setIsOpen,
    name,
    _id,
    isVisiable,
}: {
    name: string
    _id: string
    setIsOpen: (o: boolean) => void
    isVisiable: boolean
}) => {
    const dispatch = useAppDispatch()
    const [isTougle, setIsTougle] = useState(isVisiable)
    const location = useLocation()
    const navigate= useNavigate()

    const onChangeTougle = () => {
        setIsTougle((s) => !s)
    }

    useEffect(() => {
        handlerVisiable()
    }, [isTougle])

    const addServices = () => {
        navigate(`/admin/services/servicesadd?id=${_id}`)
    }

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
        <div className="services__modal">
            <Modal setIsOpen={setIsOpen}>
                <div className="services__modal-body">
                    <div className="services__modal-title">
                        {name || "Category Name"}
                    </div>
                    <div className="services__modal-body-line" onClick={addServices}>
                        <IconPicker />
                        <span>Add Service</span>
                    </div>
                    <div className="services__modal-body-line">
                        <IconPicker />
                        <span>Edit</span>
                    </div>
                    <div className="services__modal-body-line">
                        <IconPicker />
                        <span>Move</span>
                    </div>
                    <div className="services__modal-body-visiable">
                        <IconPicker />
                        <span>Visible?</span>
                        <IosTougle
                            isTougle={isTougle}
                            setIsTougle={onChangeTougle}
                        />
                    </div>
                    <div
                        className="services__modal-body-line"
                        onClick={handlerDeleteItem}
                    >
                        <IconPicker />
                        <span>Delete</span>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default ServicesModal
