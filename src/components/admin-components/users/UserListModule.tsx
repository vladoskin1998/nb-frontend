import React, { useEffect, useState } from "react"
import { ROLES } from "../../../types/enum"
import { UserItemModule } from "./UserItemModule"
import $api from "../../../http"

import { AxiosResponse } from "axios"
import { InputSearch } from "../../ui/InputSearch"
import { UserInitialStateInterface, setLoader } from "../../../reducer/users"
import { success } from "../../ui/LoadSuccess"
import { useAppDispatch, useAppSelector } from "../../../utils/hooks"
import { useLocation } from "react-router-dom"
import { UserHttp } from "../../../http/user-http"
import { TextField } from "@mui/material"

export const UserListModule = ({ role = ROLES.ALLUSERS }: { role?: ROLES }) => {
    const [users, setUsers] = useState<UserInitialStateInterface[]>([])
    const [searchName, setSearchName] = useState("")
    const { _id } = useAppSelector((s) => s.userReducer)
    const location = useLocation()
    const dispatch = useAppDispatch()
    const currentRole = location.state?.role ? location.state?.role : role

    useEffect(() => {
        dispatch(setLoader(true))
        const timeOutId = setTimeout(() => {
            getUsers()
        }, 1000)
        return () => clearTimeout(timeOutId)
    }, [searchName, currentRole])

    const getUsers = async () => {
        const res: UserInitialStateInterface[] = await UserHttp.getUsers({
            _id,
            role: currentRole,
            searchName,
        })

        setUsers(res)
        dispatch(setLoader(false))
    }

    const deleteUser = async (_id: string) => {
        await $api
            .post("user/delete-user", { _id })
            .then(() => setUsers((s) => s.filter((item) => item._id !== _id)))
    }

    const blockUser = async (_id: string) => {
        await $api.post("user/block-user", { _id }).then(() => {
            setUsers((s) => s.filter((item) => item._id !== _id))
            success()
        })
    }

    return (
        <>
            <InputSearch
                placeholder={
                    <>
                        Search <span>User</span>
                    </>
                }
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
