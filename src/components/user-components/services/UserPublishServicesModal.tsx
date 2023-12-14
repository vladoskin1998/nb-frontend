import { ReactNode } from "react"
import { PRIVACY } from "../../../types/enum"
import { Modal } from "../../ui/Modal"
import { IconPicker } from "../../svg/IconFavor"



export const UserPublishServicesModal = ({
    isOpen,
    setIsOpen,
    categorieName,
    applyMethod = () => {},
}: {
    isOpen: boolean
    setIsOpen: (s: boolean) => void
    categorieName: string
    applyMethod?: () => void
}) => {
    return (
        <>
            <div
                className={`activities__favor-modal  ${
                    isOpen ? "activities__favor-modal--open" : ""
                }`}
            >
                <Modal className="" setIsOpen={(s: boolean) => setIsOpen(s)}>
                   
                    <div className="publish__modaladd">
                        <div className="publish__modaladd-body publish__privacy-body ">
                            <div className="user__category-publish-modal-item">
                                <div>
                                    <IconPicker />
                                </div>
                                <h5>Category</h5>
                                <h6>{categorieName}</h6>
                            </div>

                            <div className="user__category-publish-modal-item">
                                <div>
                                    <IconPicker />
                                </div>
                                <h5>Rating</h5>
                                <h6>4.5</h6>
                            </div>

                            <div className="user__category-publish-modal-item">
                                <div>
                                    <IconPicker />
                                </div>
                                <h5>How far?</h5>
                                <h6>1 km</h6>
                            </div>

                            <div className="user__category-publish-modal-item">
                                <div>
                                    <IconPicker />
                                </div>
                                <h5>Last time online</h5>
                                <h6>Today</h6>
                            </div>

                            <button
                                className="publish__privacy-apply"
                                onClick={() => {
                                    applyMethod()
                                    setIsOpen(false)
                                }}
                            >
                                Apply
                            </button>
                        </div>
                    </div>
                </Modal>
            </div>
        </>
    )
}
