import React, { useContext } from "react"
import { Modal } from "../../ui/Modal"
import data from "@emoji-mart/data"
import Picker from "@emoji-mart/react"
import { SocketContext } from "../../../context/SocketContext"
import { useAppSelector } from "../../../utils/hooks"
import { SOCKET_MESSENDER_EVENT } from "../../../types/enum"
import { MessageType } from "../../../types/types"
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
            <Modal className="" setIsOpen={setIsOpenSmile}>
                <Picker
                    data={data}
                    onEmojiSelect={(e: any) => setMessage(message + e?.native)}
                    theme="light"
                />
            </Modal>
            
        </div>
    )
}
export const ModalSmileLike = (props:{senderId:string,index:number,updateList: (index:number, val:string)=>void, fileName:string | null,setIsOpenSmile:(o:boolean)=>void, timeStamp:Date,chatId:string}) => {
    const { socket } = useContext(SocketContext)
    const { _id } = useAppSelector((s) => s.userReducer)
    return (
        <div className="messenger__chat-modal">
            <Modal className="" setIsOpen={props.setIsOpenSmile}>
                <Picker
                    data={data}
                    onEmojiSelect={(e: any) => {
                            if (socket) {
                                socket.current?.emit(SOCKET_MESSENDER_EVENT.SEND_PRIVATE_MESSAGE_LIKE, {
                                    chatId: props.chatId,
                                    senderId: props.senderId,
                                    like: (e?.native),
                                    timestamp: props.timeStamp,
                                    isRead: true,
                                })
                                props.updateList(props.index,e?.native)
                            }
                    }}
                    theme="light"
                />
            </Modal>
            
        </div>
    )
}
