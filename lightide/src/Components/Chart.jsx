// GA SEI 32 Project 2: FrontEnd with API
// ZY, 13 Oct 2021

import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { text } from "../Localisation/text";

function Chart({ tide, language, darkMode }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current && tide?.data) {
      const myChart = echarts.init(chartRef.current, darkMode ? "dark" : null, { renderer: "svg" });

      // const timeData = [];
      const tideData = [];
      console.log(tide.data);

      tide.data.forEach((ele) => {
        // console.log(ele);
        // let timeTideDetails = new Date(ele?.time);
        // console.log(timeTideDetails);
        // timeData.push(ele?.time);

        // timeData.push(timeTideDetails);
        tideData.push([ele?.time, ele?.height]);
      });

      const options = {
        title: {
          text: `${text[language].chartTimeSeries} (${tide?.meta?.station?.name} ${text[language].mapsStation})`,
        },
        tooltip: {
          trigger: "axis",
          formatter: function (params) {
            console.log(params);
            const time = new Date(params[0].axisValue).toLocaleString();
            console.log(params[0])
            const tideHeight = params[0].data;
            return `${time} <br/> ${params[0].data[1]} ${text[language].tideMetres}`;
          },
        },
        xAxis: {
          type: "time",
          // data: timeData,
        },
        yAxis: {
          type: "value",
          name: text[language].tideMetres,
        },
        series: [
          {
            type: "line",
            smooth: true,
            data: tideData,
            // lineStyle: {
            //   color: "grey",
            // },
            // itemStyle: {
            //   color: "#c43a31",
            // },
          },
        ],
      };

      myChart.setOption(options);

      return () => {
        myChart.dispose();
      };
    }
  }, [tide, language, darkMode]);

  return (
    <div className="chart">
      <p>
        <strong>
          <u>{text[language].chartTitle}</u>
        </strong>
      </p>
      {tide?.data ? (
        <div className="timeseries" style={{ width: "650px", height: "440px" }}>
          <div ref={chartRef} style={{ width: "100%", height: "100%" }}></div>
        </div>
      ) : (
        <p>{text[language].chartLimitReached1}</p>
      )}
    </div>
  );
}
export default Chart;
