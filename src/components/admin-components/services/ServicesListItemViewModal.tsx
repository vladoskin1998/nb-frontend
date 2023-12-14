import { Modal } from "../../ui/Modal"
import { IconPicker } from "../../svg/IconFavor"
import { IosTougle } from "../../ui/IosTougle"
import { ReactNode, useEffect } from "react"

export const ServicesListItemViewModal = ({
    name,
    isTougle,
    setIsOpen,
    onChangeTougle,
    handlerAddServices,
    handlerEditServices,
    handlerMoveServices,
    handlerDeleteItem,
    handlerVisiable,
    children,
}: {
    name: string
    isTougle: boolean
    setIsOpen: (o: boolean) => void
    onChangeTougle: () => void
    handlerAddServices: () => void
    handlerEditServices: () => void
    handlerMoveServices: (() => void) | null
    handlerDeleteItem: () => void
    handlerVisiable: () => void
    children?: ReactNode
}) => {
    useEffect(() => {
        return () => handlerVisiable()
    }, [])

    return (
        <div className="services__modal">
            <Modal className="" setIsOpen={setIsOpen}>
                <div className="services__modal-body">
                    <div className="services__modal-title">
                        {name || "Category Name"}
                    </div>
                    <div
                        onClick={handlerAddServices}
                        className="services__modal-body-line"
                    >
                        <IconPicker />
                        <span>Add</span>
                    </div>
                    <div
                        className="services__modal-body-line"
                        onClick={handlerEditServices}
                    >
                        <IconPicker />
                        <span>Edit</span>
                    </div>
                    {handlerMoveServices ? (
                        <>
                            <div
                                className="services__modal-body-line"
                                onClick={handlerMoveServices}
                            >
                                <IconPicker />
                                <span>Move</span>
                            </div>
                            {children}
                        </>
                    ) : (
                        <></>
                    )}
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
