import { useEffect, useState } from "react"
import ServicesItemView from "./ServicesItemView"
import { useLocation, useNavigate } from "react-router-dom"
import { useAppDispatch } from "../../../utils/hooks"
import {
    deleteSubCategories,
    visiableSubCategories,
} from "../../../services/categories"
import { SERVICES_EVENT } from "../../../types/enum"
import { ServicesListItemViewModal } from "./ServicesListItemViewModal"
import { OptionsType } from "../../../types/types"
import { AutocompleteSearch } from "../../ui/AutocompleteSearch"
import { ServiceHttp } from "../../../http/service-http"

export const ServicesListSubCategorieItemModule = ({
    _id,
    name,
    numberView,
    nextListLink,
    isVisiable,
    categorieId,
    handlerAddServices,
}: {
    _id: string
    name: string
    numberView: number
    nextListLink: string
    isVisiable: boolean
    categorieId: string
    handlerAddServices: () => void
}) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [isOpen, setIsOpen] = useState(false)
    const [isTougle, setIsTougle] = useState(isVisiable)
    const [isOpenMove, setIsOpenMove] = useState(false)

    const [optiosService, setOptiosService] = useState<OptionsType>([])
    const [servicesValue, setServicesValue] = useState<OptionsType>([])

    const onChangeTougle = () => {
        setIsTougle((s) => !s)
    }

    const handlerEditServices = () => {
        navigate("/admin/services/services-add", {
            state: {
                event: SERVICES_EVENT.EDIT_SERVICES,
                categorieId: categorieId,
            },
        })
    }

    const handlerVisiable = () => {
        dispatch(visiableSubCategories({ id: _id, isVisiable: isTougle }))
    }

    const handlerDeleteItem = () => {
        dispatch(deleteSubCategories({ id: _id }))
        setIsOpen(false)
    }

    useEffect(() => {
        const effectBody = async () => {
            const option = (await ServiceHttp.getAllService()).map((item) => ({
                _id: item._id,
                title: item.name,
            }))
            setOptiosService(option)
            const category = option.find((item) => item._id === categorieId)

            if (categorieId && category) {
                setServicesValue([category])
            }
        }
        effectBody()
    }, [])

    useEffect(() => {
        const bodyEffect = async () => {
            if (servicesValue.length) {
                setIsOpenMove(false)
                setIsOpen(false)
            }
        }
        bodyEffect()
        
    }, [servicesValue])

    const handlerMove = async (value: OptionsType) => {
        setServicesValue(value)
        if (value.length) {
            const category = value?.[0]?._id.toString() 
            if (category !== categorieId) {
                console.log(category, "!==", categorieId);
                await ServiceHttp.moveSubService({
                    newCategoryId: category,
                    subCategiryId: _id,
                })
            }
        }
    }

    return (
        <>
            <ServicesItemView
                numberView={numberView}
                name={name}
                nextListLink={nextListLink}
                setIsOpen={(b: boolean) => setIsOpen(b)}
            />
            {isOpen && (
                <ServicesListItemViewModal
                    name={name}
                    isTougle={isTougle}
                    onChangeTougle={onChangeTougle}
                    setIsOpen={() => setIsOpen(isOpenMove)}
                    handlerAddServices={handlerAddServices}
                    handlerEditServices={handlerEditServices}
                    handlerMoveServices={() => setIsOpenMove((s) => !s)}
                    handlerVisiable={handlerVisiable}
                    handlerDeleteItem={handlerDeleteItem}
                >
                    {isOpenMove && (
                        <AutocompleteSearch
                            isLimit={-1}
                            options={optiosService}
                            value={servicesValue}
                            setValue={handlerMove}
                        />
                    )}
                </ServicesListItemViewModal>
            )}
        </>
    )
}
