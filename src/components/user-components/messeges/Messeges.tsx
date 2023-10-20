import { ChatList } from "../../general-components/messenger/ChatList"
import { ChatMessage } from "../../general-components/messenger/ChatMessage"
import { Routes, Route } from "react-router-dom"
import { UserHeaderChat } from "../header/UserHeaderChat"

export const Messeges = () => {
    return (
        <div className="admin">
            <UserHeaderChat />
            <Routes>
                <Route path="chat" element={<ChatMessage />} />
                <Route path="*" element={<ChatList/>} />
            </Routes>
        </div>
    )
}
