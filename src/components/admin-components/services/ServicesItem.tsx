import React, { useState } from 'react'
import { IconServicesAllPlus, IconServicesAllPoint } from "../../svg/IconServicesAll"
import ServicesModal from './ServicesModal'
import { Link, useNavigate } from 'react-router-dom'

export const ServicesItem = ({
    _id,
    name,
    numberView,
    link,
}: {
    _id: string,
    name: string,
    numberView: number,
    link: string,
}) => {

    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate()

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
                </Link >
                <Link to={link}>
                    <div className="services__all-item-buttons">
                        <button>
                            <IconServicesAllPlus />
                        </button>
                        <button className="services__all-item-buttons-2">View All</button>
                    </div>
                </Link >
            </div>
            {isOpen
                ? <ServicesModal
                    _id={_id}
                    name={name}
                    setIsOpen={setIsOpen} />
                : false}
        </>

    )
}
