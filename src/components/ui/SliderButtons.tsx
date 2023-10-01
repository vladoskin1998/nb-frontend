export const SliderButtons = (
    {
        left,
        right,
        value,
        changeValue
    }:{
        left: string,
        right: string,
        value:boolean,
        changeValue: (s:boolean) => void
    }
) => {
    return (
        <div className="slider__button">
            <button
                className={`slider__button-but ${!value && "slider__button--pas"}`}
                onClick={() => changeValue(true)}
            >
                {left}
            </button>
            <button
                className={`slider__button-but ${value && "slider__button--pas"}`}
                onClick={() => changeValue(false)}
            >
                {right}
            </button>
            <div
                className={`slider__button-border ${
                    value ? "slider__button-border--l" : "slider__button-border--r"
                }`}
            />
        </div>
    )
}
