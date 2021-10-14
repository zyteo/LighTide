// GA SEI 32 Project 2: FrontEnd with API
// ZY, 1 Oct 2021

import React from "react";
import {
  createContainer,
  VictoryChart,
  VictoryLabel,
  VictoryLine,
  VictoryScatter,
  VictoryTheme,
} from "victory";

function Chart({ tide }) {
  const tideseries = [];

  const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi");
  // take the tide Prop (JSON data) and map the array, save as tidedetails
  const tidedetails = tide?.data.map((ele) => {
    // convert the time from ISO format to a more readable format

    let localtime = new Date(ele.time);
    // push in data for the time series chart
    tideseries.push({ x: localtime, y: ele.height });
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
              height={440}
              width={650}
              theme={VictoryTheme.material}
              containerComponent={
                <VictoryZoomVoronoiContainer
                  labels={({ datum }) => `${datum.x} \n ${datum.y}`}
                />
              }
            >
              <VictoryLabel
                text={"Time Series for " + `${tide?.meta?.station?.name}`}
                x={225}
                y={30}
                textAnchor="middle"
              />
              <VictoryLine
                data={tideseries}
                interpolation="cardinal"
                style={{
                  data: { stroke: "grey" },
                  labels: { display: "none" },
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
