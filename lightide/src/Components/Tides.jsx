// GA SEI 32 Project 2: FrontEnd with API
// ZY, 1 Oct 2021

import React from "react";
import styled from "styled-components";
import { parseISO, format } from "date-fns";
import {
  VictoryChart,
  VictoryLine,
  VictoryTheme,
  VictoryScatter,
} from "victory";

const P = styled.p`
  margin: 3px;
`;
const Div = styled.div`
  margin: 20px 20px 5px 5px;
`;

function Tides({ tide }) {
  const tideseries = [];

  // take the tide Prop (JSON data) and map the array, save as tidedetails
  const tidedetails = tide?.data.map((ele) => {
    // convert the time from ISO format to a more readable format
    let localtime = format(parseISO(ele.time), "dd MMM yyyy (eee) pppp");
    // push in data for the time series chart
    tideseries.push({ x: ele.time, y: ele.height });
    console.log(tideseries);
    return (
      <>
        <Div className="tidedetails">
          <P>
            <strong>ISO Date/Time: </strong>
            {ele.time}
          </P>
          <P>
            <strong>Local Date/Time: </strong>
            {localtime}
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
          <VictoryChart
            scale={{ x: "time" }}
            height={450}
            theme={VictoryTheme.material}
          >
            <VictoryLine
              data={tideseries}
              interpolation="cardinal"
              style={{
                data: { stroke: "black" },
              }}
            />
            <VictoryScatter
              data={tideseries}
              style={{ data: { fill: "#c43a31" } }}
              size={3}
            />
          </VictoryChart>
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
