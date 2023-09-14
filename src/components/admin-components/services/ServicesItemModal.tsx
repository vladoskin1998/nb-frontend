import { Modal } from "../../ui/Modal"
import { IconPicker } from "../../svg/IconFavor"
import { IosTougle } from "../../ui/IosTougle"
import { useEffect } from "react"

const ServicesItemModal = ({
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

    useEffect(() => {
        return () => handlerVisiable()
    }, [])

    return (

        <div className="services__modal">
            <Modal setIsOpen={setIsOpen}>
                <div className="services__modal-body">
                    <div className="services__modal-title">
                        {name || "Category Name"}
                    </div>
                    <div
                        className="services__modal-body-line"
                        onClick={addItems}
                    >
                        <IconPicker />
                        <span>Add</span>
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

export default ServicesItemModal
