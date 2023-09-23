import ReactCodeInput, { ReactCodeInputProps } from "react-code-input"

const props: ReactCodeInputProps = {
    inputStyle: {
        fontFamily: "Roboto",
        margin: "0px",
        MozAppearance: "textfield",
        width: "56px",
        borderRadius: "12px",
        fontSize: "48px",
        height: "64px",
        paddingLeft: "0px",
        fontWeight: 600,
        backgroundColor: "#fff",
        textAlign: "center",
    },
    inputStyleInvalid: {},
    name: "codeInput",
    inputMode: "email",
}

export const CodeInput = ({ change }: { change: (s: string) => void }) => {
    return (
        <div className="ui-code-input">
            <ReactCodeInput
                onChange={change}
                type="number"
                fields={4}
                {...props}
            />
        </div>
    )
}

export const DateInput = ({ change }: { change: (s: string) => void }) => {
    return (
        <div className="ui-date-input">
            <ReactCodeInput
                onChange={change}
                type="number"
                fields={8}
                name="codeInput"
                inputMode="numeric"
                placeholder={"0"}
            />
        </div>
    )
}
