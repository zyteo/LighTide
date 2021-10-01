// GA SEI 32 Project 2: FrontEnd with API 
// ZY, 1 Oct 2021
import React, { useEffect } from "react";
import './App.css';
import Sun from "./Components/Sun";
import Tides from "./Components/Tides";

function App() {


  useEffect(()=>{
    //geocode API
fetch("https://api.geoapify.com/v1/geocode/search?text=38%20Upper%20Montagu%20Street%2C%20Westminster%20W1H%201LJ%2C%20United%20Kingdom&apiKey=")
.then(response => response.json())
.then(result => console.log(result))
.catch(error => console.log('error', error));
  })
  return (
    <div className="App">
      <p>Testing</p>
      <Sun/>
      <Tides/>
    </div>
  );
}

export default App;
