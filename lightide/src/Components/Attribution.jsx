// GA SEI 32 Project 2: FrontEnd with API
// ZY, 2 Oct 2021

import React from "react";

function Attribution() {
  return (
    <footer className="attribution">
      <p>
        API Attribution:
        <a href="https://sunrise-sunset.org/">
          <span style={{ color: "green" }}> Sunrise Sunset,</span>
        </a> 
        <a href="https://stormglass.io/marine-weather/">
          <span style={{ color: "lightblue" }}>Stormglass,</span>
        </a> 
        <a href="https://www.geoapify.com/">
          <span style={{ color: "lightblue" }}>Geoapify</span>
        </a>
      </p>
      <p>
        Nature is unpredictable. Use the information presented at your own risk.
      </p>
    </footer>
  );
}

export default Attribution;
