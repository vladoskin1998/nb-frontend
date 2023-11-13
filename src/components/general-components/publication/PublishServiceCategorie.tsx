import React, { useEffect, useState } from "react"
import { AutocompleteSearch } from "../../ui/AutocompleteSearch"
import { ServiceHttp } from "../../../http/service-http"
import { OptionsType } from "../../../types/types"
import { IconActiveList } from "../../svg/IconTicket"
import { useSearchParams } from "react-router-dom"

export const PublishServiceCategorie = ({
    servicesValue,
    setServicesValue,
    subServicesValue,
    setSubServicesValue,
}: {
    servicesValue: OptionsType
    setServicesValue: (s: OptionsType) => void
    subServicesValue: OptionsType
    setSubServicesValue: (s: OptionsType) => void
}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [optiosService, setOptiosService] = useState<OptionsType>([])
    const [optiosSubService, setOptiossubService] = useState<OptionsType>([])
    const [searchParams] = useSearchParams()

    useEffect(() => {
        const effectBody = async () => {
            const option = (await ServiceHttp.getAllService()).map((item) => ({
                _id: item._id,
                title: item.name,
            }))
            setOptiosService(option)
            const categoryId = searchParams.get("categoryId")
            const category = option.find(
                (item) => item._id === categoryId
            )
            
            if (categoryId && category) {
                setServicesValue([category])
            }
        }
        effectBody()
    }, [])

    useEffect(() => {
        const effectBody = async () => {
            setSubServicesValue([])
            const option = (
                await ServiceHttp.getAllSubService({
                    id: servicesValue?.[0]?._id.toString(),
                })
            ).map((item) => ({
                _id: item._id,
                title: item.name,
            }))
            setOptiossubService(option)         
        }
        if (optiosService.length && servicesValue.length) {
            effectBody()
        }
    }, [servicesValue])

    useEffect(() => {
        const subCategoryId = searchParams.get("subCategoryId")
        const subCategory = optiosSubService.find(
            (item) => item._id === subCategoryId
        )
        if (subCategoryId && subCategory) {
            setSubServicesValue([subCategory])
            setIsOpen(true)
        }
    }, [optiosService, optiosSubService])

    return (
        <>
            {isOpen ? (
                <>
                    <AutocompleteSearch
                        isLimit={-1}
                        options={optiosService}
                        value={servicesValue}
                        setValue={setServicesValue}
                    />
                    <div className="publish__service-select-2" />
                        <AutocompleteSearch
                            isLimit={-1}
                            options={optiosSubService}
                            value={subServicesValue}
                            setValue={setSubServicesValue}
                        />
                    
                </>
            ) : (
                <button
                    className="publish__location-button"
                    onClick={() => setIsOpen((s) => !s)}
                >
                    <IconActiveList />
                    Select Category
                </button>
            )}
        </>
    )
}
