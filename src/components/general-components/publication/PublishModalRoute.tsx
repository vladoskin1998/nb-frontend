import { Link } from "react-router-dom"
import { Modal } from "../../ui/Modal"

export const PublishModalRoute = ({
    setIsOpen,
}: {
    setIsOpen: (s: boolean) => void
}) => {
    return (
        <div className="publish__routemodal">
            <Modal className="" setIsOpen={setIsOpen}>
                <div className="publish__routemodal-body">
                    <h5 className="publish__routemodal-title">
                        Where to publish?
                    </h5>
                    <h6 className="publish__routemodal-subtitle">
                        Choose your medium
                    </h6>
                    <div className="publish__routemodal-buttons">
                        <Link to={"/publish/post"}>
                            <div className="publish__routemodal-button">
                                <div className="publish__routemodal-button-img">
                                    <img
                                        src="/Images/PublishPost.png"
                                        alt=""
                                        style={{ height: "76px" }}
                                    />
                                </div>
                                <p className="publish__routemodal-text">
                                    Newsfeed
                                </p>
                            </div>
                        </Link>
                        <Link to={"/publish/service"}>
                            <div className="publish__routemodal-button">
                                <div className="publish__routemodal-button-img">
                                    <img
                                        src="/Images/PublishService.png"
                                        alt=""
                                        style={{ height: "95px" }}
                                    />
                                </div>
                                <p className="publish__routemodal-text">
                                    Service
                                </p>
                            </div>
                        </Link>
                        <Link to={"/publish/event"}>
                            <div className="publish__routemodal-button">
                                <div className="publish__routemodal-button-img">
                                    <img
                                        src="/Images/PublishEvent.png"
                                        alt=""
                                        style={{ height: "95px" }}
                                    />
                                </div>
                                <p className="publish__routemodal-text">
                                    Activity
                                </p>
                            </div>
                        </Link>
                    </div>
                </div>
            </Modal>
        </div>
    )
}
