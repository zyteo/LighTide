// GA SEI 32 Project 2: FrontEnd with API
// ZY, 1 Oct 2021
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Route } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "./App.css";
import Attribution from "./Components/Attribution";
import Home from "./Components/Home";
import Map from "./Components/Maps";
import Nav from "./Components/Nav";
import Sun from "./Components/Sun";
import Tides from "./Components/Tides";

const Input = styled.input`
  padding: 3px 3px;
  margin: 6px 2px;
  border: 1px solid black;
  border-radius: 6px;
  box-sizing: border-box;
  cursor: pointer;
  font-size: 16px;

  @media only screen and (max-width: 600px) {
    
    border: 1px solid black;
    border-radius: 6px;
    box-sizing: border-box;
    cursor: pointer;
    font-size: 14px;
    position:relative;
  
}

  }
`;
const SearchInput = styled(Input)`
  &:hover {
    background-color: rgb(228, 228, 228);
  }
  &:active {
    background-color: grey;
  }
`;
const Button = styled.button`
  padding: 3px 3px;
  margin: 6px 2px;
  border: 1px solid black;
  border-radius: 6px;
  box-sizing: border-box;
  cursor: pointer;
  font-size: 16px;

  @media only screen and (max-width: 600px) {
    border: 1px solid black;
    border-radius: 6px;
    box-sizing: border-box;
    cursor: pointer;
    font-size: 14px;
    position: relative;
  }

  &:hover {
    background-color: rgb(228, 228, 228);
  }
  &:active {
    background-color: grey;
  }
`;
const Label = styled.label`
  padding: 10px 5px;
  font-size: 16px;
`;

const LinkStyled = styled(Link)`
  text-decoration: none;
  color: black;
`;

