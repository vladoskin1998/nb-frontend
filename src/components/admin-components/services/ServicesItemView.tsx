import { Modal } from "../../ui/Modal"
import { IconPicker } from "../../svg/IconFavor"
import { IosTougle } from "../../ui/IosTougle"
import { Link } from "react-router-dom"
import {
    IconServicesAllPlus,
    IconServicesAllPoint,
} from "../../svg/IconServicesAll"


const ServicesItemView = ({
    name,
    link,
    numberView,
    setIsOpen
}: {
    name: string
    link: string
    numberView: number
    setIsOpen: (b: boolean) => void

}) => {

    const changeOpen = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setIsOpen(true)
    }

    return (
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
    )
}

export default ServicesItemView
