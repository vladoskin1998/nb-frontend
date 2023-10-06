import { useEffect, useState } from "react"
import {
    IconAdminClose,
    IconAdminBurger,
    IconAdminImage,
} from "../../svg/IconAdminHeader"
import MenuHeader from "./MenuHeader"
import { headerTitle } from "../../../utils/titles"
import { useLocation } from "react-router-dom"
import { Link } from "react-router-dom"
import { useAppSelector } from "../../../utils/hooks"
import { baseURL } from "../../../utils/config"
const AdminHeader = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [title, setTitle] = useState(headerTitle(""))
    const location = useLocation()
    const { avatarFileName } = useAppSelector((s) => s.profileReducer)

    useEffect(() => {
        if (isOpen) {
            setTitle("Menu")
        } else {
            const localRoute = location.pathname
            setTitle(headerTitle(localRoute))
        }
    }, [isOpen, location])

    return (
        <div className="admin__header">
            <button
                onClick={() => setIsOpen((s) => !s)}
                className="admin__header-button"
            >
                {isOpen ? <IconAdminClose /> : <IconAdminBurger />}
            </button>
            <h4 className="admin__header-title">{title}</h4>
            <Link to="/profile">
                <button className="admin__header-button">
                    {avatarFileName ? (
                        <img
                            src={`${baseURL}/uploads/avatar/${avatarFileName}`}
                            alt=""
                        />
                    ) : (
                        <IconAdminImage />
                    )}
                </button>
            </Link>
            <MenuHeader
                isOpen={isOpen}
                setIsOpen={(o: boolean) => setIsOpen(o)}
            />
        </div>
    )
}

export default AdminHeader
