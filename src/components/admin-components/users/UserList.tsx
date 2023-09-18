import React from 'react'
import { ROLES } from '../../../types/enum'
import { UserItemModule } from './UserItemModule'


const users = [
    {
        email: "",
        role: ROLES.ADMIN,
        _id: "",
        coordinates: { lat: null, lng: null },
        city: null,
        country: null,
        houseNumber: null,
        street: null,
        fullName: "",
    },
]


export const UserList = ({role}: {role:ROLES}) => {


  return (
    <div className='user__list'>
        {users.map(item => <UserItemModule {...item}/>)}
    </div>
  )
}
