import React from "react"
import { ChatMessage } from "../../general-components/messenger/ChatMessage"
import { AdminSubHeader } from "../../ui/AdminSubHeader"
import { ChatList } from "../../general-components/messenger/ChatList"

export const AdminChatMessage = () => {
    return (
        <>
            <AdminSubHeader>
                <div className="services__exit">
                    <h5>Messenger</h5>
                </div>
            </AdminSubHeader>
            <ChatList />
        </>
    )
}
