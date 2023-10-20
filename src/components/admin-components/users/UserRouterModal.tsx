import { Modal } from "../../ui/Modal"
import { ROLES } from "../../../types/enum"
import { Link } from "react-router-dom"
import { toOneKind } from "../../../utils/titles"

const list = Object.values(ROLES)

export const UserRouterModal = ({ setIsOpen }: { setIsOpen: () => void }) => {
    return (
        <div className="user__routemodal">
            <Modal setIsOpen={setIsOpen}>
                <div className="user__routemodal-body" onClick={() => setIsOpen()}>
                    {list.map(
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
                    <Link to={`/admin/users`}>
                        <button className="user__routemodal-link">
                            Groups
                        </button>
                    </Link>
                </div>
            </Modal>
        </div>
    )
}
