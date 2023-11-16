import React, {
    ReactNode,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react"
import { SocketContext } from "../../../context/SocketContext"
import {
    NOTIFICATION_EVENT,
    SOCKET_NOTIFICATION_EVENT,
} from "../../../types/enum"
import { useAppSelector } from "../../../utils/hooks"
import { baseURL } from "../../../utils/config"
import { notificationDirname, notificationTypeTitle } from "../../../utils/titles"
import { IconAdminClose } from "../../svg/IconAdminHeader"

export const Notification = ({ children }: { children: ReactNode }) => {
    const { socket } = useContext(SocketContext)
    const { _id } = useAppSelector((s) => s.userReducer)
    const [notification, setNotification] = useState<{
        title: string
        fileName: string
        fullName: string
    } | null>(null)
    let timerRef = useRef<NodeJS.Timeout | null>(null)
    const [dirname, setDirname] = useState('')

    useEffect(() => {
        if (socket && socket?.current && _id) {
            console.log(
                SOCKET_NOTIFICATION_EVENT.JOIN_ROOM_NOTIFICATION,
                String(_id)
            )

            socket.current?.emit(
                SOCKET_NOTIFICATION_EVENT.JOIN_ROOM_NOTIFICATION,
                String(_id)
            )

            socket.current?.on(
                SOCKET_NOTIFICATION_EVENT.NOTIFICATION,
                (ownerId:string, title: string, fileName: string, fullName: string, event: NOTIFICATION_EVENT) => {

                    console.log(
                       "ownerId", ownerId,
                       "title", title, 
                       "fileName", fileName,
                       "fullName",fullName,
                       "event", event
                    );
                    
                    if(ownerId === _id){
                        return
                    }
                    
                    if(window.location.pathname.includes("chat" ) && event === NOTIFICATION_EVENT.NOTIFICATION_MESSAGE){
                        return 
                    }


                    if (timerRef.current) {
                        clearTimeout(timerRef.current)
                    }

                    const dir = notificationDirname(event)
                    setDirname(dir)
                    setNotification({ title, fileName, fullName })

                    timerRef.current = setTimeout(() => {
                        setNotification(null)
                    }, 70000)
                }
            )
        }
        return () => {
            if (socket && socket?.current) {
                socket.current?.emit(
                    SOCKET_NOTIFICATION_EVENT.LEAVE_ROOM_NOTIFICATION,
                    String(_id)
                )
            }
        }
    }, [socket?.current, _id])

    const handlerCloseNotification = () => {
        setNotification(null)
        if (timerRef.current) {
            clearTimeout(timerRef.current)
        }
    }

    return (
        <>
            {notification && (
                <div className="notification__alert">
                    <div className="notification__alert-img">
                        <img
                            src={`${baseURL}/uploads/${dirname}/${notification.fileName}`}
                            alt=""
                        />
                      
                    </div>
                    <div>
                        <h5 className="notification__alert-text">{notification.fullName}</h5>
                        <h6 className="notification__alert-text">{notification.title}</h6>
                    </div>
                    <button className="notification__alert-close" onClick={handlerCloseNotification}>
                        <IconAdminClose />
                    </button>
                </div>
            )}
            {children}
        </>
    )
}
