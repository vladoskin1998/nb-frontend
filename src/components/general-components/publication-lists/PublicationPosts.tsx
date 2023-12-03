import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"
import { InputSearch } from "../../ui/InputSearch"
import { IconServicesAllPoint } from "../../svg/IconServicesAll"
import { PostUserInterface } from "../../../types/types"
import { PublishPostHttp } from "../../../http/publish-post-http"
import { baseURL, roleUrl } from "../../../utils/config"
import moment from "moment"
import { PostSlick } from "../../ui/PostSlick"
import { useLocation, useNavigate } from "react-router-dom"
import { PublicationPostsPanel } from "./PublicationPostsPanel"
import { useAppSelector } from "../../../utils/hooks"
import { FeedBackHttp } from "../../../http/feedback-http"
import { ROLES } from "../../../types/enum"
import { GetStarted } from "../../user-components/newsfeed/GetStarted"
import { Loader } from "../../ui/Loader"
import { PublicationPostMyModal } from "./PublicationPostMyModal"
import { PublicationPostNeibModal } from "./PublicationPostNeibModal"

export const PublicationPosts = ({
    isMarkedOptions,
}: {
    isMarkedOptions?: boolean
}) => {
    const [myModalOpen, setMyModalOpen] = useState(false)
    const [neibModalOpen, setNeibModalOpen] = useState(false)
    const [options, setOptions] = useState({
        postId: "",
        avatarFileName: "",
        fullName: "",
        userId: "",
    })

    const { _id, role } = useAppSelector((s) => s.userReducer)
    const [searsh, setSearch] = useState("")
    const [allPageNumber, setAllPageNumber] = useState(1)
    const [pageNumber, setPageNumber] = useState(1)
    const [posts, setPosts] = useState<PostUserInterface[]>([])
    const [isLoad, setIsLoad] = useState(false)
    const { ref, inView } = useInView({
        threshold: 0,
    })
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        const effectBody = async () => {
            if (inView && allPageNumber >= pageNumber) {
                const res = await PublishPostHttp.getPosts({
                    pageNumber,
                    userId: _id,
                    isMarkedOption: isMarkedOptions || false,
                })
                setPosts((s) => [...s, ...res.posts])
                setAllPageNumber(res.allPageNumber)
                setPageNumber((s) => s + 1)
            }
        }

        effectBody()
    }, [inView])

    const updateLike = async (likeId: string, postId: string) => {
        await FeedBackHttp.updateLike({
            likeId,
            userId: _id,
        })
        setPosts((s) =>
            s.map((p) => {
                if (p._id === postId) {
                    return {
                        ...p,
                        isLiked: !p.isLiked,
                        likes: p.isLiked ? p.likes - 1 : p.likes + 1,
                    }
                } else {
                    return p
                }
            })
        )
    }

    const navigateToComments = (postId: string) => {
        navigate(`${roleUrl(role)}/comments?postId=${postId}`)
    }

    const toProfileInfo = (prop: {
        _id: string
        email: string
        role: string
        fullName: string
        avatarFileName: string
    }) => {
        navigate("/profileinfo", {
            state: prop,
        })
    }

    const updateRepost = async ({
        postId,
        isReposted,
    }: {
        postId: string
        isReposted: boolean
    }) => {
        if (!isReposted) {
            await PublishPostHttp.addRepost({
                postId,
                repostedUserId: _id,
            })
        } else {
            await PublishPostHttp.deleteRepost({
                postId,
                repostedUserId: _id,
            })
        }

        setIsLoad(true)
        setPosts([])

        for (let i = 1; i <= pageNumber; i++) {
            const res = await PublishPostHttp.getPosts({
                pageNumber: i,
                userId: _id,
                isMarkedOption: isMarkedOptions || false,
            })

            setPosts((s) => [...s, ...res.posts])
        }
        setIsLoad(false)
    }

    const updateMark = async (postId: string, isMarked: boolean) => {
        if (isMarked) {
            await PublishPostHttp.deleteMark({
                postId,
                marckedUserId: _id,
            })
        } else {
            await PublishPostHttp.addMark({
                postId,
                marckedUserId: _id,
            })
        }

        setPosts((s) =>
            s.map((p) => {
                if (p._id === postId) {
                    return {
                        ...p,
                        isMarked: !p.isMarked,
                    }
                } else {
                    return p
                }
            })
        )
    }

    const openModal = (props: {
        postId: string
        userId: string
        avatarFileName: string
        fullName: string
    }) => {
        setOptions(props)
        if (props.userId === _id) {
            setMyModalOpen(true)
        } else {
            setNeibModalOpen(true)
        }
    }

    return (
        <div
            className={`user__newsfeed ${
                location.pathname === "/admin/posts" && "user__newsfeed--admin"
            }`}
        >
            {!isMarkedOptions && <GetStarted />}

            <div
                className={`${
                    !(location.pathname === "/admin/posts") &&
                    "user__newsfeed-search"
                }`}
            >
                <InputSearch
                    placeholder={
                        <>
                            Search<span> Post</span>
                        </>
                    }
                    value={searsh}
                    changeValue={setSearch}
                />
            </div>
            <h5 className="user__newsfeed-title">Newsfeed</h5>
            <div className="admin__posts-list">
                {posts.map((item) => (
                    <div className="admin__posts-list-item" key={item?._id}>
                        {item.repostedUserId && (
                            <div className="admin__posts-list-repost">
                                <div
                                    className="admin__posts-list-row1-img"
                                    onClick={() =>
                                        toProfileInfo({
                                            _id: item.repostedUserId?._id || "",
                                            email: "",
                                            role: ROLES.USER,
                                            fullName:
                                                item.repostedUserId?.fullName ||
                                                "",
                                            avatarFileName:
                                                item?.userId?.avatarFileName ||
                                                "",
                                        })
                                    }
                                >
                                    <img
                                        src={`${baseURL}/uploads/avatar/${item.repostedUserId.avatarFileName}`}
                                        alt=""
                                    />
                                </div>
                                <div>
                                    <div className="admin__posts-list-row1-name">
                                        {item.repostedUserId?.fullName}
                                    </div>
                                    <div>
                                        <span className="admin__posts-list-row1-text">
                                            {moment(
                                                item?.createdRepostDate
                                            ).format("DD MMM YYYY HH:mm")}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="admin__posts-list-row1">
                            <div
                                className="admin__posts-list-row1-img"
                                onClick={() =>
                                    toProfileInfo({
                                        _id: item.userId?._id,
                                        email: "",
                                        role: ROLES.USER,
                                        fullName: item.userId?.fullName,
                                        avatarFileName:
                                            item?.userId?.avatarFileName || "",
                                    })
                                }
                            >
                                <img
                                    src={`${baseURL}/uploads/avatar/${item.userId.avatarFileName}`}
                                    alt=""
                                />
                            </div>
                            <div>
                                <div className="admin__posts-list-row1-name">
                                    {item.userId?.fullName}
                                </div>
                                <div>
                                    <span className="admin__posts-list-row1-text">
                                        {moment(item?.createdPostDate).format(
                                            "DD MMM YYYY HH:mm"
                                        )}
                                    </span>{" "}
                                    <span className="admin__posts-list-row1-text admin__posts-list-row1-textunder">
                                        {item?.addressLocation}
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={() =>
                                    openModal({
                                        postId: item._id,
                                        userId: item.userId._id,
                                        avatarFileName:
                                            item?.userId?.avatarFileName || "",
                                        fullName: item.userId?.fullName || "",
                                    })
                                }
                            >
                                <IconServicesAllPoint />
                            </button>
                        </div>
                        <div className="admin__posts-list-row2">
                            <PostSlick list={item?.filesName}>
                                {item?.filesName?.map((it) => (
                                    <div className="admin__posts-list-row2-img">
                                        <img
                                            src={`${baseURL}/uploads/publish_post/${it}`}
                                            alt=""
                                        />
                                    </div>
                                ))}
                            </PostSlick>
                        </div>
                        <div className="admin__posts-list-row3">
                            <h5>{item.title}</h5>
                            <h6>{item.text}</h6>
                        </div>
                        <PublicationPostsPanel
                            item={item}
                            updateLike={updateLike}
                            navigateToComments={navigateToComments}
                            updateMark={updateMark}
                            updateRepost={updateRepost}
                        />
                    </div>
                ))}
            </div>
            <div ref={ref} />
            {isLoad && <Loader />}
            <PublicationPostMyModal
                options={options}
                isOpen={myModalOpen}
                setIsOpen={setMyModalOpen}
            />
            <PublicationPostNeibModal
                options={options}
                isOpen={neibModalOpen}
                setIsOpen={setNeibModalOpen}
            />
        </div>
    )
}
