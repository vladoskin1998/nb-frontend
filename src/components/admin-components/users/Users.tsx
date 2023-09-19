import { useState } from "react"
import { AdminSubHeader } from "../../ui/AdminSubHeader"
import { IconBottomChevrons } from "../../svg/IconChevrons"
import { InputSearch } from "../../ui/InputSearch"
import { Route, Routes, useLocation } from "react-router-dom"
import { ROLES } from "../../../types/enum"
import { UserListModule } from "./UserListModule"
import { UserRouterModal } from "./UserRouterModal"
import { userSubTitle } from "../../../utils/titles"
import { UserGroups } from "./UserGroups"

export const Users = () => {
    const [currentRoles, setCurrentRoles] = useState<ROLES>(ROLES.ALLUSERS)

    const [isOpenAdd, setIsOpenAdd] = useState(false)

    const [isOpenChevron, setIsOpenChevron] = useState(false)

    const [search, setSearch] = useState("")
    const changeAdd = () => {
        setIsOpenAdd((s) => !s)
    }

    const changeChevron = () => {
        setIsOpenChevron(false)
    }
    const onClickFilter = () => {}

    const location = useLocation();
    
    return (
        <div className="admin">
            <AdminSubHeader onClickButton={changeAdd}>
                <div className="services__exit">
                    <h5 style={{ textTransform: "capitalize" }}>
                        {
                            userSubTitle(location.pathname)
                        }
                    </h5>
                </div>
                <button className="user__route--button" onClick={() => setIsOpenChevron(true)}>
                    <IconBottomChevrons />
                </button>
                {isOpenChevron && <UserRouterModal setIsOpen={changeChevron}/>}
            </AdminSubHeader>
            <InputSearch
                placeholder={"Search User"}
                onClickFilter={onClickFilter}
                value={search}
                changeValue={setSearch}
            />
            <Routes>
                
                <Route path="groups" element={<UserGroups />} />
                <Route path="blocked" element={<UserListModule role={ROLES.BLOCKED}/>} />
                <Route path="coordinators" element={<UserListModule role={ROLES.COORDINATORS} />} />
                <Route path="*" element={<UserListModule role={ROLES.ALLUSERS}/>} />
            </Routes>
        </div>
    )
}
