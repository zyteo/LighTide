import { useState, useRef, useEffect } from "react";
import "./App.css";
import Attribution from "./Components/Attribution";
import Home from "./Components/Home";
import Nav from "./Components/Nav";
import SearchDetails from "./Components/SearchDetails";
import Map from "./Components/Maps";
import axios from "axios";
import Sun from "./Components/Sun";

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
  const tide = {};
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
    // use regex + replace to url encode symbols
    const processedSearchText = searchText
      .replace(/ /g, "%20")
      .replace(/,/, "%2C")
      .replace(".", "%2E")
      .replace(/#/, "%23");
    setProcessedText(processedSearchText);
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
    //geocode API
    axios
      .get(
        `https://api.geoapify.com/v1/geocode/search?text=${processedText}&lang=en&limit=1&apiKey=${process.env.REACT_APP_GEOAPIFY_API_KEY}`
      )
      .then((response) => {
        setCoordinates({
          long: response.data.features[0].properties.lon,
          lat: response.data.features[0].properties.lat,
        });
      });
    console.log("updated", coordinates.lat, coordinates.long);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [processedText]);

  // To get sun + tides data for particular lat/long/date
  useEffect(() => {
    // for sunrise/sunset data
    axios
      .get(
        `https://api.sunrise-sunset.org/json?lat=${coordinates.lat}&lng=${coordinates.long}&date=${date}&formatted=0`
      )
      .then((response) => {
        setSunDetails(response.data);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toggle]);
  //////////////////////////////// End of useEffect ////////////////////////////////////////////
  return (
    <div className="App">
      <Nav
        handleDarkMode={handleDarkMode}
        language={language}
        setLanguage={setLanguage}
      />
      <Home darkMode={darkMode} language={language} />
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
      <button type="button" onClick={handleToggle}>
        Get details
      </button>
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
      />

      <Attribution darkMode={darkMode} language={language} />
    </div>
  );
}

export default App;
