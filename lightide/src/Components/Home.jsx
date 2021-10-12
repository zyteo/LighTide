// GA SEI 32 Project 2: FrontEnd with API
// ZY, 4 Oct 2021

import React from "react";
import styled from "styled-components";
const P = styled.p`
  margin: 8px;
`;

function Home() {
  return (
    <>
      <h1>Welcome to LighTide Maps!</h1>
      <h2>
        Get sunrise / sunset & tide details based on the location and date.
      </h2>
      <P>
        1. Search a place / Select a point on the map to pinpoint a location.
      </P>
      <P>2. Choose a date. By default, the date is set to today.</P>
      <P>3. Select "Get details!" to retrieve the information.</P>
      <P>Note that tide requests are capped at 50 per day.</P>
      <hr></hr>
    </>
  );
}

export default Home;
