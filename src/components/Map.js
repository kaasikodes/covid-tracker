import React from 'react'
import {Map as LeafletMap, TileLayer} from 'react-leaflet'// downgrade this to fit version used 
import { showDataMap } from '../utilities/util'
import './Map.css'

const Map = ({ countries, casesType, center, zoom }) => {
    return (
        <div className = "map">
            <LeafletMap center = {center} zoom = {zoom}>
                <TileLayer
                    url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {/* loop thru cntris n draw ccles on screeem */}
                {showDataMap(countries, casesType)}

            </LeafletMap>
        
            
        </div>
    )
}

export default Map
