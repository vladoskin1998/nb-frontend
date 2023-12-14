import { useRef, useState } from "react"
import { Modal } from "../../ui/Modal"
import { PHOTO_ADD_METHOD } from "../../../types/enum"

export const PublishModalAddFile = ({
    isOpen,
    setIsOpen,
    getFile,
}: {
    isOpen: boolean
    setIsOpen: (s: boolean) => void
    getFile: (f: File) => void
}) => {
    const [active, setActive] = useState<PHOTO_ADD_METHOD | null>(null)

    let fileCameraRollRef = useRef<HTMLInputElement | null>(null)
    let fileTakeNowlRef = useRef<HTMLInputElement | null>(null)

    const handleFile = (method: PHOTO_ADD_METHOD) => {

        setActive(method)

        let fileInput =
            PHOTO_ADD_METHOD.TAKE_NOW === method
                ? fileTakeNowlRef?.current
                : fileCameraRollRef?.current

        if (fileInput && fileInput?.files && fileInput.files[0]) {
            const file = fileInput?.files[0]
            getFile(file)
            
        }

        if (fileTakeNowlRef.current) {
            fileTakeNowlRef.current.value = "";
        }
        
        if (fileCameraRollRef.current) {
            fileCameraRollRef.current.value = "";
        }

        setIsOpen(false)
        setActive(null)
    }

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
                    <h5 className="publish__modaladd-title">Add Files</h5>
                    <h6 className="publish__modaladd-subtitle">
                        Choose a type of a content
                    </h6>
                    <div className="publish__modaladd-body">
                        <label
                            className={`publish__modaladd-item ${
                                active === PHOTO_ADD_METHOD.CAMERA_ROLL && "publish__modaladd-item--active"
                            }`}
                        >
                            <div className="publish__modaladd-item-img">
                                <img src="/Images/CameraRoll.png" alt="" />
                            </div>
                            <p>Camera Roll</p>
                            <input
                                type="file"
                                ref={fileCameraRollRef}
                                style={{ display: "none" }}
                                accept={"image/*"}
                                onChange={() =>
                                    handleFile(PHOTO_ADD_METHOD.CAMERA_ROLL)
                                }
                            />
                        </label>
                        <label
                            className={`publish__modaladd-item ${
                                active === PHOTO_ADD_METHOD.TAKE_NOW && "publish__modaladd-item--active"
                            }`}
                        >
                            <div className="publish__modaladd-item-img">
                                <img src="/Images/TakePhotoNow.png" alt="" />
                                <input
                                    type="file"
                                    ref={fileTakeNowlRef}
                                    style={{ display: "none" }}
                                    onChange={() =>
                                        handleFile(PHOTO_ADD_METHOD.TAKE_NOW)
                                    }
                                    accept={"image/*"}
                                    capture="user"
                                />
                            </div>
                            <p>Take now</p>
                        </label>
                    </div>
                </div>
            </Modal>
        </div>
    )
}
