import React from "react"
import { Modal } from "../../ui/Modal"
import data from "@emoji-mart/data"
import Picker from "@emoji-mart/react"
export const ModalSmile = ({
    setIsOpenSmile,
    setMessage,
    message,
}: {
    setIsOpenSmile: (o: boolean) => void
    setMessage: (s: string) => void
    message: string
}) => {
    return (
        <div className="messenger__chat-modal">
            <Modal setIsOpen={setIsOpenSmile}>
                <Picker
                    data={data}
                    onEmojiSelect={(e: any) => setMessage(message + e?.native)}
                    theme="light"
                />
            </Modal>
        </div>
    )
}