const Results = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

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
  const [tide, setTide] = useState(tidedata);
  const inputTextSearch = useRef();
  const [cleanedText, setCleanedText] = useState("Singapore");
  const [toggle, setToggle] = useState(false);
  //////////////////////////////// End of useState/useRef ///////////////////////////////////////////

  //////////////////////////////// Start of handle functions ////////////////////////////////////////////
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
  //////////////////////////////// End of handle functions ////////////////////////////////////////////

  //////////////////////////////// Start of useEffect ////////////////////////////////////////////
  // To get sun + tides data for particular lat/long/date
  useEffect(() => {
    // for sunrise/sunset data
    axios
      .get(
        `https://api.sunrise-sunset.org/json?lat=${coordinates.lat}&lng=${coordinates.long}&date=${date}&formatted=0`
      )
      .then((response) => {
        setSun(response.data);
      });

    //////////////for tide data
    axios
      .get(
        `https://api.stormglass.io/v2/tide/extremes/point?lat=${coordinates.lat}&lng=${coordinates.long}&start=${date}&key=${process.env.REACT_APP_TIDE_API_KEY}`
      )
      .then((response) => {
        setTide(response.data);
      });
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
  //////////////////////////////// End of useEffect ////////////////////////////////////////////

  return (
    <>
      <div className="App">
        <Nav />
        <main>
          <Route exact path="/">
            <Home />
            <Attribution />
          </Route>

          <Route path="/maps">
            <Label for="start">Date:</Label>
            <Input
              type="date"
              id="date"
              name="selectdate"
              min="2000-01-01"
              max="2100-12-31"
              onChange={handleDateChange}
            />
            <Label>Locate a place:</Label>
            <Input
              type="text"
              ref={inputTextSearch}
              placeholder="Address / Place name"
            />
            <SearchInput type="submit" value="Search" onClick={handleSearch} />

            <Map
              coordinates={coordinates}
              setCoordinates={setCoordinates}
              cleanedText={cleanedText}
            />
            <Button type="submit" onClick={handleToggle}>
              <LinkStyled to="/results">Get details!</LinkStyled>
            </Button>
            <Attribution />
          </Route>
          <Route path="/results">
            <h3>Date: {date}</h3>
            <h3>
              Results for {coordinates.lat} (latitude), {coordinates.long}
              (longitude)
            </h3>
            <Results>
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
            </Results>
            <Attribution />
          </Route>
        </main>
      </div>
    </>
  );
}

export default App;

const tidedata = {
  data: [
    {
      height: -0.5481271413265432,
      time: "2021-10-11T02:23:00+00:00",
      type: "low",
    },
    {
      height: 0.9542709126572888,
      time: "2021-10-11T08:12:00+00:00",
      type: "high",
    },
    {
      height: -0.9702584786076517,
      time: "2021-10-11T15:03:00+00:00",
      type: "low",
    },
    {
      height: 0.6437524396012805,
      time: "2021-10-11T21:06:00+00:00",
      type: "high",
    },
    {
      height: -0.38286853288612077,
      time: "2021-10-12T03:02:00+00:00",
      type: "low",
    },
    {
      height: 0.856843397740316,
      time: "2021-10-12T08:55:00+00:00",
      type: "high",
    },
    {
      height: -0.8665751175958126,
      time: "2021-10-12T16:02:00+00:00",
      type: "low",
    },
    {
      height: 0.4254832763789981,
      time: "2021-10-12T22:09:00+00:00",
      type: "high",
    },
    {
      height: -0.21446594033693225,
      time: "2021-10-13T03:49:00+00:00",
      type: "low",
    },
    {
      height: 0.7202437172028018,
      time: "2021-10-13T09:47:00+00:00",
      type: "high",
    },
    {
      height: -0.7552630050571855,
      time: "2021-10-13T17:17:00+00:00",
      type: "low",
    },
    {
      height: 0.2611820989878146,
      time: "2021-10-13T23:45:00+00:00",
      type: "high",
    },
    {
      height: -0.07053629845224806,
      time: "2021-10-14T05:02:00+00:00",
      type: "low",
    },
    {
      height: 0.5805733683999623,
      time: "2021-10-14T11:02:00+00:00",
      type: "high",
    },
    {
      height: -0.6950263121196545,
      time: "2021-10-14T18:52:00+00:00",
      type: "low",
    },
    {
      height: 0.25664790256036535,
      time: "2021-10-15T01:54:00+00:00",
      type: "high",
    },
    {
      height: -0.01732096490808871,
      time: "2021-10-15T07:00:00+00:00",
      type: "low",
    },
    {
      height: 0.5213482117967395,
      time: "2021-10-15T12:49:00+00:00",
      type: "high",
    },
    {
      height: -0.7245328571377131,
      time: "2021-10-15T20:28:00+00:00",
      type: "low",
    },
    {
      height: 0.357133980747398,
      time: "2021-10-16T03:12:00+00:00",
      type: "high",
    },
    {
      height: -0.1122906186137319,
      time: "2021-10-16T08:50:00+00:00",
      type: "low",
    },
    {
      height: 0.5832833414990704,
      time: "2021-10-16T14:21:00+00:00",
      type: "high",
    },
    {
      height: -0.7941103347209432,
      time: "2021-10-16T21:40:00+00:00",
      type: "low",
    },
    {
      height: 0.46451544686117824,
      time: "2021-10-17T03:57:00+00:00",
      type: "high",
    },
    {
      height: -0.27394007745933613,
      time: "2021-10-17T09:56:00+00:00",
      type: "low",
    },
    {
      height: 0.6870870630903098,
      time: "2021-10-17T15:26:00+00:00",
      type: "high",
    },
    {
      height: -0.8403781718434267,
      time: "2021-10-17T22:31:00+00:00",
      type: "low",
    },
    {
      height: 0.5582795018446571,
      time: "2021-10-18T04:30:00+00:00",
      type: "high",
    },
    {
      height: -0.4353686332648437,
      time: "2021-10-18T10:42:00+00:00",
      type: "low",
    },
    {
      height: 0.7756509180674519,
      time: "2021-10-18T16:16:00+00:00",
      type: "high",
    },
    {
      height: -0.8425560614042679,
      time: "2021-10-18T23:10:00+00:00",
      type: "low",
    },
    {
      height: 0.6376382223175965,
      time: "2021-10-19T04:59:00+00:00",
      type: "high",
    },
    {
      height: -0.5751031170683268,
      time: "2021-10-19T11:18:00+00:00",
      type: "low",
    },
    {
      height: 0.8276247051170601,
      time: "2021-10-19T16:57:00+00:00",
      type: "high",
    },
    {
      height: -0.8049665821966621,
      time: "2021-10-19T23:42:00+00:00",
      type: "low",
    },
    {
      height: 0.7052101671958809,
      time: "2021-10-20T05:24:00+00:00",
      type: "high",
    },
    {
      height: -0.6873451842666715,
      time: "2021-10-20T11:49:00+00:00",
      type: "low",
    },
    {
      height: 0.8387108213765858,
      time: "2021-10-20T17:33:00+00:00",
      type: "high",
    },
  ],
  meta: {
    cost: 1,
    dailyQuota: 50,
    datum: "MSL",
    end: "2021-10-21 00:00",
    lat: 1.357107,
    lng: 103.8194992,
    requestCount: 3,
    start: "2021-10-11 00:00",
    station: {
      distance: 9,
      lat: 1.3,
      lng: 103.767,
      name: "west coast",
      source: "sg",
    },
  },
};
