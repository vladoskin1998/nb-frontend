import { useEffect, useState } from "react"
import { useAppSelector } from "../../../utils/hooks"
import { Modal } from "../../ui/Modal"
import { IconAdminClose } from "../../svg/IconAdminHeader"
import { useNavigate } from "react-router"

export const ProfileInfoModalProfile = () => {
    const { isGotAllProfileInfo } = useAppSelector((s) => s.profileReducer)
    const [isOpen, setIsOpen] = useState(true)
    const navigate = useNavigate()
    const { lastStepChangeProfile } = useAppSelector((s) => s.profileReducer)

    useEffect(() => {
        setTimeout(() => {
            setIsOpen(false)
        }, 5000)
    }, [])

    return (
        <>
            {!isGotAllProfileInfo && isOpen && (
                <div className="profileinfo__profilemodal">
                    <Modal setIsOpen={setIsOpen}>
                        <div className="profileinfo__profilemodal-body">
                            <div
                                onClick={() => navigate(lastStepChangeProfile)}
                            >
                                Complete your profile
                            </div>
                            <button
                                onClick={() => {
                                    setIsOpen(false)
                                }}
                            >
                                <IconAdminClose />
                            </button>
                        </div>
                    </Modal>
                </div>
            )}
        </>
    )
}
