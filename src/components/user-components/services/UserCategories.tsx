import React, { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../utils/hooks"
import { baseURL } from "../../../utils/config"
import { InputSearch } from "../../ui/InputSearch"
import { UserHeaderMain } from "../header/UserHeaderMain"
import { UserHeaderUserChatList } from "../header/UserHeaderChat"
import { SERVICES_EVENT } from "../../../types/enum"
import { allSubCategories } from "../../../services/categories"
import { useNavigate, useSearchParams } from "react-router-dom"

export const UserCategories = ({ event }: { event: SERVICES_EVENT }) => {
    const { categories, subCategories } = useAppSelector(
        (s) => s.categoriesReducer
    )
    const navigate = useNavigate()
    const [searsh, setSearch] = useState("")
    const [categorieId, setCategorieId] = useState("")
    const dispatch = useAppDispatch()
    const [searchParams] = useSearchParams()

    useEffect(() => {
        if (event === SERVICES_EVENT.SUB_LIST) {
            const id = searchParams.get("id")
            setCategorieId(id as string)
            dispatch(allSubCategories({ id: id as string }))
        }
    }, [event])

    const toNextLink = ({id}:{id:string}) => {
        if( event === SERVICES_EVENT.LIST){
            navigate(`/user/service/user-sub-categories?id=${id}`)
        }
        else if(event === SERVICES_EVENT.SUB_LIST){
            const categorieName = categories.find(item => item._id === categorieId)?.name
            navigate(`/user/service/user-publish-service-list?id=${id}`)
        }
    }

   
    return (
        <>
            <UserHeaderUserChatList headerTitle={event === SERVICES_EVENT.LIST ? "Choose Category" : "Choose Subcategory"} />
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
                {(event === SERVICES_EVENT.LIST
                    ? categories
                    : subCategories
                ).filter(item => item.name.includes(searsh)).map((item) => (
                    <div className="user__services-category-item-body" onClick={() => toNextLink({
                            id:item._id,                       
                        })}>
                        <div className="user__services-category-item">
                            <div className="user__services-category-item-img">
                                <img
                                    src={`${baseURL}/uploads/categories/${item.fileName}`}
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
