import React, { useEffect, useState } from "react"
import { ProfoleIdentityView } from "./ProfoleIdentityView"
import $api from "../../../http"
import { useAppDispatch, useAppSelector } from "../../../utils/hooks"
import { useNavigate } from "react-router-dom"
import {
    InitialStateUserWithIdInterface,
    setLoader,
    setValueProfileReducer,
} from "../../../reducer/profile"
import { profilePutIdentity } from "../../../services/profile"
import { OptionsItemType, OptionsType } from "../../../types/types"
import { toOneKind } from "../../../utils/titles"
import { QUALITYENUM } from "../../../types/enum"

export const ProfoleIdentityModule = ({
    quality,
    nextRoute,
    isLimit = -10,
}: {
    quality: QUALITYENUM
    nextRoute: QUALITYENUM | string
    isLimit?: number
}) => {
    const { skills, nationality, profession, interests } = useAppSelector(
        (s) => s.profileReducer
    )

    const [value, setValue] = useState<OptionsType>([])
    const [inputValue, setInputValue] = useState("")
    const [optionst, setOptionst] = useState([])
    const [popularOptions, setPopularOptions] = useState<OptionsType>([])
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { _id } = useAppSelector((s) => s.profileReducer)

    // useEffect(() => {
    //     setValue(s => s.slice(-5))
    // }, [value])

    useEffect(() => {
        const timeOutId = setTimeout(() => {
            $api.post(`identity/${toOneKind(quality)}`, {
                searchValue: inputValue,
            })
                .then((res) => setOptionst(res.data))
                .catch((e) => alert(e + "error nationality country"))
        }, 1000)
        return () => clearTimeout(timeOutId)
    }, [inputValue, quality])

    useEffect(() => {
        switch (quality) {
            case QUALITYENUM.SKILLS:
                setValue(skills)
                break
            case QUALITYENUM.PROFESSION:
                setValue(profession)
                break
            case QUALITYENUM.INTERESTS:
                setValue(interests)
                break
            case QUALITYENUM.NATIONALITY:
                setValue(nationality)
                break
            default:
                break
        }

        $api.get(`identity/${toOneKind(quality)}-popular`)
            .then((res) => setPopularOptions(res.data))
            .catch((e) => alert(e + "error"))
    }, [quality])

    const handlerContinue = async () => {
        try {
            dispatch(setLoader(true))

            const res = await profilePutIdentity({
                value,
                _id,
                quality,
            })

            dispatch(setValueProfileReducer(res))
            setValue([])
            setPopularOptions([])
            dispatch(setLoader(false))
            navigate(`/profile/${toOneKind(nextRoute)}`)
        } catch (error) {
            dispatch(setLoader(false))
            alert(error + "about text error")
        }
    }

    const handlerPopularList = (l: OptionsItemType) => {
        setValue((s) => [...s, l].slice(isLimit))
    }

    return (
        <ProfoleIdentityView
            quality={quality}
            isLimit={isLimit}
            value={value}
            optionst={optionst}
            setValue={setValue}
            handlerContinue={handlerContinue}
            inputValue={inputValue}
            setInputValue={setInputValue}
            popularOptions={popularOptions}
            clickPopularList={handlerPopularList}
        />
    )
}
