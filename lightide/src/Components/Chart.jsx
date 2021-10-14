// GA SEI 32 Project 2: FrontEnd with API
// ZY, 13 Oct 2021

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
  // create array to store the data for the time series chart
  const tideSeries = [];

  // merge both zoom and voronoi containers
  const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi");
  // take the tide Prop (JSON data) and map the array, save as tideDetails
  const tidedetails = tide?.data?.map((ele) => {
    let timeTideDetails = new Date(ele.time);
    // add data for the time series chart
    tideSeries.push({ x: timeTideDetails, y: ele.height });
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
      {tide.data ? (
        <>
          <div className="timeseries">
            <VictoryChart
              scale={{ x: "time" }}
              height={440}
              width={650}
              theme={VictoryTheme.material}
              containerComponent={
                <VictoryZoomVoronoiContainer
                  labels={({ datum }) => `${datum.x} \n ${datum.y} meters`}
                />
              }
            >
              <VictoryLabel
                text={
                  "Time Series (" +
                  `${tide?.meta?.station?.name}` +
                  " station)"
                }
                x={225}
                y={30}
                textAnchor="middle"
                backgroundStyle={{ fill: "white", opacity: 1 }}
                backgroundPadding={{ left: 25, right: 25,bottom: 5, top: 5 }}
              />
              <VictoryLine
                data={tideSeries}
                interpolation="cardinal"
                style={{
                  data: { stroke: "grey" },
                  labels: { display: "none" },
                }}
              />
              <VictoryScatter
                data={tideSeries}
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