// GA SEI 32 Project 2: FrontEnd with API
// ZY, 1 Oct 2021
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import { Route } from "react-router";
import "./App.css";
import Attribution from "./Components/Attribution";
import Home from "./Components/Home";
import Nav from "./Components/Nav";
import Sun from "./Components/Sun";
import Tides from "./Components/Tides";

// get today's date
const todayDateTime = new Date();
const yyyy = todayDateTime.getFullYear();
const mm = todayDateTime.getMonth() + 1;
const dd = todayDateTime.getDate();
const todayDate = `${yyyy}-${mm}-${dd}`;

function App() {
  //////////////////////////////// Start of useState/useRef ///////////////////////////////////////////
  const [coordinates, setCoordinates] = useState({
    lat: 1.357107,
    long: 103.8194992,
  });
  const [date, setDate] = useState(todayDate);
  const [sun, setSun] = useState();
  const [tide, setTide] = useState(exampletidedata);
  const inputTextSearch = useRef();
  const [cleanedText, setCleanedText] = useState();
  const [toggle, setToggle] = useState(false);
  //////////////////////////////// End of useState/useRef ///////////////////////////////////////////

  ///////////////////////TEST MAP CLICK///////////////////////////////////////////////////
  const handleMapClick = (e) => {
    console.log("hi", e);
  };
  //////////////////////////////////////////////////////////////////////////////////////////////////
  // on changing the date field, update date state
  const handleDateChange = (e) => {
    setDate(e.target.value);
  };
  // on submitting search text for map, clean the text and update text state
  const handleSearch = () => {
    const searchText = inputTextSearch.current.value;
    // use regex + replace to url encode symbols
    const cleanedSearchText = searchText
      .replace(/ /g, "%20")
      .replace(/,/, "%2C")
      .replace(".", "%2E")
      .replace(/#/, "%23");
    setCleanedText(cleanedSearchText);
  };

  // for the "get details" button
  const handleToggle = () => {
    setToggle(!toggle);
    console.log("getting sun/tide data...");
  };

  // To get sun + tides data for particular lat/long/date
  useEffect(() => {
    // for sunrise/sunset data
    axios
      .get(
        `https://api.sunrise-sunset.org/json?lat=${coordinates.lat}&lng=${coordinates.long}&date=${date}`
      )
      .then((response) => {
        setSun(response.data);
      });

    ////////////////////for tide data
    // axios
    //   .get(
    //     `https://api.stormglass.io/v2/tide/extremes/point?lat=${coordinates.lat}&lng=${coordinates.long}&start=${date}&key=${process.env.REACT_APP_TIDE_API_KEY}`
    //   )
    //   .then((response) => {
    //     setTide(response.data);
    //   });
  }, [toggle]);

  // Geocoding - to get lat/long based on the text searched, renders on every cleanedText change
  useEffect(() => {
    //geocode API
    axios
      .get(
        `https://api.geoapify.com/v1/geocode/search?text=${cleanedText}&lang=en&limit=1&apiKey=${process.env.REACT_APP_GEOAPIFY_API_KEY}`
      )
      .then((response) => {
        setCoordinates({
          long: response.data.features[0].properties.lon,
          lat: response.data.features[0].properties.lat,
        });
      });
    console.log("updated", coordinates.lat, coordinates.long);
  }, [cleanedText]);

  return (
    <>
      <div className="App">
        <Nav />
        <main>
          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/maps">
            <label for="start">Date:</label>
            <input
              type="date"
              id="date"
              name="selectdate"
              min="2000-01-01"
              max="2100-12-31"
              onChange={handleDateChange}
            />
            <label>Locate a place:</label>
            <input
              type="text"
              ref={inputTextSearch}
              placeholder="Address / Place name"
            />
            <input type="submit" value="Search" onClick={handleSearch} />

            <MapContainer
              center={[`${coordinates.lat}`, `${coordinates.long}`]}
              zoom={14}
              scrollWheelZoom={true}
            >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[`${coordinates.lat}`, `${coordinates.long}`]}>
                <Popup>
                  Selected point
                  <br /> Latitude: {coordinates.lat}
                  <br />
                  Longitude: {coordinates.long}
                </Popup>
              </Marker>
            </MapContainer>
            <input type="submit" value="Get details!" onClick={handleToggle} />
            <Sun
              sr={sun?.results?.sunrise}
              ss={sun?.results?.sunset}
              sn={sun?.results?.solar_noon}
              dl={sun?.results?.day_length}
              ctb={sun?.results?.civil_twilight_begin}
              cte={sun?.results?.civil_twilight_end}
              ntb={sun?.results?.nautical_twilight_begin}
              nte={sun?.results?.nautical_twilight_end}
              atb={sun?.results?.astronomical_twilight_begin}
              ate={sun?.results?.astronomical_twilight_end}
            />
            <Tides tide={tide} />
            <Attribution />
          </Route>
        </main>
      </div>
    </>
  );
}

