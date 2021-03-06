// GA SEI 32 Project 2: FrontEnd with API
// ZY, 1 Oct 2021

import React from "react";
import styled from "styled-components";
import Datetimeformat from "./Datetimeformat";

const P = styled.p`
  margin: 3px;
`;
const Div = styled.div`
  margin: 20px 20px 5px 5px;
`;
const DivTide = styled(Div)`
  border: ${(props) => (props.dark ? "2px solid white" : "2px solid black")};
`;

function Tides({ tide, darkMode }) {
  // take the tide Prop (JSON data) and map the array, save as tidedetails
  const tidedetails = tide?.data?.map((ele) => {

    return (
      <>
        <DivTide className="tidedetails" dark={darkMode ? true : false}>
          <P>
            <strong>ISO Date/Time: </strong>
            {ele.time}
          </P>
          <P>
            <strong>Local Date/Time: </strong>
            <Datetimeformat dateTime={ele.time} dateTimeFormat="dd MMM yyyy (eee) pppp"/>
          </P>
          <P>
            <strong>Tide: </strong>
            {ele.type}
          </P>
          <P>
            <strong>Height: </strong>
            {ele.height} meters
          </P>
        </DivTide>
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

      {/* ternary conditional operator here in case tide limit reached. */}
      {tide?.data ? (
        <>
          <div className="stationdetails">
            <strong>Request count: </strong>
            {tide?.meta?.requestCount} (Daily limit: 50)
            <br />
            <strong>Station name: </strong>
            {tide?.meta?.station?.name}
            <br />
            <strong>Distance between station and requested coordinate: </strong>
            {tide?.meta?.station?.distance} km
            <br />
            <strong>Station coordinates: </strong>
            {tide?.meta?.station?.lat} (Latitude), {tide?.meta?.station?.lng}{" "}
            (Longitude)
          </div>
          {tidedetails}
        </>
      ) : (
        <>
          Sorry, tide request limit reached for today! <br />
          Please try again tomorrow.
        </>
      )}
    </div>
  );
}

export default Tides;