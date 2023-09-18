import React, { useState } from "react"
import { Modal } from "../../ui/Modal"
import { ROLES } from "../../../types/enum"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { toOneKind } from "../../../utils/titles"

export const UserRouterModal = ({ setIsOpen }: { setIsOpen: () => void }) => {
    return (
        <div className="user__routemodal">
            <Modal setIsOpen={setIsOpen}>
                <div className="user__routemodal-body">
                    {[ROLES.ALLUSERS, ROLES.COORDINATORS, ROLES.BLOCKED].map(
                        (item) => {
                            return (
                                <Link to={`/admin/users/${toOneKind(item)}`}>
                                    <button className="user__routemodal-link" onClick={setIsOpen}>
                                        {item}
                                    </button>
                                </Link>
                            )
                        }
                    )}
                    <Link to={`/admin/users/${toOneKind("groups")}`}>
                        <button className="user__routemodal-link">
                            Groups
                        </button>
                    </Link>
                </div>
            </Modal>
        </div>
    )
}
