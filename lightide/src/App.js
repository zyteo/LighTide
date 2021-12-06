// GA SEI 32 Project 2: FrontEnd with API
// ZY, 1 Oct 2021

import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "./App.css";
import Attribution from "./Components/Attribution";
import Chart from "./Components/Chart";
import Home from "./Components/Home";
import Map from "./Components/Maps";
import Nav from "./Components/Nav";
import Sun from "./Components/Sun";
import Tides from "./Components/Tides";
import Datetimeformat from "./Components/Datetimeformat";

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
    background-color: ${(props) => (props.dark ? "yellow" : "aqua")};
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
    background-color: ${(props) => (props.dark ? "yellow" : "aqua")};
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
  const [tide, setTide] = useState("");
  const inputTextSearch = useRef();
  const [cleanedText, setCleanedText] = useState("Singapore");
  const [toggle, setToggle] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
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
  // toggle for the "get details" button
  const handleToggle = () => {
    setToggle(!toggle);
    console.log("getting sun/tide data...");
  };
  // for dark mode on Navbar
  const handleDarkMode = () => {
    if (darkMode === true) {
      document.body.classList.remove("dark");
      setDarkMode(false);
    } else {
      document.body.classList.add("dark");
      setDarkMode(true);
    }
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

    //for tide data
    axios
      .get(
        `https://api.stormglass.io/v2/tide/extremes/point?lat=${coordinates.lat}&lng=${coordinates.long}&start=${date}&key=${process.env.REACT_APP_TIDE_API_KEY}`
      )
      .then((response) => {
        setTide(response.data);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cleanedText]);
  //////////////////////////////// End of useEffect ////////////////////////////////////////////

  return (
    <>
      <div className="App">
        <Nav handleDarkMode={handleDarkMode} />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <>
                <Home darkMode={darkMode} />
                <Attribution darkMode={darkMode} />
              </>
            }
          />
          <Route
            path="/maps"
            element={
              <>
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
                <SearchInput
                  dark={darkMode ? true : false}
                  type="submit"
                  value="Search"
                  onClick={handleSearch}
                />
                <Map
                  coordinates={coordinates}
                  setCoordinates={setCoordinates}
                  cleanedText={cleanedText}
                  tide={tide}
                />
                <Button
                  dark={darkMode ? true : false}
                  type="submit"
                  onClick={handleToggle}
                >
                  <LinkStyled to="/results">Get Details!</LinkStyled>
                </Button>
                <Attribution darkMode={darkMode} />
              </>
            }
          />
          <Route
            path="/results"
            element={
              <>
                <h3>
                  Date: {date}
                </h3>
                <h3>
                  Results for {coordinates?.lat} (latitude), {coordinates?.long}
                  (longitude)
                </h3>
                <Results>
                  <Sun
                    results={sun?.results}
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
                  <Chart tide={tide} />
                  <Tides tide={tide} darkMode={darkMode} />
                </Results>
                <Attribution darkMode={darkMode} />
              </>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
