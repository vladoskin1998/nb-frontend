import React, { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../utils/hooks"
import { baseURL } from "../../../utils/config"
import { InputSearch } from "../../ui/InputSearch"
import { UserHeaderMain } from "../header/UserHeaderMain"
import { UserHeaderUserChatList } from "../header/UserHeaderChat"
import { SERVICES_EVENT } from "../../../types/enum"
import { allSubCategories } from "../../../services/categories"
import { useNavigate, useSearchParams } from "react-router-dom"

export const UserActivitiesCategory = () => {
    const { activities } = useAppSelector(
        (s) => s.activitiesReducer
    )
    const navigate = useNavigate()
    const [searsh, setSearch] = useState("")


    const toNextLink = ({id}:{id:string}) => {
      
            navigate(`/user/activities/user-publish-activities-list?id=${id}`)
        
    }

   
    return (
        <>
            <UserHeaderUserChatList headerTitle={"Choose Activities"} />
            <div className="user__newsfeed-search">
                <InputSearch
                    placeholder={
                        <>
                            Search<span> NeightborHarbor</span>
                        </>
                    }
                    value={searsh}
                    changeValue={setSearch}
                />
            </div>
            <div className="user__category">
                {activities.filter(item => item.name.includes(searsh)).map((item) => (
                    <div className="user__services-category-item-body" onClick={() => toNextLink({
                            id:item._id,                       
                        })}>
                        <div className="user__services-category-item">
                            <div className="user__services-category-item-img">
                                <img
                                    src={`${baseURL}/uploads/activities/${item.fileName}`}
                                    alt=""
                                />
                            </div>
                            <div className="user__services-category-item-text">
                                <b>{item.name}</b>{" "}
                                <span>{item.numberView}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
