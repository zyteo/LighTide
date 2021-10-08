// GA SEI 32 Project 2: FrontEnd with API
// ZY, 1 Oct 2021

import React from "react";
import styled from "styled-components";

const P = styled.p`
  margin: 3px;
`;
const Div = styled.div`
  margin: 20px 20px 5px 5px;
`;

function Tides({ tide }) {
  // take the tide Prop (JSON data) and map the array, save as tidedetails
  const tidedetails = tide?.data.map((ele) => {
    return (
      <>
        <Div className="tidedetails">
          <P>
            <strong>Date/Time (in UTC): </strong>
            {ele.time}
          </P>

          <P>
            <strong>Tide: </strong>
            {ele.type}
          </P>

          <P>
            <strong>Height: </strong>
            {ele.height} meters
          </P>
        </Div>
      </>
    );
  });

  return (
    <div className="tides">
      <p>
        <strong>
          <u>Tides</u>
        </strong>
      </p>
      <div className="stationdetails">
        <strong>Station name: </strong>
        {tide?.meta?.station?.name}
        <br />
        <strong>Distance between station and requested coordinate: </strong>
        {tide?.meta?.station?.distance} km
        <br />
        <strong>Station coordinates: </strong>
        {tide?.meta?.station?.lat} (Latitude), {tide?.meta?.station?.lng} (Longitude)
      </div>
      {tidedetails}
    </div>
  );
}

export default Tides;
