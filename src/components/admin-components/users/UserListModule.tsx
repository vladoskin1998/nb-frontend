import React, { useEffect, useState } from "react"
import { ROLES } from "../../../types/enum"
import { UserItemModule } from "./UserItemModule"
import $api from "../../../http"
import { InitialStateUserInterface } from "../../../reducer/user"
import { AxiosResponse } from "axios"
import { InputSearch } from "../../ui/InputSearch"

export const UserListModule = ({ role }: { role: ROLES }) => {

    const [users, setUsers] = useState<InitialStateUserInterface[]>([])
    const [searchName, setSearchName] = useState("")

    useEffect(() => {
        const timeOutId = setTimeout(() => getUsers(), 1000)
        return () => clearTimeout(timeOutId)
    }, [searchName, role])

    const getUsers = async () => {
        await $api
            .post("user/get-users", { role, searchName })
            .then((res: AxiosResponse<InitialStateUserInterface[]>) =>
                setUsers(res.data)
            )
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
                {users.map((item: InitialStateUserInterface) => (
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
