// GA SEI 32 Project 2: FrontEnd with API
// ZY, 6 Oct 2021

import React from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";

function Map({ handleClick, coordinates }) {
  return (
    <>
      <MapContainer
        center={[`${coordinates.lat}`, `${coordinates.long}`]}
        zoom={14}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          position={[`${coordinates.lat}`, `${coordinates.long}`]}
          eventHandlers={{ click: handleClick }}
        >
          <Popup>
            Selected point
            <br /> Latitude: {coordinates.lat}
            <br />
            Longitude: {coordinates.long}
          </Popup>
        </Marker>
      </MapContainer>
    </>
  );
}

export default Map;
