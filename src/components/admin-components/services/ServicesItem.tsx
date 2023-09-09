import React from 'react'
import { IconServicesAllPlus, IconServicesAllPoint } from "../../svg/IconServicesAll"

export const ServicesItem = ({
    name,
    numberView,
}: {
    name: string,
    numberView: number,
}) => {
    return (
        <div className="services__all-item">
            <div className="services__all-item-name">
                <h6>{name}</h6>
                <button>
                    <IconServicesAllPoint />
                </button>
            </div>
            <h4 className="services__all-item-title">{numberView}</h4>
            <div className="services__all-item-buttons">
                <button>
                    <IconServicesAllPlus />
                </button>
                <button className="services__all-item-buttons-2">View All</button>
            </div>
        </div>
    )
}
