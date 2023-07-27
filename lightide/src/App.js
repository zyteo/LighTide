import { useState } from "react";
import "./App.css";
import Attribution from "./Components/Attribution";
import Home from "./Components/Home";
import Nav from "./Components/Nav";

function App() {
  //////////////////////////////// Start of useState/useRef ///////////////////////////////////////////
  const [darkMode, setDarkMode] = useState(false);
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
  //////////////////////////////// End of handle functions ////////////////////////////////////////////

  return (
    <div className="App">
      <Nav handleDarkMode={handleDarkMode} />
      <Home darkMode={darkMode} />
      <Attribution darkMode={darkMode} />
    </div>
  );
}

export default App;
