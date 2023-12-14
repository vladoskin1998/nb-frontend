import { Modal } from "../../ui/Modal"

export const ServicesFavorListModal = ({
    isOpen,
    setIsOpen,

}: {
    isOpen: boolean
    setIsOpen: (s: boolean) => void

}) => {
   
    return (
        <div
            className={`activities__favor-modal  ${
                isOpen ? "activities__favor-modal--open" : ""
            }`}
        >
            <Modal className="" setIsOpen={(s: boolean) => setIsOpen(s)}>
                <div
                    onClick={(e) => {
                        e.stopPropagation()
                        setIsOpen(false)
                    }}
                    className="activities__favor-modal-linebody"
                >
                    <button className="activities__favor-modal-line" />
                </div>
                <div className="publish__modaladd">
                    
                </div>
            </Modal>
        </div>
    )
}