export default App;

// SAMPLE TIDE DATA /////////////////////
const exampletidedata = {
  data: [
    {
      height: 0.3478945823346122,
      time: "2021-10-03T04:21:00+00:00",
      type: "high",
    },
    {
      height: -0.15869135594331021,
      time: "2021-10-03T09:56:00+00:00",
      type: "low",
    },
    {
      height: 0.5833375766591866,
      time: "2021-10-03T15:28:00+00:00",
      type: "high",
    },
    {
      height: -0.7851355974773522,
      time: "2021-10-03T22:33:00+00:00",
      type: "low",
    },
    {
      height: 0.4674118528666078,
      time: "2021-10-04T04:40:00+00:00",
      type: "high",
    },
    {
      height: -0.33099377813635467,
      time: "2021-10-04T10:34:00+00:00",
      type: "low",
    },
    {
      height: 0.7550069478215463,
      time: "2021-10-04T16:11:00+00:00",
      type: "high",
    },
    {
      height: -0.8724383508681051,
      time: "2021-10-04T23:08:00+00:00",
      type: "low",
    },
    {
      height: 0.5907754635532351,
      time: "2021-10-05T05:02:00+00:00",
      type: "high",
    },
    {
      height: -0.5104772993794429,
      time: "2021-10-05T11:08:00+00:00",
      type: "low",
    },
    {
      height: 0.910368139604452,
      time: "2021-10-05T16:51:00+00:00",
      type: "high",
    },
    {
      height: -0.9206181257191552,
      time: "2021-10-05T23:41:00+00:00",
      type: "low",
    },
    {
      height: 0.7155669579709399,
      time: "2021-10-06T05:26:00+00:00",
      type: "high",
    },
    {
      height: -0.6857326756370448,
      time: "2021-10-06T11:41:00+00:00",
      type: "low",
    },
    {
      height: 1.028503105804472,
      time: "2021-10-06T17:29:00+00:00",
      type: "high",
    },
    {
      height: -0.9264832334555565,
      time: "2021-10-07T00:13:00+00:00",
      type: "low",
    },
    {
      height: 0.8326975931728775,
      time: "2021-10-07T05:54:00+00:00",
      type: "high",
    },
    {
      height: -0.841597966658043,
      time: "2021-10-07T12:15:00+00:00",
      type: "low",
    },
    {
      height: 1.0906551874112071,
      time: "2021-10-07T18:08:00+00:00",
      type: "high",
    },
    {
      height: -0.8892987646010603,
      time: "2021-10-08T00:44:00+00:00",
      type: "low",
    },
    {
      height: 0.9284417702320107,
      time: "2021-10-08T06:24:00+00:00",
      type: "high",
    },
    {
      height: -0.9604684404821714,
      time: "2021-10-08T12:51:00+00:00",
      type: "low",
    },
    {
      height: 1.082959605340805,
      time: "2021-10-08T18:48:00+00:00",
      type: "high",
    },
    {
      height: -0.8105556913795363,
      time: "2021-10-09T01:16:00+00:00",
      type: "low",
    },
    {
      height: 0.9878810080864338,
      time: "2021-10-09T06:57:00+00:00",
      type: "high",
    },
    {
      height: -1.0262132088258746,
      time: "2021-10-09T13:30:00+00:00",
      type: "low",
    },
    {
      height: 0.9999100956039005,
      time: "2021-10-09T19:30:00+00:00",
      type: "high",
    },
    {
      height: -0.6943808760944408,
      time: "2021-10-10T01:49:00+00:00",
      type: "low",
    },
    {
      height: 0.9986507657188286,
      time: "2021-10-10T07:33:00+00:00",
      type: "high",
    },
    {
      height: -1.0290522829867448,
      time: "2021-10-10T14:14:00+00:00",
      type: "low",
    },
    {
      height: 0.8471932513456184,
      time: "2021-10-10T20:15:00+00:00",
      type: "high",
    },
    {
      height: -0.5481285681521904,
      time: "2021-10-11T02:23:00+00:00",
      type: "low",
    },
    {
      height: 0.9542721295763691,
      time: "2021-10-11T08:12:00+00:00",
      type: "high",
    },
    {
      height: -0.970258586149165,
      time: "2021-10-11T15:03:00+00:00",
      type: "low",
    },
    {
      height: 0.6437524780749798,
      time: "2021-10-11T21:06:00+00:00",
      type: "high",
    },
    {
      height: -0.3828703244524554,
      time: "2021-10-12T03:02:00+00:00",
      type: "low",
    },
    {
      height: 0.8568446352110798,
      time: "2021-10-12T08:55:00+00:00",
      type: "high",
    },
    {
      height: -0.8665751298569487,
      time: "2021-10-12T16:02:00+00:00",
      type: "low",
    },
    {
      height: 0.4254832777229538,
      time: "2021-10-12T22:09:00+00:00",
      type: "high",
    },
  ],
  meta: {
    cost: 1,
    dailyQuota: 50,
    datum: "MSL",
    end: "2021-10-13 00:00",
    lat: 1.357107,
    lng: 103.8194992,
    requestCount: 4,
    start: "2021-10-03 00:00",
    station: {
      distance: 9,
      lat: 1.3,
      lng: 103.767,
      name: "west coast",
      source: "sg",
    },
  },
};

