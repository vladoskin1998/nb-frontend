import { FriendUserChatList } from "../../general-components/messenger/FriendUserChatList"
import { UserHeaderUserChatList } from "../header/UserHeaderChat"

export const MessegesFrinedList = () => {
    return (
        <>
            <UserHeaderUserChatList  headerTitle="Write messege" />
            <FriendUserChatList />
        </>
    )
}
