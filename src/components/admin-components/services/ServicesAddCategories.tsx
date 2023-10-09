import React, { useState } from "react"
import { FileButton } from "../../ui/FileButton"
import $api from "../../../http"
import { CategoryInterface } from "../../../types/services"
import { IconAdminClose } from "../../svg/IconAdminHeader"
import { baseURL } from "../../../utils/config"

export const ServicesAddCategories = ({
    categorie,
    setCategorie,
}: {
    categorie: CategoryInterface
    setCategorie: (s: CategoryInterface) => void
}) => {

    const handlerChangeNameCategory = (name: string) => {
        setCategorie({
            ...categorie,
            name,
        })
    }

    const handlerChangeFileCategory = (file: File) => {
        setCategorie({ ...categorie, file, fileName:"" })
    }

    return (
        <div className="services__add-item">
            <input
                type="text"
                placeholder="Category Name"
                className="services__add-input"
                value={categorie.name}
                onChange={(e) => handlerChangeNameCategory(e.target.value)}
            />
            <button className="services__add-remove"
                onClick={() => handlerChangeFileCategory(null as any)}
            ><IconAdminClose /></button>
            {categorie.fileName ? (
                <img src={`${baseURL}/uploads/categories/${categorie.fileName}`} alt="" className="services__add-linkimage" />
            ) : (
                <FileButton
                    getFile={(file: File) => handlerChangeFileCategory(file)}
                    image={categorie?.file}
                />
            )}
        </div>
    )
}
