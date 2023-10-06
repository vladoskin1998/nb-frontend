import { useRef, useState } from "react"
import { baseURL } from "../../../utils/config"
import { useAppDispatch, useAppSelector } from "../../../utils/hooks"
import { IconProfileInfoPen } from "../../svg/IconProfileInfo"
import { setLoader, setValueProfileReducer } from "../../../reducer/profile"
import { profileTextInfo, profileUploadAvatar } from "../../../services/profile"
import { TextareaAutosize } from "@mui/material"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import dayjs, { Dayjs } from "dayjs"
import { ProfileCityBirthInput } from "../profile/ProfileBirthCityInput"
import { ProfileEducationList } from "../profile/ProfileEducationList"
import { ProfileSexOrintationList } from "../profile/ProfileSexOrintationList"
import { ProfileSexList } from "../profile/ProfileSexList"
import { AutocompleteSearch } from "../../ui/AutocompleteSearch"
import { FAMILYSTATUS } from "../../../types/enum"
import { OptionsType } from "../../../types/types"
import { userTextInfo } from "../../../services/user"
import { setValueUserReducer } from "../../../reducer/users"

const maxLength = 250
const listFamilyStatus = Object.values(FAMILYSTATUS).map((item, index) => ({
    _id: index,
    title: item,
}))

export const ProfileInfoEdit = () => {
    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const {
        avatarFileName,
        aboutMe,
        dateBirth,
        cityBirth,
        education,
        studySchool,
        sex,
        orientation,
        familyStatus,
    } = useAppSelector((s) => s.profileReducer)
    const { email, fullName, _id } = useAppSelector((s) => s.userReducer)
    const [avatar, setAvatar] = useState<File | null>(null)
    const dispatch = useAppDispatch()

    const initAvatar = avatarFileName
        ? `${baseURL}/uploads/avatar/${avatarFileName}`
        : ""
    const [photoUrl, setPhotoUrl] = useState<string>(initAvatar)
    const [fullNameLocal, setFullNameLocal] = useState(fullName)
    const [aboutMeLocal, setAboutMeLocal] = useState(aboutMe)
    const [dateBirthLocal, setDateBirthLocal] = useState<Dayjs | null>(
        dayjs(dateBirth)
    )
    const [cityBirthLocal, setCityBirthLocal] = useState(cityBirth)
    const [educationLocal, setEducationLocal] = useState(education)
    const [studySchoolLocal, setStudySchoolLocal] = useState(studySchool)

    const [sexLocal, setSexLocal] = useState(sex)
    const [orientationLocal, setOrientationLocal] = useState(orientation)

    const [familyStatusLocal, setFamilyStatusLocal] = useState<OptionsType>([
        {
            _id: listFamilyStatus.findIndex(
                (item) => item.title === familyStatus
            ),
            title: familyStatus,
        },
    ])

    console.log();
    

    const uploadToServer = async () => {
        try {
            const formData = new FormData()
            const payload = { _id }

            formData.append("payload", JSON.stringify(payload))
            if (avatar) {
                formData.append("file", avatar)
            }

            if(dateBirthLocal && dateBirthLocal?.year() < 1900){
                alert("Date must have value more 1900")
            }

            dispatch(setLoader(true))

            if(avatar){
                 const resAvatat = await profileUploadAvatar(formData)
                dispatch(setValueProfileReducer(resAvatat))
            }
           

            const resTextInfo = await profileTextInfo({
                aboutMe: aboutMeLocal || aboutMe,
                dateBirth: dateBirthLocal?.toDate() || dateBirth,
                cityBirth: cityBirthLocal || cityBirth,
                education: educationLocal || education,
                studySchool: studySchoolLocal || studySchool,
                sex: sexLocal || sex,
                orientation: orientationLocal || orientation,
                familyStatus: familyStatusLocal[0]?.title || familyStatus,
                _id,
            })
            const resFullName = await userTextInfo({
                fullName: fullNameLocal,
                _id,
            })

           
            dispatch(setValueProfileReducer(resTextInfo))
            dispatch(setValueUserReducer(resFullName))
            dispatch(setLoader(false))

            alert("SuccessFul Update")
        } catch (error) {
            dispatch(setLoader(false))
            alert("upload file is faild" + error)
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newText = event.target.value
        if (newText.length <= maxLength) {
            setAboutMeLocal(newText)
        }
    }

    const handlerFamilyStatusLocal = (l: OptionsType) => {
        setFamilyStatusLocal(l)
    }

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null
        setAvatar(file)
        if (file) {
            const url = URL.createObjectURL(file)
            setPhotoUrl(url)
        }
    }

    return (
        <>
            <div className="profileinfo__avatar-block">
                <img src={photoUrl} alt="" />
                <button className="profileinfo__edit-pen">
                    <label htmlFor="file-avatar-profile">
                        <IconProfileInfoPen />
                    </label>
                </button>
                <input
                    id="file-avatar-profile"
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileSelect}
                />
            </div>
            <h5 className="profileinfo__avatar-title">{fullName}</h5>
            <h6 className="profileinfo__edit-subtitle">{email}</h6>
            <h5 className="profileinfo__edit-title">Biography</h5>
            <div className="profileinfo__edit-body-items">
                <input
                    className="profileinfo__edit-input"
                    type="text"
                    value={fullNameLocal}
                    onChange={(e) => setFullNameLocal(e.target.value)}
                />
                <div className="profile__about-body">
                    <TextareaAutosize
                        value={aboutMeLocal}
                        onChange={handleChange}
                        className="profile__about-autoresize"
                        minRows={3}
                        placeholder="Be concise, authentic, and feel free to let your personality shine through"
                    />
                    <button className="profile__about-resize">
                        <span>
                            {aboutMe.length}/{maxLength}
                        </span>
                    </button>
                </div>
            </div>
            <h5 className="profileinfo__edit-title ">
                Date and place of birth
            </h5>
            <div className="profileinfo__edit-body-items">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        className="profileinfo__edit-picker"
                        value={dateBirthLocal}
                        onChange={(newValue) => setDateBirthLocal(newValue)}
                    />
                </LocalizationProvider>
                <ProfileCityBirthInput
                    city={cityBirthLocal}
                    setCity={setCityBirthLocal}
                />
            </div>
            <h5 className="profileinfo__edit-title ">Education</h5>
            <div className="profileinfo__edit-body-items">
                <ProfileEducationList
                    education={educationLocal}
                    setEducation={setEducationLocal}
                />
                <input
                    className="profileinfo__edit-input"
                    type="text"
                    value={studySchoolLocal}
                    onChange={(e) => setStudySchoolLocal(e.target.value)}
                />
            </div>
            <h5 className="profileinfo__edit-title ">Gender and orientation</h5>
            <div className="profileinfo__edit-body-items">
                <ProfileSexList setSex={setSexLocal} sex={sexLocal} />
                <ProfileSexOrintationList
                    orientation={orientationLocal}
                    setOrientation={setOrientationLocal}
                />
            </div>
            <h5 className="profileinfo__edit-title ">Family status</h5>
            <AutocompleteSearch
                options={listFamilyStatus}
                isLimit={-1}
                value={familyStatusLocal}
                setValue={handlerFamilyStatusLocal}
            />
            <button
                className={`profile__method-btlater `}
                onClick={uploadToServer}
            >
                Update Profile
            </button>
        </>
    )
}
