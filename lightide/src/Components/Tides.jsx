// GA SEI 32 Project 2: FrontEnd with API
// ZY, 1 Oct 2021

import React from "react";

function Tides({ tide }) {
  return (
    <div className="tides">
      <p>Tides:</p>
      {tide}
    </div>
  );
}

export default Tides;
