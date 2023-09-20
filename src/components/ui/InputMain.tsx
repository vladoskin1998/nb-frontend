import { useState } from "react"

export const InputMain = ({
    value,
    setValue,
    placeholder,
    errorMessage,
    pattern,
    isValidated,
    setIsValidated,
}: {
    value: string
    setValue: (s: string) => void
    placeholder: string
    errorMessage: string
    pattern: string | RegExp
    isValidated: boolean
    setIsValidated: (s: boolean) => void
}) => {
    const [isValid, setIsValid] = useState(true)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value
        setIsValidated(new RegExp(pattern).test(newValue))
        setValue(newValue)
    }

    const handleBlur = () => {
        setIsValid(new RegExp(pattern).test(value))
    }

    return (
        <div className={"ui-input__main"}>
            <input
                type="text"
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                onBlur={handleBlur}
            />
            {!isValid && (
                <span className="ui-input__main--invalid">{errorMessage}</span>
            )}
        </div>
    )
}
