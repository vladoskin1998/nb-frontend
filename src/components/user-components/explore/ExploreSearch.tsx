import { useNavigate } from "react-router-dom";
import { IconLeftChevrons } from "../../svg/IconChevrons";
import { UserHeader } from "../header/UserHeader";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";
import { InputSearch } from "../../ui/InputSearch";
import { useEffect, useState } from "react";
import { SlickCategories } from "../../ui/SlickCategories";
import { baseURL, roleUrl } from "../../../utils/config";
import { UserInitialStateInterface, setLoader } from "../../../reducer/users";
import { UserHttp } from "../../../http/user-http";
import { NOTIFICATION_POST, ROLES, SERVICES_EVENT } from "../../../types/enum";
import { UserItem } from "../../general-components/messenger/AllUserChatList";
import { ServicesInterface } from "../../../types/services";
import { GetAllPublishServicetInterface, PostUserInterface, PublishServiceItemInterface } from "../../../types/types";
import { ServiceHttp } from "../../../http/service-http";
import { CategoriesItemInterface } from "../../../reducer/categories";
import { IconStars } from "../../svg/IconFavor";
import { IconProfileInfoBookmark } from "../../svg/IconProfileInfo";
import { IconArrowRight } from "../../svg/IconArrow";
import { PublishPostHttp } from "../../../http/publish-post-http";
import { useInView } from "react-intersection-observer";
import { PublicationPostsPanel } from "../../general-components/publication-lists/PublicationPostsPanel";
import { PostSlick } from "../../ui/PostSlick";
import { IconServicesAllPoint } from "../../svg/IconServicesAll";
import moment from "moment";
import { IconPostModalPin } from "../../svg/IconPostModal";
import { FeedBackHttp } from "../../../http/feedback-http";
import { Loader } from "../../ui/Loader";
import { PublicationPostMyModal } from "../../general-components/publication-lists/PublicationPostMyModal";
import { PublicationPostNeibModal } from "../../general-components/publication-lists/PublicationPostNeibModal";

