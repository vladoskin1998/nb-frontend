import { ReactElement, useEffect, useState } from "react"

export const InputMain = ({
    value,
    setValue,
    placeholder='',
    errorMessage='',
    pattern='',
    isValidated,
    setIsValidated=()=>{},
}: {
    value: string
    setValue: (s: string) => void
    placeholder?: string | ReactElement
    errorMessage?: string
    pattern?: string | RegExp
    isValidated?: boolean
    setIsValidated?: (s: boolean) => void
}) => {
    const [isValid, setIsValid] = useState(true)
    const [isShowPlaceholder, setIsShowPlaceholder] = useState(true)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value
        setIsValidated(new RegExp(pattern).test(newValue))
        setValue(newValue)
    }

    const handleBlur = () => {
        setIsValid(new RegExp(pattern).test(value))
    }

    useEffect(() => {
        if(value ){
            setIsShowPlaceholder(false)
        }
        else {
            setIsShowPlaceholder(true)
        }
    }, [value])

    return (
        <div className={"ui-input__main"}>
            <input
                type="text"
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
           
            />
              {isShowPlaceholder && (
                <span className="ui-input__main-placeholder">
                    {
                      placeholder
                    }
                </span>
            )}
            {!(isValid && isValidated)  && (
                <span className="ui-input__main--invalid">{errorMessage}</span>
            )}
        </div>
    )
}
