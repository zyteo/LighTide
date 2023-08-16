// GA SEI 32 Project 2: FrontEnd with API
// ZY, 1 Oct 2021

import React from "react";
import styled from "styled-components";
import Datetimeformat from "./Datetimeformat";
import { text } from "../Localisation/text";

const P = styled.p`
  margin: 3px;
`;
const Div = styled.div`
  margin: 20px 20px 5px 5px;
`;
const DivTide = styled(Div)`
  border: ${(props) => (props.dark ? "2px solid white" : "2px solid black")};
`;

function Tides({ tide, darkMode, language }) {
  // take the tide Prop (JSON data) and map the array, save as tidedetails
  const tidedetails = tide?.data?.map((ele) => {
    return (
      <>
        <DivTide className="tidedetails" dark={darkMode ? true : false}>
          <P>
            <strong>{text[language].tideISO}: </strong>
            {ele?.time}
          </P>
          <P>
            <strong>{text[language].tideLocal}: </strong>
            <Datetimeformat
              dateTime={ele?.time}
              dateTimeFormat="dd MMM yyyy (eee) pppp"
            />
          </P>
          <P>
            <strong>{text[language].tideType}: </strong>
            {/* if ele?.type is high, text is tideHigh */}
            {ele?.type === "high"
              ? text[language].tideHigh
              : text[language].tideLow}
          </P>
          <P>
            <strong>{text[language].tideHeight}: </strong>
            {ele?.height} {text[language].tideMetres}
          </P>
        </DivTide>
      </>
    );
  });

  return (
    <div className="tides">
      <p>
        <strong>
          <u>{text[language].tideTitle}</u>
        </strong>
      </p>

      {/* ternary conditional operator here in case tide limit reached. */}
      {tide?.data ? (
        <>
          <div className="stationdetails">
            <strong>{text[language].tideRequestCount}: </strong>
            {tide?.meta?.requestCount} ({text[language].tideDailyLimit}: 50)
            <br />
            <strong>{text[language].tideStationName}: </strong>
            {tide?.meta?.station?.name}
            <br />
            <strong>{text[language].tideDistanceStation}: </strong>
            {tide?.meta?.station?.distance} {text[language].tideKilometres}
            <br />
            <strong>{text[language].tideStationCoordinates}: </strong>
            {tide?.meta?.station?.lat} ({text[language].mapsLatitude}),{" "}
            {tide?.meta?.station?.lng} ({text[language].mapsLongitude})
          </div>
          {tidedetails}
        </>
      ) : (
        <>
          {text[language].tideLimitReached1} <br />
          {text[language].tideLimitReached2}
        </>
      )}
    </div>
  );
}

export default Tides;
