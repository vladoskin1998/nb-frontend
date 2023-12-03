import { ChatList } from "../../general-components/messenger/ChatList"
import { ChatMessage } from "../../general-components/messenger/ChatMessage"
import { Routes, Route } from "react-router-dom"
import { UserHeaderChat } from "../header/UserHeaderChat"
import { MessegesChatList } from "./MessegesChatList"
import { MessegesChatMessage } from "./MessegesChatMessage"
import { MessegesUserChatList } from "./MessegesUserChatList"
import { MessegesFrinedList } from "./MessegesFrinedList"
import { MessegesComments } from "./MessegesComments"

export const Messeges = () => {
    return (
        <div className="user user--body">
        
            <Routes>
                <Route path="comments-posts" element={<MessegesComments />} />

                <Route path="friend-user-chat" element={<MessegesFrinedList />} />
                <Route path="all-user-chat" element={<MessegesUserChatList />} />
                <Route path="chat" element={<MessegesChatMessage />} />
                <Route path="*" element={<MessegesChatList />} />
            </Routes>
        </div>
    )
}
