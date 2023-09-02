import { useState, useRef, useEffect } from "react";
import "./App.css";
import Attribution from "./Components/Attribution";
import Home from "./Components/Home";
import Nav from "./Components/Nav";
import SearchDetails from "./Components/SearchDetails";
import Map from "./Components/Maps";
import axios from "axios";
import Sun from "./Components/Sun";
import { Link, Route, Routes, Navigate } from "react-router-dom";
import Tides from "./Components/Tides";
import Chart from "./Components/Chart";
import { styled } from "styled-components";
import { text } from "./Localisation/text";

const Results = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;
const Button = styled.button`
  padding: 8px;
  margin: 8px 2px;
  border-radius: 6px;
  box-sizing: border-box;
  font-size: 16px;
  background-color: ${(props) => (props.dark ? "black" : "white")};
  color: ${(props) => (props.dark ? "white" : "black")};

  @media only screen and (max-width: 600px) {
    border-radius: 6px;
    box-sizing: border-box;
    font-size: 14px;
    position: relative;
    background-color: ${(props) => (props.dark ? "black" : "white")};
    color: ${(props) => (props.dark ? "white" : "black")};
  }
  &:hover {
    background-color: rgb(228, 228, 228);
    cursor: pointer;
  }
  &:active {
    background-color: ${(props) => (props.dark ? "yellow" : "aqua")};
  }
`;
const LinkStyled = styled(Link)`
  text-decoration: none;
`;
// get today's date
const todayDateTime = new Date();
const yyyy = todayDateTime.getFullYear();
const mm = todayDateTime.getMonth() + 1;
const dd = todayDateTime.getDate();
const todayDate = `${yyyy}-${mm}-${dd}`;

