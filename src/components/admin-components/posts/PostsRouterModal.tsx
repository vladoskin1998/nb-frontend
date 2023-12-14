import { Modal } from "../../ui/Modal"
import { ROLES } from "../../../types/enum"
import { Link } from "react-router-dom"
import { toOneKind } from "../../../utils/titles"

const list = ['all', 'commens', 'reports']

export const PostsRouterModal = ({ setIsOpen }: { setIsOpen: () => void }) => {
    return (
        <div className="user__routemodal">
            <Modal className="" setIsOpen={setIsOpen}>
                <div className="user__routemodal-body" onClick={() => setIsOpen()}>
                    {list.map(
                        (item) => {
                            return (
                                <Link to={`/admin/posts/${toOneKind(item)}`}>
                                    <button className="user__routemodal-link" onClick={setIsOpen}>
                                        {item}
                                    </button>
                                </Link>
                            )
                        }
                    )}
                </div>
            </Modal>
        </div>
    )
}
