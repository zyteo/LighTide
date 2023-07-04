import { useState } from "react";
import "./App.css";
import Attribution from "./Components/Attribution";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  return <div className="App">
    <Attribution darkMode={darkMode} />
  </div>;
}

export default App;
