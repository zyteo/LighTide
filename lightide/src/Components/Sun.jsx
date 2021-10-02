// GA SEI 32 Project 2: FrontEnd with API
// ZY, 1 Oct 2021

import React from "react";

function Sun({ sr, ss, sn, dl, ctb, cte, ntb, nte, atb, ate }) {
  return (
    <div className="sun">
      <ol>Sunrise & Sunset:</ol>
      <li> Sunrise: {sr}</li>
      <li> Sunset: {ss}</li>
      <li> Solar noon: {sn}</li>
      <li> Day length: {dl}</li>
      <li> Civil twilight begin: {ctb}</li>
      <li> Civil twilight end: {cte}</li>
      <li> Nautical twilight begin: {ntb}</li>
      <li> Nautical twilight end: {nte}</li>
      <li> Astronomical twilight begin: {atb}</li>
      <li> Astronomical twilight end: {ate}</li>
    </div>
  );
}

export default Sun;
