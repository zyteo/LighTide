import { useState, useRef } from "react";
import "./App.css";
import Attribution from "./Components/Attribution";
import Home from "./Components/Home";
import Nav from "./Components/Nav";
import SearchDetails from "./Components/SearchDetails";

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

  //////////////////////////////// End of handle functions ////////////////////////////////////////////

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
      <Attribution darkMode={darkMode} language={language} />
    </div>
  );
}

export default App;
