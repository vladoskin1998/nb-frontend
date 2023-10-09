import { Modal } from "../../ui/Modal"
import { IconPicker } from "../../svg/IconFavor"
import { IosTougle } from "../../ui/IosTougle"
import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { SERVICES_EVENT } from "../../../types/enum"

const ServicesItemViewModal = ({
    name,
    isTougle,
    addItems,
    setIsOpen,
    onChangeTougle,
    handlerDeleteItem,
    handlerVisiable,
}: {
    name: string
    isTougle: boolean
    addItems: () => void
    setIsOpen: (o: boolean) => void
    onChangeTougle: () => void
    handlerDeleteItem: () => void
    handlerVisiable: () => void
}) => {
    const navigate = useNavigate()

    useEffect(() => {
        return () => handlerVisiable()
    }, [])

    const addServices = () => {
        navigate("/admin/services/services-add")
    }

    const editServices = () => {
        navigate("/admin/services/services-add", {
            state: {
                event: SERVICES_EVENT.EDIT_SERVICES,
                categorieId: "",
            },
        })
    }

    const moveServices = () => {
        navigate("/admin/services/services-add", {
            state: {
                event: SERVICES_EVENT.EDIT_SUB_SERVICES,
                categorieId: "",
            },
        })
    }

    return (
        <div className="services__modal">
            <Modal setIsOpen={setIsOpen}>
                <div className="services__modal-body">
                    <div className="services__modal-title">
                        {name || "Category Name"}
                    </div>
                    <div
                        onClick={addServices}
                        className="services__modal-body-line"
                    >
                        <IconPicker />
                        <span>Add</span>
                    </div>
                    <div
                        className="services__modal-body-line"
                        onClick={editServices}
                    >
                        <IconPicker />
                        <span>Edit</span>
                    </div>
                    <div
                        className="services__modal-body-line"
                        onClick={addItems}
                    >
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

export default ServicesItemViewModal
