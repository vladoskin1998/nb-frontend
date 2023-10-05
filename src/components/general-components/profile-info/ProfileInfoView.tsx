import { useLocation } from "react-router-dom";
import { UserItem } from "./ProfileInfo"
import { ProfileInfoAvatar } from "./ProfileInfoAvatar"
import { ProfileInfoPerProf } from "./ProfileInfoPerProf"

export const ProfileInfoView = () => {

  const location = useLocation();
  const props: UserItem = location.state;
    return (
        <>
            <ProfileInfoAvatar props={props}/>
            <ProfileInfoPerProf props={props}/>
        </>
    )
}
