import React, { useEffect, useState } from "react"
import { ROLES } from "../../../types/enum"
import { UserItemModule } from "./UserItemModule"
import $api from "../../../http"

import { AxiosResponse } from "axios"
import { InputSearch } from "../../ui/InputSearch"
import { UserInitialStateInterface } from "../../../reducer/users"

export const UserListModule = ({ role }: { role: ROLES }) => {

    const [users, setUsers] = useState<UserInitialStateInterface[]>([])
    const [searchName, setSearchName] = useState("")

    useEffect(() => {
        const timeOutId = setTimeout(() => getUsers(), 1000)
        return () => clearTimeout(timeOutId)
    }, [searchName, role])

    const getUsers = async () => {
        const user = await $api
            .post("user/get-users", { role, searchName })
            .then((res: AxiosResponse<UserInitialStateInterface[]>) =>
                setUsers(res.data)
            )

        const userIdentity = await $api.post('identity/get-user-identity', payload)   
         
    }

    const deleteUser = async (_id: string) => {
        await $api
            .post("user/delete-user", { _id })
            .then(() => setUsers((s) => s.filter((item) => item._id !== _id)))
    }

    const blockUser = async (_id: string) => {
        await $api
            .post("user/block-user", { _id })
            .then(() => setUsers((s) => s.filter((item) => item._id !== _id)))
    }

    return (
        <>
            <InputSearch
                placeholder={"Search User"}
                value={searchName}
                changeValue={setSearchName}
            />
            <div className="user__list">
                {users.map((item: UserInitialStateInterface) => (
                    <UserItemModule
                        key={item._id}
                        {...item}
                        blockUser={blockUser}
                        deleteUser={deleteUser}
                    />
                ))}
            </div>
        </>
    )
}