export const ExploreSearch = () => {
    const navigate = useNavigate()
    const {fullName} = useAppSelector((s)=>s.userReducer)
    const [search, setSearch] = useState<string>("")
    const [users, setUsers] = useState<UserInitialStateInterface[]>([])
    const { _id } = useAppSelector((s) => s.userReducer)
    const dispatch = useAppDispatch()
    const [load, setLoad] = useState(false)
    const [services, setServices] = useState<PublishServiceItemInterface[]>([])
    const [servicesNormal, setServicesNormal] = useState<PublishServiceItemInterface[]>([])
    const [posts, setPosts] = useState<PostUserInterface[]>([]);
    const [postsNormal, setPostsNormal] = useState<PostUserInterface[]>([]);
    const [allPageNumber, setAllPageNumber] = useState(1)
    const [pageNumber, setPageNumber] = useState(1)

    const [type, setType] = useState<string>("")

    const { role } = useAppSelector((s) => s.userReducer)
    const [currentSlide, setCurrentSlide] = useState(0)

    const { ref, inView } = useInView({
        threshold: 0,
    })

    const [currnetItem, setCurrentItem] = useState<PostUserInterface | null>(
        null
    )
    const [myModalOpen, setMyModalOpen] = useState(false)
    const [neibModalOpen, setNeibModalOpen] = useState(false)


    useEffect(() => {
        const timeOutId = setTimeout(() => {
            if (search && type==="neighbors") {
                getUsers()
            }
            if (search && type==="services") {
                let array:PublishServiceItemInterface[] = []
                services.map((item)=>{
                    if(item.title.includes(search)){
                        array.push(item);
                    }
                })
                setServicesNormal(array)
            }
            if (posts && type==="posts") {
                let array:PostUserInterface[] = []
                posts.map((item)=>{
                    if(item.title.includes(search) || item.text.includes(search) || item.repostedUserId?.fullName.includes(search)){
                        array.push(item);
                    }
                })
                setPostsNormal(array)
            }
            if(search===""){
                setUsers([]);
                setServicesNormal([]);
                setPostsNormal([]);
            }
            console.log(type)
        }, 1000)
        return () => clearTimeout(timeOutId)
    }, [search])

    useEffect(() => {
        const effectBody = async () => {
            if (inView && allPageNumber >= pageNumber) {
                const res = await PublishPostHttp.getPosts({
                    pageNumber,
                    userId: _id,
                })
                setPosts((s) => [...s, ...res.posts])
                setAllPageNumber(res.allPageNumber)
                setPageNumber((s) => s + 1)
            }
        }

        effectBody()
    }, [inView])

    const getUsers = async () => {
        setLoad(true)
        const res: UserInitialStateInterface[] = await UserHttp.getUsers({
            _id,
            role: ROLES.ALLUSERS,
            searchName: search,
        })
        setLoad(false)
        setUsers(res)
        dispatch(setLoader(false))
    }
    const getServices = async () => {
        setLoad(true)
        const res: PublishServiceItemInterface[] = await ServiceHttp.getTenPublishService();
        console.log(search)
        setLoad(false)
        setServices(res);
        dispatch(setLoader(false))
    }

    const getAllPostReload = async () => {
        setLoad(true)
        setPosts([])

        for (let i = 1; i <= 10; i++) {
            const res = await PublishPostHttp.getPosts({
                pageNumber: i,
                userId: _id,
            })

            setPosts((s) => [...s, ...res.posts])
        }
        setLoad(false)
        dispatch(setLoader(false));
    }

    const openModal = (item: PostUserInterface) => {
        setCurrentItem(item)
        if (item.userId._id === _id) {
            setMyModalOpen(true)
        } else {
            setNeibModalOpen(true)
        }
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


    const getPinPost = async () => {
        const pinedList = await PublishPostHttp.getPostPin({ userId: _id })

        if (pinedList.length) {
            const pinedPostList = await PublishPostHttp.getPosts({
                pageNumber: 0,
                userId: _id,
                listPinedPost: pinedList.map((item) => item.repostId),
            })

            setPosts((s) => [...pinedPostList.posts, ...s])
            return
        }

        setPosts((s) => s.filter((item) => !item.isPinedPostFlag))
    }

    useEffect(() => {
        getPinPost()
    }, [])


    const updateRepost = async ({
        postId,
        isReposted,
    }: {
        postId: string
        isReposted: boolean
    }) => {
        await PublishPostHttp.updateRepost({
            postId,
            repostedUserId: _id,
        })

        getAllPostReload()
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
                    const newItem = {
                        ...p,
                        isMarked: !p.isMarked,
                    }
                    setCurrentItem(newItem)
                    return newItem
                } else {
                    return p
                }
            })
        )
    }

    const toComments = (index: number, comment:string) => {
        setCurrentSlide(index)
        setType(comment);
        if(comment==="services"){
            getServices();
        }
        if(comment==="posts"){
            getAllPostReload()
        }
    }
    const toPublishService = (_id: string) => {
        navigate(`/user/service/publish-service?publishServiceId=${_id}`)
    }

    return(
        <div>
            <UserHeader>
                <div className="user__header-messages">
                    <div className="explore__search__wrapper">
                        <button
                                onClick={() => navigate(-1)}
                                className="user__header-chatuser user__header-messages-exit explore__back"
                            >
                                <IconLeftChevrons />
                        </button>
                        <div className="explore-search">
                            <InputSearch
                                placeholder={
                                    <>
                                        Search <b>Map</b>
                                    </>
                                }
                                value={search}
                                changeValue={setSearch}
                            />
                        </div>
                        <button
                                onClick={() => setSearch("")}
                                className="user__header-chatuser user__header-messages-exit explore__cancel"
                            >
                                Cancel
                        </button>
                    </div>
                </div>
            </UserHeader>
            <div className="explore__search__main__wrapper">
                <div className="activities__filter">
                    <SlickCategories>
                        {[
                            "All",
                            "Neighbors",
                            "Services",
                            "Events",
                            "Posts",
                        ].map((item, index) => (
                            <div
                                className={`activities__filter-item ${
                                    index === currentSlide &&
                                    "activities__filter-item--active"
                                }`}
                                key={index}
                                onClick={() => 
                                    toComments(index, item.toLocaleLowerCase())
                                }
                            >
                                {item}
                            </div>
                        ))}
                    </SlickCategories>
                    {
                        type==="neighbors" && 
                        <div className="messenger__alluser">
                            {search && <h2>Neighbors</h2>}
                            {users.map((item) => (
                                <UserItem {...item} />
                            ))}
                        </div>
                    }
                    {
                        type==="services" &&
                        <div className="messenger__alluser">
                           {search && <h2>Services</h2>}
                            {servicesNormal.map((item) => (
                                <div className="user__services-last-item" onClick={() => toPublishService(item._id)}>
                                <div className="user__services-last-item-img">
                                    <div className="user__services-last-item-img-1 user__services-last-item-img-info">
                                    <div className="user__services-last-item-img-text">
                                        Cleaning
                                    </div>
                                </div>
                                <img
                                    src={`${baseURL}/uploads/publish_services/${item.filesName[0]}`}
                                    alt=""
                                />
                                <div className="user__services-last-item-img-2 user__services-last-item-img-info">
                                    <div className="user__services-last-item-img-text">
                                        <IconStars />
                                        <b>4.5</b>
                                        <span>{"( 808 )"}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="user__services-last-item-info">
                                <div className="user__services-last-item-row1">
                                    <h5 className="user__services-last-item-title">
                                        {item.title}
                                    </h5>
                                    <button>
                                        <IconProfileInfoBookmark />
                                    </button>
                                </div>
                                <h6 className="user__services-last-item-text">
                                    {item.text}
                                </h6>
                                <div className="user__services-last-item-foot">
                                    1 km
                                    <IconArrowRight />
                                </div>
                            </div>
                        </div>
                        ))}
                    </div>
                    }
                    {
                        type==="posts" &&
                        <div className="messenger__alluser">
                            {search&&<h2>Posts</h2>}
                            {postsNormal.map((item) => (
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
                                                item?.repostedUserId?.avatarFileName ||
                                                "",
                                        })
                                    }
                                >
                                    <img
                                        src={`${baseURL}/uploads/avatar/${item.repostedUserId.avatarFileName}`}
                                        alt=""
                                    />
                                </div>
                                <div
                                    onClick={() => navigateToComments(item._id)}
                                >
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
                            <div onClick={() => navigateToComments(item._id)}>
                                <div className="admin__posts-list-row1-name">
                                    {item.userId?.fullName}
                                    {item.isPinedPostFlag && (
                                        <span className="admin__posts-list-row1-pin">
                                            <IconPostModalPin />
                                        </span>
                                    )}
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
                            <button onClick={() => openModal(item)}>
                                <IconServicesAllPoint />
                            </button>
                        </div>
                        <div className="admin__posts-list-row2">
                            <PostSlick list={item?.filesName}>
                                {item?.filesName?.map((it) => (
                                    <div className="admin__posts-list-row2-img" onClick={()=>navigateToComments(item._id)}>
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
                    }
                </div>
            </div>
            {load && <Loader />}
            {/* <div ref={ref} />
            {load && <Loader />}
            <PublicationPostMyModal
                item={currnetItem}
                isOpen={myModalOpen}
                setIsOpen={setMyModalOpen}
                updateMark={updateMark}
                getAllPostReload={getAllPostReload}
                updateNotification={updateNotification}
                updatePin={updatePin}
            />
            <PublicationPostNeibModal
                item={currnetItem}
                isOpen={neibModalOpen}
                setIsOpen={setNeibModalOpen}
                updateMark={updateMark}
                updateNotification={updateNotification}
                toProfileInfo={toProfileInfo}
                hidePost={hidePost}
            /> */}
        </div>
        
    );
}