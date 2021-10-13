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

function Chart({ tide }) {
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
        <div>hi</div>
      </>
    );
  });

  return (
    <div className="chart">
      <p>
        <strong>
          <u>Tide Chart</u>
        </strong>
      </p>

      {/* ternary conditional operator here in case tide limit reached. */}
      {tide?.data ? (
        <>
          <div className="timeseries">
            <VictoryChart
              scale={{ x: "time" }}
              height={450}
              width={400}
              theme={VictoryTheme.material}
            >
              <VictoryLine
                data={tideseries}
                interpolation="cardinal"
                style={{
                  data: { stroke: "grey" },
                }}
              />
              <VictoryScatter
                data={tideseries}
                style={{ data: { fill: "#c43a31" } }}
                size={3}
              />
            </VictoryChart>
          </div>
        </>
      ) : (
        <p>Tide request limit reached for today, so no chart generated!</p>
      )}
    </div>
  );
}

export default Chart;
