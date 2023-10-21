import React, { useEffect, useRef, useState } from "react"
import { useInView } from "react-intersection-observer"

import { InputSearch } from "../../ui/InputSearch"
import { IconServicesAllPoint } from "../../svg/IconServicesAll"
import { PostUserInterface } from "../../../types/types"
import { PublishPostHttp } from "../../../http/publish-post-http"
import { baseURL } from "../../../utils/config"
import moment from "moment"
import { IconPostsLike, IconPostsRepost } from "../../svg/IconPosts"
import { IconComment } from "../../svg/IconFavor"
import { IconProfileInfoBookmark } from "../../svg/IconProfileInfo"
import { PostSlick } from "../../ui/PostSlick"

export const PostsAll = () => {
    const [searsh, setSearch] = useState("")
    const [allPageNumber, setAllPageNumber] = useState(1)
    const [pageNumber, setPageNumber] = useState(1)
    const [posts, setPosts] = useState<PostUserInterface[]>([])
    const { ref, inView } = useInView({
        threshold: 0,
    })

    useEffect(() => {
        const effectBody = async () => {
            if (inView && allPageNumber >= pageNumber) {
                const res = await PublishPostHttp.getPost({
                    pageNumber,
                })
                console.log(res)
                setPosts((s) => [...s, ...res.posts])
                setAllPageNumber(res.allPageNumber)
                setPageNumber((s) => s + 1)
            }
        }

        effectBody()
    }, [inView])

    return (
        <>
            <InputSearch
                placeholder={
                    <>
                        Search<span> Post</span>
                    </>
                }
                value={searsh}
                changeValue={setSearch}
            />
            <div className="admin__posts-list">
                {posts.map((item) => (
                    <div className="admin__posts-list-item">
                        <div className="admin__posts-list-row1">
                            <div className="admin__posts-list-row1-img">
                                <img
                                    src={`${baseURL}/uploads/avatar/${item.userIdentityId.avatarFileName}`}
                                    alt=""
                                />
                            </div>
                            <div>
                                <div className="admin__posts-list-row1-name">
                                    {item.userId.fullName}
                                </div>
                                <div>
                                    <span className="admin__posts-list-row1-text">
                                        {moment(item.createdPostDate).format(
                                            "DD MMM YYYY HH:mm"
                                        )}
                                    </span>{" "}
                                    |{" "}
                                    <span className="admin__posts-list-row1-text admin__posts-list-row1-textunder">
                                        {item.addressLocation}
                                    </span>
                                </div>
                            </div>
                            <button>
                                <IconServicesAllPoint />
                            </button>
                        </div>
                        <div className="admin__posts-list-row2">
                            <PostSlick list ={item.filesName}>
                                {item.filesName.map((it) => (
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
                        <div className="admin__posts-list-row4">
                            <button>
                                <IconPostsLike />
                                <span>0</span>
                            </button>
                            <button>
                                <IconComment />
                                <span>0</span>
                            </button>
                            <button>
                                <IconPostsRepost />
                                <span>0</span>
                            </button>
                            <button>
                                <IconProfileInfoBookmark />
                                <span>0</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div ref={ref} />
        </>
    )
}