////SAMPLE MAP DATA////////////////
// {
//   "type": "FeatureCollection",
//   "features": [
//     {
//       "type": "Feature",
//       "properties": {
//         "datasource": {
//           "sourcename": "openstreetmap",
//           "attribution": "© OpenStreetMap contributors",
//           "license": "Open Database License",
//           "url": "https://www.openstreetmap.org/copyright"
//         },
//         "housenumber": "38",
//         "street": "Upper Montagu Street",
//         "suburb": "Marylebone",
//         "city": "Westminster",
//         "county": "Greater London",
//         "state": "England",
//         "postcode": "W1H 1LJ",
//         "country": "United Kingdom",
//         "country_code": "gb",
//         "lon": -0.16030636023550826,
//         "lat": 51.52016005,
//         "formatted": "38 Upper Montagu Street, Westminster W1H 1LJ, United Kingdom",
//         "address_line1": "38 Upper Montagu Street",
//         "address_line2": "Westminster W1H 1LJ, United Kingdom",
//         "state_code": "ENG",
//         "category": "building.residential",
//         "result_type": "building",
//         "rank": {
//           "importance": 0.811,
//           "popularity": 8.988490181891963,
//           "confidence": 1,
//           "confidence_city_level": 1,
//           "confidence_street_level": 1,
//           "match_type": "full_match"
//         },
//         "place_id": "51dcb14637eb84c4bf59c6b7c19a94c24940f00102f901370cef1100000000c00203"
//       },
//       "geometry": {
//         "type": "Point",
//         "coordinates": [
//           -0.16030636023550826,
//           51.52016005
//         ]
//       },
//       "bbox": [
//         -0.160394,
//         51.5201061,
//         -0.1602251,
//         51.5202273
//       ]
//     }
//   ],
//   "query": {
//     "text": "38 Upper Montagu Street, Westminster W1H 1LJ, United Kingdom",
//     "parsed": {
//       "housenumber": "38",
//       "street": "upper montagu street",
//       "postcode": "w1h 1lj",
//       "district": "westminster",
//       "country": "united kingdom",
//       "expected_type": "building"
//     }
//   }
// }
