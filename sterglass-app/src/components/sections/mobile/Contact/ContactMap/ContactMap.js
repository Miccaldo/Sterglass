import React from "react";
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import './ContactMap.scss';

import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

function ContactMap(props) {

    return(
      <div>
        <MapContainer center={[54.37917682495492, 18.600168958402495]} zoom={13} scrollWheelZoom={true} style={{zIndex: '0'}}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[54.37917682495492, 18.600168958402495]}>
          </Marker>
        </MapContainer>
      </div>
    );
}

export default ContactMap;
