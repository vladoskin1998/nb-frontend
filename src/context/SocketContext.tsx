import { ReactNode, createContext, useEffect, useRef } from "react"
import io, { Socket } from "socket.io-client"
import { baseURLSocket } from "../utils/config"

const SocketContext = createContext<{
    socket: React.MutableRefObject<Socket | null> | null
}>({
    socket: null,
})

const SocketContextProvider = ({ children }: { children: ReactNode }) => {
    let socketRef = useRef<Socket | null>(null)

    useEffect(() => {
        socketRef.current =  io(baseURLSocket, {
            auth: {
                accessToken: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        })

        socketRef.current.on('connect', () => {
            console.log("Сокс-соединение установлено");
          });
        
    }, [])


    return (
        <SocketContext.Provider
            value={{
                socket: socketRef,
            }}
        >
            {children}
        </SocketContext.Provider>
    )
}

export { SocketContextProvider, SocketContext }
