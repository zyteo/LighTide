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

  // for sunrise/sunset data
  useEffect(() => {
    fetch(
      `https://api.sunrise-sunset.org/json?lat=${coordinates.lat}&lng=${coordinates.long}&date=${date}`
    )
      .then((response) => response.json())
      .then((data) => setSun(data));
  });

  // for geocoding
  useEffect(() => {
    //geocode API
    fetch(
      "https://api.geoapify.com/v1/geocode/search?text=38%20Upper%20Montagu%20Street%2C%20Westminster%20W1H%201LJ%2C%20United%20Kingdom&apiKey="
    )
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  });

  return (
    <div className="App">
      <p>Testing</p>
      <Sun />
      <Tides tide={"8m"} />
      <Attribution />
    </div>
  );
}

export default App;
