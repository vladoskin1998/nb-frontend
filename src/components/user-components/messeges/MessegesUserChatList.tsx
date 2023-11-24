import React from "react"
import { AllUserChatList } from "../../general-components/messenger/AllUserChatList"
import {
    UserHeaderChat,
    UserHeaderUserChatList,
} from "../header/UserHeaderChat"

export const MessegesUserChatList = () => {
    return (
        <>
            <UserHeaderUserChatList headerTitle="Invite Friends" />
            <AllUserChatList />
        </>
    )
}
