import React from 'react'
import { IconPicker, IconStars } from '../../svg/IconFavor'
import { IconServicesAllPoint } from '../../svg/IconServicesAll'
import { Modal } from '../../ui/Modal'
import { IconBoxComment, IconMicrophone } from '../../svg/IconActivitiesModal'
const ActivitiesFavorModal = (
    {
        isOpen,
        setIsOpen
    }: {
        isOpen: boolean,
        setIsOpen: (o: boolean) => void
    }
) => {

    return (
        <div className={`activities__favor-modal ${isOpen ? "activities__favor-modal--open" : ""}`}>
            <Modal setIsOpen={setIsOpen}>
                <div className='activities__favor-modal-body'>
                    <div onClick={(e)=>
                        {
                            e.stopPropagation()
                            setIsOpen(false)
                        }}  className='activities__favor-modal-linebody'>
                         <button className='activities__favor-modal-line' />
                    </div>                 
                    <div className="services__favor-item-row1">
                        <img
                            // src={"item.image" || "/Images/favor.png"}
                            src={"/Images/favor.png"}
                            alt=""
                            className="services__favor-item-row1-img"
                        />
                        <div>
                            <h5 className="services__favor-item-row1-title">
                                {/* {"item.name"} */}
                                {"name"}
                            </h5>
                            <div className="services__favor-item-row1-footer">
                                <img
                                    // src={
                                    //     "item.user.image" ||
                                    //     "/Images/favor-avatar-image.png"
                                    // }
                                    src={
                                        "/Images/favor-avatar-image.png"
                                    }
                                    alt=""
                                    className="services__favor-item-row1-userimg"
                                />
                                <h5>
                                    {/* {"item.user.name"} */}
                                    {"user.name"}
                                </h5>
                                <IconStars />
                                <span>
                                    {/* {"item.user.mark"} */}
                                    {"4"}
                                </span>
                                <span>
                                    {/* {"(" + "item.user.markNumber" + ")"} */}
                                    {"300"}
                                </span>
                            </div>
                        </div>
                        <button>
                            <IconServicesAllPoint />
                        </button>
                    </div>
                    <button className='activities__favor-modal-row2'>
                   
                            <IconPicker />
                  
                        <p> Report <b>Username</b></p>
                    </button>
                    <button className='activities__favor-modal-row2'>
                  
                            <IconPicker />
                 
                        <p> Block <b>Username</b></p>
                    </button>
                    <button className='activities__favor-modal-row2 activities__favor-modal-row3'>
                   
                            <IconBoxComment />
                   
                        <p>Comment</p>
                    </button>
                    <button className='activities__favor-modal-row2 activities__favor-modal-row3'>
                
                            <IconMicrophone />
               
                        <p>Delete</p>
                    </button>
                </div>
            </Modal>
        </div>
    )
}

export default ActivitiesFavorModal