import React, { useState } from 'react'
import { FooterNav } from '../footer-navigate/FooterNav'
import { MapContainer, TileLayer, useMap, Popup, Marker } from 'react-leaflet'
import './../../../style/user/explore.scss'
import { IconNightMode } from '../../svg/IconNightMode'
import { IconSearchMap } from '../../svg/IconSearchMap'
import { IconLikeMap } from '../../svg/IconLikeMap'
import { IconNotification } from '../../svg/IconNotification'
import { UserHeader } from '../header/UserHeader'
import { IconLeftChevrons } from '../../svg/IconChevrons'
import { IconServicesAllPoint } from '../../svg/IconServicesAll'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../../utils/hooks'
import { ExploreSearch } from './ExploreSearch'
import { ExploreMap } from './ExploreMap'

export const Explore = () => {
  return (

        <Routes>
            <Route path='' element={<ExploreMap />} />
            <Route path='search' element={<ExploreSearch />} />
            <Route path='*' element={<ExploreSearch />} />
            {/* <Route path='confirm-location' element={<GeoLocationModule />} />
            <Route path='current-location' element={<CurrentLocationModule />} />
            <Route path="" element={<GeoLocationModule />} /> */}
          </Routes>

  )
  }