import React, { useState } from "react"
import { UserItemView } from "./UserItemView"
import { UserItemModal } from "./UserItemModal"
import { InitialStateUserInterface } from "../../../reducer/profile"



interface UserItemModuleProps extends InitialStateUserInterface{
    blockUser: (id:string) => void
    deleteUser: (id:string) => void
}

export const UserItemModule = (props: UserItemModuleProps) => {

    const [isOpen, setIsOpen] = useState(false)

    const handlerBlockUser = () => {
        props.blockUser(props._id)
    }
    
    const handlerDeleteUser = () => {
        props.deleteUser(props._id)
    }
    return (
        <>
            <UserItemView {...props} setIsOpen={() => setIsOpen(true)} />
            <UserItemModal
                isOpen={isOpen}
                setIsOpen={(o: boolean) => setIsOpen(o)}
                handlerBlockUser={handlerBlockUser} 
                handlerDeleteUser={handlerDeleteUser}
            />
        </>
    )
}
