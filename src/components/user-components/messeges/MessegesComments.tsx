import React from 'react'
import { UserHeaderUserChatList } from '../header/UserHeaderChat'
import { ListCommentsPost } from '../../general-components/messenger/ListCommentsPost'

export const MessegesComments = () => {
  return (
    <>
        <UserHeaderUserChatList  headerTitle="Post Comments" />
        <ListCommentsPost />
    </>
  )
}
