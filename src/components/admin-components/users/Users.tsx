import { useState } from "react"
import { AdminSubHeader } from "../../ui/AdminSubHeader"
import { IconBottomChevrons } from "../../svg/IconChevrons"
import {
    Route,
    Routes,
    useLocation,
    useParams,
    useSearchParams,
} from "react-router-dom"
import { ROLES } from "../../../types/enum"
import { UserListModule } from "./UserListModule"
import { UserRouterModal } from "./UserRouterModal"
import { toOneKind, userSubTitle } from "../../../utils/titles"
import { UserGroups } from "./UserGroups"
import { useAppDispatch, useAppSelector } from "../../../utils/hooks"
import { Loader } from "../../ui/Loader"

const list = Object.values(ROLES)

export const Users = () => {

    const [isOpenChevron, setIsOpenChevron] = useState(false)
    const location = useLocation()
    const { isLoad } = useAppSelector((s) => s.userReducer)

    const changeChevron = () => {
        setIsOpenChevron(false)
    }

    return (
        <div className="admin">
            {location.pathname === "/admin/users" ? (
                <div className="user__groups-title">
                    <h5 style={{ textTransform: "capitalize" }}>Groups</h5>
                </div>
            ) : (
                <AdminSubHeader >
                    <div className="services__exit">
                        <h5 style={{ textTransform: "capitalize" }}>
                            {userSubTitle(location.pathname)}
                        </h5>
                    </div>
                    <button
                        className="user__route--button"
                        onClick={() => setIsOpenChevron(true)}
                    >
                        <IconBottomChevrons />
                    </button>
                    {isOpenChevron && (
                        <UserRouterModal setIsOpen={changeChevron} />
                    )}
                </AdminSubHeader>
            )}

            <Routes>
                {list.map((item) => (
                    <Route
                        path={toOneKind(item)}
                        element={<UserListModule role={item} />}
                    />
                ))}
                <Route path="*" element={<UserGroups />} />
            </Routes>
            {isLoad && <Loader />}
        </div>
    )
}
