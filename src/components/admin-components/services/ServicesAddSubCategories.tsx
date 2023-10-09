import React, { useState } from "react"

import { FileButton } from "../../ui/FileButton"
import { CategoryInterface } from "../../../types/services"
import { IconAdminClose } from "../../svg/IconAdminHeader"
import { baseURL } from "../../../utils/config"

export interface SubCategoryInterface {
    name: string
    file: File
}

export const SevicesAddSubCategories = ({
    listSubCategory,
    setListSubCategory,
}: {
    listSubCategory: CategoryInterface[]
    setListSubCategory: (s: CategoryInterface[]) => void
}) => {
    const changeItemSubName = ({
        index,
        name,
    }: {
        index: number
        name: string
    }) => {
        setListSubCategory(
            listSubCategory.map((item, id) =>
                id === index ? { ...item, name } : item
            )
        )
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
                id === index ? { ...item, file, fileName: "" } : item
            )
        )
    }

    return (
        <>
            {listSubCategory.map((item, index) => {
                return (
                    <div className="services__add-item" key={index}>
                        <input
                            type="text"
                            placeholder="Sub Category Name"
                            className="services__add-input"
                            value={item.name}
                            onChange={(e) =>
                                changeItemSubName({
                                    index,
                                    name: e.target.value,
                                })
                            }
                        />
                        <button
                            className="services__add-remove"
                            onClick={() =>
                                changeItemSubFile({ index, file: null as any })
                            }
                        >
                            <IconAdminClose />
                        </button>
                        {item?.fileName ? (
                            <img
                                src={`${baseURL}/uploads/categories/${item.fileName}`}
                                alt=""
                                className="services__add-linkimage"
                            />
                        ) : (
                            <FileButton
                                getFile={(file: File) =>
                                    changeItemSubFile({ index, file })
                                }
                                image={item.file}
                            />
                        )}
                    </div>
                )
            })}
        </>
    )
}
