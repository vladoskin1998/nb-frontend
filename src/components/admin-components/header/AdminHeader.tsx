import React, { useEffect, useState } from "react"
import {
    IconAdminClose,
    IconAdminBurger,
    IconAdminImage,
} from "../../svg/IconAdminHeader"
import MenuHeader from "./MenuHeader"
import { headerTitle } from "../../../utils/titles"
import { useLocation } from "react-router-dom"
import { Link } from "react-router-dom"
const AdminHeader = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [title, setTitle] = useState(headerTitle(""))
    const location = useLocation()

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
                    <IconAdminImage />
                </button>{" "}
            </Link>
            <MenuHeader
                isOpen={isOpen}
                setIsOpen={(o: boolean) => setIsOpen(o)}
            />
        </div>
    )
}

export default AdminHeader