function App() {
  //////////////////////////////// Start of useState/useRef ///////////////////////////////////////////
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("English");
  const [date, setDate] = useState(todayDate);
  const inputTextSearch = useRef();
  const [processedText, setProcessedText] = useState("Singapore");
  const [coordinates, setCoordinates] = useState({
    lat: 1.357107,
    long: 103.8194992,
  });
  const [toggle, setToggle] = useState(false);
  const [sunDetails, setSunDetails] = useState();
  const [tide, setTide] = useState("");
  const [selectedCoordinates, setSelectedCoordinates] = useState({});
  const [selectedDate, setSelectedDate] = useState();
  const [searchTextLangugage, setSearchTextLanguage] = useState("en");
  // const tide = {};
  //////////////////////////////// End of useState/useRef ///////////////////////////////////////////

  //////////////////////////////// Start of handle functions ////////////////////////////////////////////
  const handleDarkMode = () => {
    if (darkMode === true) {
      document.body.classList.remove("dark");
      setDarkMode(false);
    } else {
      document.body.classList.add("dark");
      setDarkMode(true);
    }
  };

  // on changing the date field, update date state
  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  // on submitting search text for map, clean the text and update text state
  const handleSearch = () => {
    const searchText = inputTextSearch.current.value;
    // first browse through search text, if all english, set language to english.
    // should check it contains a to z, A to Z, 0 to 9, and space
    if (/^[a-zA-Z0-9 ]*$/.test(searchText) === true) {
      setSearchTextLanguage("en");
      // use regex + replace to url encode symbols
      const processedSearchText = searchText
        .replace(/ /g, "%20")
        .replace(/,/, "%2C")
        .replace(".", "%2E")
        .replace(/#/, "%23");
      setProcessedText(processedSearchText);
    } else {
      setSearchTextLanguage("zh");
      // need to split the text into individual characters, then add %20 in between
      const processedSearchText = searchText
        .split("")
        .join("%20")
        .replace(/,/, "%2C")
        .replace(".", "%2E")
        .replace(/#/, "%23");
      setProcessedText(processedSearchText);
    }
  };
  // toggle for the "get details" button
  const handleToggle = () => {
    setToggle(!toggle);
    console.log("getting sun/tide data...");
  };

  //////////////////////////////// End of handle functions ////////////////////////////////////////////

  //////////////////////////////// Start of useEffect ////////////////////////////////////////////
  // Geocoding - to get lat/long based on the text searched, renders on every processedText change
  useEffect(() => {
    // use the BE to get the geocode data
    axios
      .get(
        `https://lightide-be.vercel.app/api/geoapify?text=${processedText}&lang=${searchTextLangugage}`
      )
      .then((response) => {
        // if 400, means no results found. alert user
        if (response.data.error) {
          alert(text[language].alertNoResults);
        } else {
          setCoordinates({
            long: response.data.features[0].properties.lon,
            lat: response.data.features[0].properties.lat,
          });
        }
      });
    console.log("updated", coordinates.lat, coordinates.long);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [processedText]);

  // To get sun + tides data for particular lat/long/date
  useEffect(() => {
    // for sunrise/sunset data
    axios
      .get(
        `https://lightide-be.vercel.app/api/sun?lat=${coordinates.lat}&long=${coordinates.long}&date=${date}&formatted=0`
      )
      .then((response) => {
        setSunDetails(response.data);
      })
      .catch((error) => {
        console.log(error);
        alert(text[language].alertSunError);
      });

    //for tide data
    // use the BE to get the tide data
    axios
      .get(
        `https://lightide-be.vercel.app/api/tide?lat=${coordinates.lat}&long=${coordinates.long}&date=${date}`
      )
      .then((response) => {
        setTide(response.data);
      })
      .catch((error) => {
        console.log(error);
        alert(text[language].alertTideError);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setSelectedCoordinates({
      lat: coordinates.lat,
      long: coordinates.long,
    });
    setSelectedDate(date);
  }, [toggle]);

  //////////////////////////////// End of useEffect ////////////////////////////////////////////
  return (
    <div className="App">
      <Nav
        handleDarkMode={handleDarkMode}
        language={language}
        setLanguage={setLanguage}
      />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <>
              <Home darkMode={darkMode} language={language} />
              <Attribution darkMode={darkMode} language={language} />
            </>
          }
        />
        <Route
          path="/maps"
          element={
            <>
              <SearchDetails
                handleDateChange={handleDateChange}
                inputTextSearch={inputTextSearch}
                darkMode={darkMode}
                language={language}
                handleSearch={handleSearch}
              />
              <Map
                coordinates={coordinates}
                setCoordinates={setCoordinates}
                processedText={processedText}
                tide={tide}
                language={language}
              />

              <LinkStyled to="/results">
                <Button type="button" onClick={handleToggle}>
                  {text[language].appGetDetails}
                </Button>
              </LinkStyled>

              <Attribution darkMode={darkMode} language={language} />
            </>
          }
        />

        <Route
          path="/results"
          element={
            <>
              <Results>
                <Sun
                  results={sunDetails?.results}
                  sr={sunDetails?.results?.sunrise}
                  ss={sunDetails?.results?.sunset}
                  sn={sunDetails?.results?.solar_noon}
                  dl={sunDetails?.results?.day_length}
                  ctb={sunDetails?.results?.civil_twilight_begin}
                  cte={sunDetails?.results?.civil_twilight_end}
                  ntb={sunDetails?.results?.nautical_twilight_begin}
                  nte={sunDetails?.results?.nautical_twilight_end}
                  atb={sunDetails?.results?.astronomical_twilight_begin}
                  ate={sunDetails?.results?.astronomical_twilight_end}
                  language={language}
                  date={selectedDate}
                  coordinates={selectedCoordinates}
                />
                <Chart tide={tide} language={language} darkMode={darkMode} />
                <Tides tide={tide} darkMode={darkMode} language={language} />
              </Results>
              <Attribution darkMode={darkMode} language={language} />
            </>
          }
        />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
