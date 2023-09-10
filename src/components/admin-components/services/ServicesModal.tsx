import React, { useState } from 'react'
import { Modal } from '../../ui/Modal'
import { IconPicker } from '../../svg/IconFavor'
import { IosTougle } from '../../ui/IosTougle'

const ServicesModal = ({ setIsOpen, name, _id }: { name: string, _id: string, setIsOpen: (o: boolean) => void }) => {

    const [isTougle, setIsTougle] = useState(true)

    const onChangeTougle = () => {
        setIsTougle(s => !s)
    }
    return (
        <div className='services__modal'>
            <Modal setIsOpen={setIsOpen}>
                <div className='services__modal-body'>
                    <div className='services__modal-title'>{name || "Category Name"}</div>
                    <div className='services__modal-body-line'>
                        <IconPicker />
                        <span>Add Service</span>
                    </div>
                    <div className='services__modal-body-line'>
                        <IconPicker />
                        <span>Edit</span>
                    </div>
                    <div className='services__modal-body-line'>
                        <IconPicker />
                        <span>Move</span>
                    </div>
                    <div className='services__modal-body-visiable'>
                        <IconPicker />
                        <span>Visible?</span>
                        <IosTougle setIsTougle={onChangeTougle} />
                    </div>
                    <div className='services__modal-body-line'>
                        <IconPicker />
                        <span>Delete</span>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default ServicesModal