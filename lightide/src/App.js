import { useState } from "react";
import "./App.css";
import Attribution from "./Components/Attribution";
import Nav from "./Components/Nav";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const handleDarkMode = () => {
    if (darkMode === true) {
      document.body.classList.remove("dark");
      setDarkMode(false);
    } else {
      document.body.classList.add("dark");
      setDarkMode(true);
    }
  };


  return <div className="App">
    <Nav handleDarkMode={handleDarkMode} />
    <Attribution darkMode={darkMode} />
  </div>;
}

export default App;
