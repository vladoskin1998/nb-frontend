import { MapContainer, MapContainerProps, Marker, Popup, TileLayer, useMapEvents } from "react-leaflet";
import { IconLeftChevrons } from "../../svg/IconChevrons";
import { UserHeader } from "../header/UserHeader";
import { IconNightMode } from "../../svg/IconNightMode";
import { IconSearchMap } from "../../svg/IconSearchMap";
import { IconLikeMap } from "../../svg/IconLikeMap";
import { IconNotification } from "../../svg/IconNotification";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../utils/hooks";
import { useEffect, useRef, useState } from "react";
import L, { LatLng, LatLngExpression, LatLngLiteral } from "leaflet";
import $api from "../../../http"
import { LocationType, MessageType } from "../../../types/types"
// import { LocaTionType } from "../../../types/types";
import { roleUrl } from "../../../utils/config";
import { AxiosResponse } from "axios";
import { LocationMarker } from "../../admin-components/admin-panel/AdminPanelMap";
import { IconAddMarker } from "../../svg/IconAddMarker";
import { Map } from "typescript";

export const ExploreMap = () => {

    const navigate = useNavigate()
    const {fullName} = useAppSelector((s)=>s.userReducer)
    const [Night, setNight] = useState<boolean>(false)
    const location = useLocation();

    const { role } = useAppSelector((s) => s.userReducer)
    // const [LocationPostage, setLocationPostage] = useState<LocaTionType>()
    const [LocationTitle, setLocationTitle] = useState<string>("")
    const [LocationFileName, setLocationFileName] = useState<string>("")
    const [MarksList, setMarksList] = useState<LocationType[]>([])
    const [MarkerMode, setMarkerMode] = useState<boolean>(false);
    const [map, setMap] = useState<L.Map|null>(null);

    useEffect(() => {
      const effectBody = async() => {
          const resMarksList: AxiosResponse<LocationType[]> =
          await $api.post("map/list-marks")
          console.log(resMarksList);
          setMarksList(resMarksList.data);
      }
      effectBody()
  }, [])

    // const addPoint = () => {
    //   if(roleUrl(role) === "/user"){
    //     setLocationPostage({
    //       locationFileName:LocationFileName,
    //       title:LocationTitle,
    //       locationParameters:{
    //         event:[],
    //         service:[],
    //         posts:[]
    //       }
    //     });
    //     navigate(`${roleUrl(role)}/explore/add-point`, {
    //       state:LocationPostage
    //     })
    //   }
    // }
    
    return(
        <div>
        <UserHeader>
          <div className="user__header-messages explore__header">
            <>
              <button
                  onClick={() => navigate(-1)}
                  className="user__header-chatuser user__header-messages-exit"
              >
                  <IconLeftChevrons />
              </button>
              {/* <h5 className="user__header-title map__title">{fullName}</h5> */}
            </>
              <div className={!MarkerMode ? "admin__panel-addMarker explore__location__follow":"admin__panel-addMarker explore__location__follow clicked"} onClick={()=>{
                setMarkerMode(!MarkerMode);
                map?.flyTo(location.state, 12)
              }}>
                <IconAddMarker />
              </div>
          </div>
        </UserHeader>
        <div>
          <MapContainer center={location.state} zoom={8} maxZoom={13} minZoom={6} scrollWheelZoom={true} ref={setMap}>
            {!Night ? 
              <>
                <TileLayer
                  attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                  url='https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png'
                  subdomains="abcd"
                />            
                <TileLayer
                  attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                  url='https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png'
                  subdomains='abcd'
                />
              </>
              :
              <>
                <TileLayer
                  attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                  url='https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png'
                />
                <TileLayer
                  attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                  url='https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png'
                  subdomains='abcd'
                />
              </>
            }
            {MarksList.map((item)=>(
              <LocationMarker 
                 markerData={item}
              />
            ))}
          </MapContainer>
        </div>
        <div className="map__menu">
          <div style={Night ? {backgroundColor:"rgba(15, 20, 25, 0.2)"}:{backgroundColor:"#fff"}} className='map__menu-item' onClick={()=>{setNight(!Night)}}>
            <IconNightMode />
          </div>
          <div style={Night ? {backgroundColor:"rgba(15, 20, 25, 0.2)"}:{backgroundColor:"#fff"}} className='map__menu-item' onClick={()=>navigate("search")}>
            <IconSearchMap />
          </div>
          <div style={Night ? {backgroundColor:"rgba(15, 20, 25, 0.2)"}:{backgroundColor:"#fff"}} className='map__menu-item'>
            <b>NH</b>
          </div>
          <div style={Night ? {backgroundColor:"rgba(15, 20, 25, 0.2)"}:{backgroundColor:"#fff"}} className='map__menu-item'>
            <IconLikeMap />
          </div>
          <div style={Night ? {backgroundColor:"rgba(15, 20, 25, 0.2)"}:{backgroundColor:"#fff"}} className='map__menu-item' onClick={()=>navigate(`${roleUrl(role)}/notification`)}>
            <IconNotification />
          </div>
        </div>
        </div>
    );
}