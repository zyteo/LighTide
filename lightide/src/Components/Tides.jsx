// GA SEI 32 Project 2: FrontEnd with API
// ZY, 1 Oct 2021

import React from "react";

function Tides({ tide }) {
  // take the tide prop (JSON data) and map the array, save as tidedetails
  const tidedetails = tide.data.map((ele) => {
    return (
      <>
        <div className="tidedetails">
          Date/Time (in UTC): {ele.time}
          <br />
          Tide: {ele.type}
          <br />
          Height: {ele.height} meters
        </div>
      </>
    );
  });

  return (
    <div className="tides">
      <p>Tides:</p>
      <div className="stationdetails">
        Station name: {tide.meta.station.name}
        <br />
        Distance between station and requested coordinate: {tide.meta.station.distance} km
        <br />
        Station coordinates: {tide.meta.station.lat} (Latitude), {tide.meta.station.lng} (Longitude)
      </div>
      {tidedetails}
    </div>
  );
}

export default Tides;
