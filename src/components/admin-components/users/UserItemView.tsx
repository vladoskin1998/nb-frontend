import React, { useEffect, useRef } from "react"
import { IconServicesAllPoint } from "../../svg/IconServicesAll"
import { IconStars } from "../../svg/IconFavor"
import {
    IconUserClock,
    IconUserHashTag,
    IconUserHome,
    IconUserRole,
} from "../../svg/IconsUserItem"

export const UserItemView = ({setIsOpen}:{setIsOpen:() => void}) => {

    const mapRef = useRef<google.maps.Map | null>(null)
    const containerMap = useRef<HTMLDivElement | null>(null);


    const defaultCenter = {
        lat: 50.44270169661527,
        lng: 30.54569078101398,
    }
    
    const mapContainerStyle = {
        width: "100%",
        height: "171px",
        borderRadius: "12px",
    }
    

    useEffect(() => {
        if (window.google) {
            const mapOptions: google.maps.MapOptions = {
                zoom: 14,
                fullscreenControl: false,
                mapTypeControl: false,
                streetViewControl: false,
                zoomControl: false,
                scrollwheel: false,
                gestureHandling: "none", 
                center:
                // coordinates && coordinates.lat
                //         ? new google.maps.LatLng(coordinates.lat, coordinates.lng)
                //         :
                         new google.maps.LatLng(
                              defaultCenter.lat,
                              defaultCenter.lng
                          ),
            }
                mapRef.current = new google.maps.Map(
                    containerMap.current as HTMLElement,
                    mapOptions
                )


        }
    }, [])



    return (
        <div className="user__item">
            <div className="user__item-row1">
                <img
                    src="/Images/avatar-user.png"
                    alt=""
                    className="user__item-row1-img"
                />
                <div className="user__item-row1-info">
                    <p className="user__item-row1-user">
                        <b>Full Name</b>
                        <IconStars />
                        <b>4.5</b>
                        <span>(808)</span>
                    </p>
                    <p className="user__item-row1-email">example92@gmail.com</p>
                    <p className="user__item-row1-phone">+380 95 406 43 21</p>
                </div>
                <button className="user__item-row1-button" onClick={setIsOpen}>
                    <IconServicesAllPoint />
                </button>
            </div>
            <div className="user__item-row2">
                <div className="services__favor-item-row2">
                    <IconUserHashTag />
                    <span>1271</span>
                    <div className="services__favor-item-row2-svg">
                        <IconUserClock />
                    </div>
                    <span>{new Date().toLocaleString()}</span>
                </div>
                <div className="services__favor-item-row2 services__favor-item-row2-2">
                    <IconUserRole />
                    <span>User</span>

                    <IconUserHome />

                    <span>9081 Lakewood Gardens Junktion</span>
                </div>
            </div>
            <div id="map--google--current" style={mapContainerStyle} ref={containerMap}/>
        </div>
    )
}
