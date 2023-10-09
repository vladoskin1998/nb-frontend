import React, { useEffect, useState } from "react"
import { IconLeftChevrons } from "../../svg/IconChevrons"
import { useLocation, useNavigate } from "react-router-dom"
import { CategoryInterface } from "../../../types/services"
import $api from "../../../http"
import { ServicesAddCategories } from "./ServicesAddCategories"
import { AxiosResponse } from "axios"
import { SevicesAddSubCategories } from "./ServicesAddSubCategories"
import { SERVICES_EVENT } from "../../../types/enum"
import { useAppDispatch, useAppSelector } from "../../../utils/hooks"
import { Categories } from "../../../services/categories"
import { addCategorie } from "../../../reducer/categories"

interface CategorieResponse {
    fileName: string
    isVisiable: boolean
    name: string
    numberView: number
    _id: string
}

const categoryBody = {
    id: "",
    name: "",
    file: null as any,
    fileName: null,
}

export const ServicesAdd = () => {
    const { categories } = useAppSelector((s) => s.categoriesReducer)
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const { event, categorieId } = location.state

    const [listSubCategory, setListSubCategory] = useState<CategoryInterface[]>(
        []
    )
    const [categorie, setCategorie] = useState<CategoryInterface>(categoryBody)

    const validate = () => {
        if (!categorie.name || !(categorie.file || categorie.fileName)) {
            return true
        }

        for (let item of listSubCategory) {
            if (!item.name || !(item.file || item.fileName)) {
                return true
            }
        }

        return false
    }

    useEffect(() => {
        const effectBody = async () => {
            if (
                (SERVICES_EVENT.EDIT_SERVICES ||
                    SERVICES_EVENT.EDIT_SUB_SERVICES) &&
                categorieId
            ) {
                const currentCategorie = categories.find(
                    (item) => item._id === categorieId
                )

                if (currentCategorie) {
                    setCategorie({
                        id: currentCategorie?._id,
                        name: currentCategorie?.name,
                        file: null as any,
                        fileName: currentCategorie?.fileName,
                    })
                }

                const currentSubCategorie: AxiosResponse<Categories[]> =
                    await $api.get(
                        `categories/sub-categories?id=${categorieId}`
                    )

                setListSubCategory(
                    currentSubCategorie.data.map((item) => ({
                        id: item?._id,
                        name: item?.name,
                        file: null as any,
                        fileName: item?.fileName,
                    }))
                )
            }
        }

        effectBody()
    }, [event, categorieId])

    const addSubCategory = () => {
        setListSubCategory([...listSubCategory, categoryBody])
    }

    const uploadToServerCategorie = async () => {
        try {
            const formCatData = new FormData()

            let payload: { name: string; categorieId?: string } = {
                name: categorie.name,
            }

            if (event === SERVICES_EVENT.EDIT_SERVICES) {
                payload.categorieId = categorieId
            }

            formCatData.append("payload", JSON.stringify(payload))

            formCatData.append("file", categorie.file)

            const resCategorie: AxiosResponse<CategorieResponse> =
                await $api.post("categories/add-categorie", formCatData)

            if (event === SERVICES_EVENT.ADD_SERVICES) {
                dispatch(addCategorie(resCategorie.data))
            }

            return resCategorie
        } catch (error) {
            alert("addCategorie new" + error)
        }
    }

    const uploadToServerSubCategorie = async (categorieId: string) => {
        try {
            const results = []
            for (const item of listSubCategory) {
                const formSubData = new FormData()

                let payload: {
                    name: string
                    categorieId: string
                    subCategorieId?: string
                } = { name: item.name, categorieId }

                if (
                    event === SERVICES_EVENT.EDIT_SERVICES ||
                    event === SERVICES_EVENT.EDIT_SUB_SERVICES
                ) {
                    payload.subCategorieId = item.id
                }
                formSubData.append("payload", JSON.stringify(payload))
                formSubData.append("file", item.file)

                const res = await $api.post(
                    "categories/add-sub-categorie",
                    formSubData
                )
                results.push(res)
            }
        } catch (error) {
            alert("addCategorie new" + error)
        }
    }

    const uploadToServer = async () => {
        try {
            const res = await uploadToServerCategorie()
            if (res) {
                uploadToServerSubCategorie(res.data._id)
            }

            navigate("/admin/services")
        } catch (error) {}
    }

    return (
        <>
            <div className="ui-admin__subheader">
                <div className="ui-admin__subheader-title">
                    <div
                        className="services__exit"
                        onClick={() => navigate(-1)}
                    >
                        <button>
                            <IconLeftChevrons />
                        </button>
                        <h6>Add Service Category</h6>
                    </div>
                </div>
            </div>
            <div className="services__add">
                {event !== SERVICES_EVENT.EDIT_SUB_SERVICES ? (
                    <ServicesAddCategories
                        categorie={categorie}
                        setCategorie={setCategorie}
                    />
                ) : (
                    <></>
                )}

                <SevicesAddSubCategories
                    listSubCategory={listSubCategory}
                    setListSubCategory={setListSubCategory}
                />
                <button
                    onClick={addSubCategory}
                    className="services__add-button services__add-button--white services__add-button-1"
                >
                    Add SubCategory
                </button>
                <button
                    className={`services__add-button services__add-button-2 
                             ${
                                 validate()
                                     ? "services__add-button--disabled"
                                     : ""
                             }
                    `}
                    onClick={
                        !validate()
                            ? uploadToServer
                            : () =>
                                  alert(
                                      "Fill in all fields, add all images and names of categoties"
                                  )
                    }
                >
                    Publish
                </button>
            </div>
        </>
    )
}
