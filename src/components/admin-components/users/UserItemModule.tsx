import React, { useState } from "react"
import { UserItemView } from "./UserItemView"
import { UserItemModal } from "./UserItemModal"

export const UserItemModule = (props: any) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <>
            <UserItemView setIsOpen={() => setIsOpen(true)}/>
            <UserItemModal
                isOpen={isOpen}
                setIsOpen={(o: boolean) => setIsOpen(o)}
            />
        </>
    )
}
