
import { UserItemView } from "./UserItemView"
import { UserItemModal } from "./UserItemModal"
import { InitialStateUserWithIdInterface } from "../../../reducer/profile"
import { useState } from "react"

interface UserItemModuleProps extends InitialStateUserWithIdInterface{
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
