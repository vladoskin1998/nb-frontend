import React, { useCallback, useEffect, useRef, useState } from "react"
import { useAppSelector } from "../../../utils/hooks"
import { UserCurrentLocation } from "../users/UserCurrentLocation"
import { ROLES } from "../../../types/enum"
import { MapContainer, TileLayer, useMapEvent, useMapEvents, Marker, Popup } from "react-leaflet"
import L, { LatLngExpression, LatLngLiteral } from "leaflet"
import { IconAddMarker } from "../../svg/IconAddMarker"
import { Modal } from "../../ui/Modal"
import { IconAdminClose } from "../../svg/IconAdminHeader"
import { IconArrachFile } from "../../svg/IconArrachFile"
import { AxiosResponse } from "axios"
import $api from "../../../http"
import { LocationType, MessageType } from "../../../types/types"
import { baseURL } from "../../../utils/config"
import ReactDOM from "react-dom"

export const AdminPanelMap = () => {
    const { fullName, role } = useAppSelector((s) => s.userReducer)
    const { coordinates, step } = useAppSelector((s) => s.profileReducer)

    const [mousePos, setMousePos] = useState<[number, number]>([0,0]);
    const [IsOpenMarkers, setIsOpenMarkers] = useState<boolean>(false);

    const [MarkerMode, setMarkerMode] = useState<boolean>(false);
    const [MarksList, setMarksList] = useState<LocationType[]>([])

    let props:any = {
        startLat:coordinates.lat,
        startLng:coordinates.lng,
        interestZone:step,
        className: "admin__panel-map"
    }

    if(role === ROLES.ADMIN){
        props.zoom = 1
    }

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((pos)=>{
            props.startLat = pos.coords.latitude;
            props.startLng = pos.coords.longitude;
        }, ()=>alert("Cannot get user location"))
    }

    if(role === ROLES.REGIONAL_ADMIN){
        props.interestZone = 20
    }
    useEffect(() => {
        const effectBody = async() => {
            const resMarksList: AxiosResponse<LocationType[]> =
            await $api.post("map/list-marks")
            console.log(resMarksList);
            setMarksList(resMarksList.data);
        }
        effectBody()
    }, [])
    
    // const handleClick = () => {
    //     // setMarkerMode(!MarkerMode);
    //     setIsOpenMarkers(!IsOpenMarkers);
    // }
    
    return (
        <div>
            <div className="admin__panel-name">Hello, {fullName}</div>
            <div className="admin__panel-title"> My working area </div>
            <div className={!MarkerMode ? "admin__panel-addMarker":"admin__panel-addMarker clicked"} onClick={()=>setMarkerMode(!MarkerMode)}>
                <IconAddMarker />
            </div>
            {MarkerMode && <span>Marker mode activated</span>}
            <div className="admin__panel__map">
                <MapContainer style={{maxHeight:"40%"}} center={[props.startLat, props.startLng]} zoom={19} scrollWheelZoom={true} 
                >
                    <TileLayer
                    //attribution = 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
                    url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}'
                    />
                    <AdminMarker enable={MarkerMode} setCoords={setMousePos} setIsOpen={setIsOpenMarkers}/>
                    {MarksList.map((item)=>(
                        <LocationMarker 
                            markerData={item}
                        />
                    ))}
                </MapContainer>
                {IsOpenMarkers && (<AdminMapModal MousePos={mousePos} setIsOpen={setIsOpenMarkers}/>)}
            </div>
        </div>
    )
}

export const AdminMapModal = (props:{setIsOpen:(o:boolean)=>void, MousePos:[number, number]}) => {
    const [LocationName, setLocationName] = useState<string>("")
    const [Latitude, setLatitude] = useState<number>(0)
    const [Longitude, setLongitude] = useState<number>(0)
    const [image, setImage] = useState<File | null>(null)
    const [imageUrl, setImageUrl] = useState<string>("")
    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const {_id} = useAppSelector(s=>s.userReducer)
    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null
        setImage(file)
        if (file) {
            const url = URL.createObjectURL(file)
            setImageUrl(url)
        }
    }
    const makeAdminMarker = async () => {
        let fileName: null | string = null
        if (image) {
            const formData = new FormData()

            formData.append("file", image)

            const res:AxiosResponse<string> = await $api.post('map/file-mark',formData)
            fileName = res.data
            if(props.MousePos && LocationName){
                await $api.post('map/create-mark', {
                    file:fileName,
                    title:LocationName,
                    adminId:_id,
                    coords:props.MousePos
                })
            }
        }
    }
    return(
        <Modal className="group__pannel admin__map__modal" setIsOpen={props.setIsOpen}>
            <span><b>Create Location</b></span>
            <div className="new__group__form">
                <input onChange={(e)=>setLocationName(e.target.value)} type="text" name="groupName" className="group__chatName__input" placeholder="Enter your Location name"/>
                <span className="new__group__title">Your location coords:</span>
                <p><span className="new__group__title" style={{display:"flex", flexDirection:"column"}}>Coords: {props.MousePos.toString()}</span></p>
                <p><span className="new__group__title">Select location icon:</span></p>
                    <div className="admin__image__container">
                        <label
                            htmlFor="file-avatar-profile"
                            className="admin__panel__file"
                        >
                            <IconArrachFile />
                        </label>
                        <input
                            multiple={false}
                            id="file-avatar-profile"
                            type="file"
                            ref={fileInputRef}
                            style={{ display: "none" }}
                            onChange={handleFileSelect}
                        />
                        <img src={`${imageUrl}`} alt="" />
                        <div>{image?.name}</div>
                    </div>
                        <button
                            className={`${
                                (LocationName.length<3 || !image) ? "messenger__chat-sender-send--disabled" : "messenger__chat-sender-send"
                            }`}
                            onClick={makeAdminMarker}
                            disabled={(LocationName.length<3 || !image)}
                        >
                            Create
                        </button>   
            </div>
        </Modal>
    );
}

const AdminMarker = (props:{setIsOpen:(o:boolean)=>void, setCoords:(o:[number, number])=>void, enable:boolean}) =>{
 const [position, setPosition] = useState<LatLngExpression>([0,0])
  const map = useMapEvents({
    click(e) {
        if(props.enable){
            map.locate()
            props.setIsOpen(true);
            props.setCoords([e.latlng.lat, e.latlng.lng]);
            setPosition(e.latlng);
        }
    },
  })

  return position === null ? null : (
    <Marker position={position}>

    </Marker>
  )
}
export const LocationMarker = (props:{
    markerData:LocationType
}) => {
    const markIcon = new L.Icon({
        iconUrl: `${baseURL}/uploads/map/${props.markerData.file}`,
        iconRetinaUrl: `${baseURL}/uploads/map/${props.markerData.file}`,
        iconAnchor: new L.Point(0, 0),
        popupAnchor: new L.Point(16, 0),
        iconSize: new L.Point(32, 32),
        className: 'leaflet-div-icon'
      });
    return(
        <Marker position={props.markerData.coords} icon={markIcon}>
            <Popup>{props.markerData.title}</Popup>
        </Marker>
    );
}