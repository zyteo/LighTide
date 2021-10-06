// GA SEI 32 Project 2: FrontEnd with API
// ZY, 6 Oct 2021

import React, { useEffect } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";

function Map({ handleClick, coordinates, setCoordinates, cleanedText }) {
  // Get the coordinates of the map when clicking map
  function ClickMap() {
    const map = useMapEvents({
      click(e) {
        setCoordinates({
          long: e.latlng.lng,
          lat: e.latlng.lat,
        });
        map.flyTo(e.latlng);
      },
    });
    return null;
  }

  // update map to flyover when searching text
  useEffect(() => {
    console.log("TESTING SRCH");
  }, [cleanedText]);

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
        <Marker position={[`${coordinates.lat}`, `${coordinates.long}`]}>
          <Popup>
            Selected point
            <br /> Latitude: {coordinates.lat}
            <br />
            Longitude: {coordinates.long}
          </Popup>
        </Marker>
        <ClickMap />
      </MapContainer>
    </>
  );
}

export default Map;
