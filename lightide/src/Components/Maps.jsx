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

function Map({ coordinates, setCoordinates, cleanedText }) {
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

    // update map to flyover when searching text
    useEffect(() => {
      console.log("flyto searched position");
      map.flyTo([`${coordinates.lat}`, `${coordinates.long}`]);
    }, [cleanedText]);

    return null;
  }

  return (
    <>
      <MapContainer
        center={[`${coordinates.lat}`, `${coordinates.long}`]}
        zoom={14}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='© <a href="https://www.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=${process.env.REACT_APP_MAPBOX_KEY}`}
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
