// GA SEI 32 Project 2: FrontEnd with API
// ZY, 4 Oct 2021

import React from "react";
import styled from "styled-components";
import TideExceed from "./tide_exceed.PNG";
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
      <P>
        Note that tide requests are capped at 50 per day.
      </P>
      <img src={TideExceed} alt="..." />
      <P>If you see a screen like this, it means the tide request limit has been reached.</P>
    </>
  );
}

export default Home;
