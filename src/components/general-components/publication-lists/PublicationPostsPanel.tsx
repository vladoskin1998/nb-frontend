import React from "react"
import { IconComment } from "../../svg/IconFavor"
import { IconPostsLike, IconPostsRepost } from "../../svg/IconPosts"
import { IconProfileInfoBookmark } from "../../svg/IconProfileInfo"

export const PublicationPostsPanel = ({ postId }: { postId: string }) => {

    

    return (
        <>
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
            <div>
                <IconProfileInfoBookmark />
            </div>
        </>
    )
}
