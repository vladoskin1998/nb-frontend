import { Modal } from "../../ui/Modal"
import { IconPicker } from "../../svg/IconFavor"
import { IosTougle } from "../../ui/IosTougle"
import { Link } from "react-router-dom"
import {
    IconServicesAllPlus,
    IconServicesAllPoint,
} from "../../svg/IconServicesAll"

const ServicesItem = ({
    name,
    isOpen,
    link,
    numberView,
    isTougle,
    addServices,
    setIsOpen,
    onChangeTougle,
    handlerDeleteItem,
}: {
    name: string
    isOpen: boolean
    link: string
    numberView: number
    isTougle: boolean
    addServices: () => void
    setIsOpen: (o: boolean) => void
    onChangeTougle: () => void
    handlerDeleteItem: () => void
}) => {

    const changeOpen = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setIsOpen(true)
    }

    return (
        <>
            <div className="services__all-item">
                <div className="services__all-item-name">
                    <h6>{name}</h6>
                    <button onClick={(e) => changeOpen(e)}>
                        <IconServicesAllPoint />
                    </button>
                </div>
                <Link to={link}>
                    <h4 className="services__all-item-title">{numberView}</h4>
                </Link>
                <Link to={link}>
                    <div className="services__all-item-buttons">
                        <button>
                            <IconServicesAllPlus />
                        </button>
                        <button className="services__all-item-buttons-2">
                            View All
                        </button>
                    </div>
                </Link>
            </div>
            {isOpen && (
                <div className="services__modal">
                    <Modal setIsOpen={setIsOpen}>
                        <div className="services__modal-body">
                            <div className="services__modal-title">
                                {name || "Category Name"}
                            </div>
                            <div
                                className="services__modal-body-line"
                                onClick={addServices}
                            >
                                <IconPicker />
                                <span>Add Sub Categories</span>
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
            )}
        </>
    )
}

export default ServicesItem
