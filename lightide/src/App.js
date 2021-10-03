// GA SEI 32 Project 2: FrontEnd with API
// ZY, 1 Oct 2021
import React, { useEffect, useState } from "react";
import "./App.css";
import Sun from "./Components/Sun";
import Tides from "./Components/Tides";
import Attribution from "./Components/Attribution";

function App() {
  // set useState for coordinates (lat/long)
  const [coordinates, setCoordinates] = useState({
    lat: 1.357107,
    long: 103.8194992,
  });
  const [date, setDate] = useState("2021-10-02");
  const [sun, setSun] = useState();
  const [tide, setTide] = useState();

  // for sunrise/sunset data
  useEffect(() => {
    fetch(
      `https://api.sunrise-sunset.org/json?lat=${coordinates.lat}&lng=${coordinates.long}&date=${date}`
    )
      .then((response) => response.json())
      .then((jsonDataSun) => setSun(jsonDataSun));

    fetch(
      // `https://api.stormglass.io/v2/tide/extremes/point?lat=${coordinates.lat}&lng=${coordinates.long}&start=${date}`,
      {
        headers: {
          Authorization: `${process.env.REACT_APP_TIDE_API_KEY}`,
        },
      }
    )
      .then((response) => response.json())
      .then((jsonDataTide) => {
        setTide(jsonDataTide);
      });
  }, []);

  // for geocoding
  useEffect(() => {
    //geocode API
    fetch(
      `https://api.geoapify.com/v1/geocode/search?text=west%20coast%20park&lang=en&limit=1&apiKey=${process.env.REACT_APP_GEOAPIFY_API_KEY}`
    )
      .then((response) => response.json())
      .then((jsonDataMapSearch) => {
        console.log(jsonDataMapSearch);
        console.log(jsonDataMapSearch.features[0].properties.lon);
        console.log(jsonDataMapSearch.features[0].properties.lat);
      })
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <div className="App">
      <p>Date: {date}</p>
      <Sun
        sr={sun?.results?.sunrise}
        ss={sun?.results?.sunrise}
        sn={sun?.results?.sunrise}
        dl={sun?.results?.sunrise}
        ctb={sun?.results?.sunrise}
        cte={sun?.results?.sunrise}
        ntb={sun?.results?.sunrise}
        nte={sun?.results?.sunrise}
        atb={sun?.results?.astronomical_twilight_begin}
        ate={sun?.results?.astronomical_twilight_end}
      />
      <Tides tide={"8m"} />
      <p>{tide?.data?.[0]?.height}</p>
      <p>{tide?.meta?.station?.name}</p>
      <Attribution />
    </div>
  );
}

export default App;

// SAMPLE TIDE DATA /////////////////////
// {
// 	"data": [
// 		{
// 			"height": 0.3478945823346122,
// 			"time": "2021-10-03T04:21:00+00:00",
// 			"type": "high"
// 		},
// 		{
// 			"height": -0.15869135594331021,
// 			"time": "2021-10-03T09:56:00+00:00",
// 			"type": "low"
// 		},
// 		{
// 			"height": 0.5833375766591866,
// 			"time": "2021-10-03T15:28:00+00:00",
// 			"type": "high"
// 		},
// 		{
// 			"height": -0.7851355974773522,
// 			"time": "2021-10-03T22:33:00+00:00",
// 			"type": "low"
// 		},
// 		{
// 			"height": 0.4674118528666078,
// 			"time": "2021-10-04T04:40:00+00:00",
// 			"type": "high"
// 		},
// 		{
// 			"height": -0.33099377813635467,
// 			"time": "2021-10-04T10:34:00+00:00",
// 			"type": "low"
// 		},
// 		{
// 			"height": 0.7550069478215463,
// 			"time": "2021-10-04T16:11:00+00:00",
// 			"type": "high"
// 		},
// 		{
// 			"height": -0.8724383508681051,
// 			"time": "2021-10-04T23:08:00+00:00",
// 			"type": "low"
// 		},
// 		{
// 			"height": 0.5907754635532351,
// 			"time": "2021-10-05T05:02:00+00:00",
// 			"type": "high"
// 		},
// 		{
// 			"height": -0.5104772993794429,
// 			"time": "2021-10-05T11:08:00+00:00",
// 			"type": "low"
// 		},
// 		{
// 			"height": 0.910368139604452,
// 			"time": "2021-10-05T16:51:00+00:00",
// 			"type": "high"
// 		},
// 		{
// 			"height": -0.9206181257191552,
// 			"time": "2021-10-05T23:41:00+00:00",
// 			"type": "low"
// 		},
// 		{
// 			"height": 0.7155669579709399,
// 			"time": "2021-10-06T05:26:00+00:00",
// 			"type": "high"
// 		},
// 		{
// 			"height": -0.6857326756370448,
// 			"time": "2021-10-06T11:41:00+00:00",
// 			"type": "low"
// 		},
// 		{
// 			"height": 1.028503105804472,
// 			"time": "2021-10-06T17:29:00+00:00",
// 			"type": "high"
// 		},
// 		{
// 			"height": -0.9264832334555565,
// 			"time": "2021-10-07T00:13:00+00:00",
// 			"type": "low"
// 		},
// 		{
// 			"height": 0.8326975931728775,
// 			"time": "2021-10-07T05:54:00+00:00",
// 			"type": "high"
// 		},
// 		{
// 			"height": -0.841597966658043,
// 			"time": "2021-10-07T12:15:00+00:00",
// 			"type": "low"
// 		},
// 		{
// 			"height": 1.0906551874112071,
// 			"time": "2021-10-07T18:08:00+00:00",
// 			"type": "high"
// 		},
// 		{
// 			"height": -0.8892987646010603,
// 			"time": "2021-10-08T00:44:00+00:00",
// 			"type": "low"
// 		},
// 		{
// 			"height": 0.9284417702320107,
// 			"time": "2021-10-08T06:24:00+00:00",
// 			"type": "high"
// 		},
// 		{
// 			"height": -0.9604684404821714,
// 			"time": "2021-10-08T12:51:00+00:00",
// 			"type": "low"
// 		},
// 		{
// 			"height": 1.082959605340805,
// 			"time": "2021-10-08T18:48:00+00:00",
// 			"type": "high"
// 		},
// 		{
// 			"height": -0.8105556913795363,
// 			"time": "2021-10-09T01:16:00+00:00",
// 			"type": "low"
// 		},
// 		{
// 			"height": 0.9878810080864338,
// 			"time": "2021-10-09T06:57:00+00:00",
// 			"type": "high"
// 		},
// 		{
// 			"height": -1.0262132088258746,
// 			"time": "2021-10-09T13:30:00+00:00",
// 			"type": "low"
// 		},
// 		{
// 			"height": 0.9999100956039005,
// 			"time": "2021-10-09T19:30:00+00:00",
// 			"type": "high"
// 		},
// 		{
// 			"height": -0.6943808760944408,
// 			"time": "2021-10-10T01:49:00+00:00",
// 			"type": "low"
// 		},
// 		{
// 			"height": 0.9986507657188286,
// 			"time": "2021-10-10T07:33:00+00:00",
// 			"type": "high"
// 		},
// 		{
// 			"height": -1.0290522829867448,
// 			"time": "2021-10-10T14:14:00+00:00",
// 			"type": "low"
// 		},
// 		{
// 			"height": 0.8471932513456184,
// 			"time": "2021-10-10T20:15:00+00:00",
// 			"type": "high"
// 		},
// 		{
// 			"height": -0.5481285681521904,
// 			"time": "2021-10-11T02:23:00+00:00",
// 			"type": "low"
// 		},
// 		{
// 			"height": 0.9542721295763691,
// 			"time": "2021-10-11T08:12:00+00:00",
// 			"type": "high"
// 		},
// 		{
// 			"height": -0.970258586149165,
// 			"time": "2021-10-11T15:03:00+00:00",
// 			"type": "low"
// 		},
// 		{
// 			"height": 0.6437524780749798,
// 			"time": "2021-10-11T21:06:00+00:00",
// 			"type": "high"
// 		},
// 		{
// 			"height": -0.3828703244524554,
// 			"time": "2021-10-12T03:02:00+00:00",
// 			"type": "low"
// 		},
// 		{
// 			"height": 0.8568446352110798,
// 			"time": "2021-10-12T08:55:00+00:00",
// 			"type": "high"
// 		},
// 		{
// 			"height": -0.8665751298569487,
// 			"time": "2021-10-12T16:02:00+00:00",
// 			"type": "low"
// 		},
// 		{
// 			"height": 0.4254832777229538,
// 			"time": "2021-10-12T22:09:00+00:00",
// 			"type": "high"
// 		}
// 	],
// 	"meta": {
// 		"cost": 1,
// 		"dailyQuota": 50,
// 		"datum": "MSL",
// 		"end": "2021-10-13 00:00",
// 		"lat": 1.357107,
// 		"lng": 103.8194992,
// 		"requestCount": 4,
// 		"start": "2021-10-03 00:00",
// 		"station": {
// 			"distance": 9,
// 			"lat": 1.3,
// 			"lng": 103.767,
// 			"name": "west coast",
// 			"source": "sg"
// 		}
// 	}
// }
