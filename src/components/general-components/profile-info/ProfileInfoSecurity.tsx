import { useState } from "react"
import { IosTougle } from "../../ui/IosTougle"
import { InputMain } from "../../ui/InputMain"
import {
    emailPattern,
    isPasswordPattern,
    phonePattern,
} from "../../../utils/patterns"
import { InputPassword } from "../../ui/InputPassword"
import { userChangePassword, userTextInfo } from "../../../services/user"
import { useAppDispatch, useAppSelector } from "../../../utils/hooks"
import { setLoader } from "../../../reducer/profile"
import { setValueUserReducer } from "../../../reducer/users"

export const ProfileInfoSecurity = () => {
    const { _id } = useAppSelector((s) => s.userReducer)

    const initLogin = useAppSelector((s) => s.userReducer.email)
    const initPhone = useAppSelector((s) => s.userReducer.phone)
    const dispatch = useAppDispatch()

    const [isTougle, setIsTougle] = useState(true)
    const [login, setLogin] = useState(initLogin)
    const [phone, setPhone] = useState(initPhone || "")
    const [password, setPassword] = useState("")
    const [newPassword1, setNewPassword1] = useState("")
    const [newPassword2, setNewPassword2] = useState("")
    const [validation, setValidation] = useState({
        login: new RegExp(emailPattern).test(login),
        phone: new RegExp(phonePattern).test(login),
        password: new RegExp(isPasswordPattern).test(password),
        newPassword1: new RegExp(isPasswordPattern).test(password),
        newPassword2: new RegExp(isPasswordPattern).test(password),
    })

    const uploadToServer = async () => {
        try {
            dispatch(setLoader(true))

            const res = await userTextInfo({
                email: login || initLogin,
                phone: phone || initPhone,
                _id,
            })

            if (
                password &&
                newPassword1 &&
                newPassword2 &&
                newPassword2 === newPassword1
            ) {
                await userChangePassword({
                    password,
                    newPassword1,
                    newPassword2,
                    _id,
                })
            }

            dispatch(setValueUserReducer(res))

            dispatch(setLoader(false))
            alert("SuccessFul Update")

        } catch (error: any & { message?: string }) {
            dispatch(setLoader(false))
            alert("upload file is faild" + error?.message)
        }
    }

    return (
        <>
            <h5
                className="profileinfo__edit-title "
                style={{ marginTop: "20px" }}
            >
                Configure Session
            </h5>
            <div className="profileinfo__security-remember">
                <p>Remember me</p>
                <IosTougle
                    isTougle={isTougle}
                    setIsTougle={() => setIsTougle(!isTougle)}
                />
            </div>
            <h5 className="profileinfo__edit-title ">Email</h5>
            <InputMain
                value={login}
                setValue={setLogin}
                placeholder={"Email"}
                errorMessage={"Invalid login example@example.example"}
                pattern={emailPattern}
                isValidated={validation.login}
                setIsValidated={(s: boolean) =>
                    setValidation({ ...validation, login: s })
                }
            />
            <h5 className="profileinfo__edit-title ">Phone</h5>
            <InputMain
                value={phone}
                setValue={setPhone}
                placeholder={"Phone"}
                errorMessage={"Invalid phone +380982138838"}
                pattern={phonePattern}
                isValidated={validation.phone}
                setIsValidated={(s: boolean) =>
                    setValidation({ ...validation, phone: s })
                }
            />
            <h5 className="profileinfo__edit-title ">Change Password</h5>
            <div className="profileinfo__edit-body-items">
                <InputPassword
                    password={password}
                    setPassword={setPassword}
                    errorMessage={
                        "Invalid password, min 8, numbers and letters"
                    }
                    pattern={isPasswordPattern}
                    isValidated={validation.password}
                    setIsValidated={(s: boolean) =>
                        setValidation({ ...validation, password: s })
                    }
                />
                <InputPassword
                    password={newPassword1}
                    setPassword={setNewPassword1}
                    errorMessage={
                        "Invalid password, min 8, numbers and letters"
                    }
                    pattern={isPasswordPattern}
                    isValidated={validation.newPassword1}
                    placeholder="New Password"
                    setIsValidated={(s: boolean) =>
                        setValidation({ ...validation, newPassword1: s })
                    }
                />
                <InputPassword
                    password={newPassword2}
                    setPassword={setNewPassword2}
                    errorMessage={
                        "Invalid password, min 8, numbers and letters"
                    }
                    pattern={isPasswordPattern}
                    placeholder="Confirm New Password"
                    isValidated={validation.newPassword2}
                    setIsValidated={(s: boolean) =>
                        setValidation({ ...validation, newPassword2: s })
                    }
                />
            </div>
            <button
                className={`profile__method-btlater`}
                onClick={uploadToServer}
            >
                Update Profile
            </button>
        </>
    )
}
