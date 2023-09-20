import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { v1 as uuidv4 } from "uuid"
import { useSearchParams } from "react-router-dom"
import { useAppDispatch } from "../../../utils/hooks"
import { addCategories } from "../../../services/categories"
import ServicesAddView from "./ServicesAddView"
import { CategoryInterface } from "../../../types/services"


const categoryBody = {
    id: "",
    name: "",
    file: null as any,
}

const ServicesAddModule = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [category, setCategory] = useState({ ...categoryBody, id: uuidv4() })
    const [listSubCategory, setListSubCategory] = useState<CategoryInterface[]>(
        []
    )

    const [searchParams] = useSearchParams()

    const [idCategories, setIdCategorise] = useState("")

    const addSubCategory = () => {
        setListSubCategory((s) => [...s, { ...categoryBody, id: uuidv4() }])
    }

    const exit = () => navigate(-1)

    const handlerChangeNameCategory = (name: string) => {
        setCategory((s) => ({
            ...s,
            name,
        }))
    }

    const handlerChangeFileCategory = (file: File) => {
        setCategory((s) => ({ ...s, file }))
    }

    const changeItemSubName = ({
        index,
        name,
    }: {
        index: number
        name: string
    }) => {
        setListSubCategory((s) => {
            return s.map((item, id) =>
                id === index ? { ...item, name } : item
            )
        })
    }

    const changeItemSubFile = ({
        index,
        file,
    }: {
        index: number
        file: File
    }) => {
        setListSubCategory(
            listSubCategory.map((item, id) =>
                id === index ? { ...item, file } : item
            )
        )
    }

    // Поиск айди для определения,
    // нужно ли создать новую категорию,
    // или добавить в уже существующую новую.
    useEffect(() => {
        const id = searchParams.get("id")
        setIdCategorise(id || "")
        if (id) {
            addSubCategory()
        }
    }, [])

    const publishCategory = async () => {
        try {
            const formData = new FormData()

            //добавить разширения в имени файла
            for (let i = 0; i < listSubCategory.length; i++) {
                formData.append(
                    "files",
                    listSubCategory[i].file,
                    listSubCategory[i].id
                )
            }

            // Также формируется FormData
            // для отправки на создание новой категории
            // или добавление новой подкатегории к существующей.
            const payload = {
                category: !idCategories
                    ? {
                          fileName: `${category.id}.${
                              category?.file?.type.split("/")[1]
                          }`,
                          name: category.name,
                      }
                    : { id: idCategories },
                subCategory: {
                    listSubCategory: listSubCategory.map((it) => ({
                        fileName: `${it.id}.${it?.file?.type.split("/")[1]}`,
                        name: it.name,
                    })),
                },
            }

            formData.append("payload", JSON.stringify(payload))
            if (idCategories) {
                dispatch(
                    addCategories({
                        link: "categories/add-sub-categories",
                        formData,
                    })
                )
                navigate(`/admin/services/servicessub?id=${idCategories}`)
            } else {
                formData.append("files", category.file, category.id)
                dispatch(
                    addCategories({
                        link: "categories/add-categories",
                        formData,
                    })
                )
                navigate("/admin/services")
            }
        } catch (error) {
            throw error
        }
    }


    return (
        <ServicesAddView
            exit={exit}
            handlerChangeNameCategory={handlerChangeNameCategory}
            handlerChangeFileCategory={handlerChangeFileCategory}
            idCategories={idCategories}
            category={category}
            listSubCategory={listSubCategory}
            addSubCategory={addSubCategory}
            publishCategory={publishCategory}
            changeItemSubName={changeItemSubName}
            changeItemSubFile={changeItemSubFile}
        />
    )
}

export default ServicesAddModule
