// GA SEI 32 Project 2: FrontEnd with API
// ZY, 4 Oct 2021

import React from "react";
import styled from "styled-components";
import TideExceed from "./Tide_exceed.PNG";
const P = styled.p`
  margin: 20px;
`;

function Home() {
  return (
    <>
      <h1>Welcome to LighTide Maps!</h1>
      <h2>Using this App</h2>
      <P>Search a place or select a point on the map to pinpoint a location.</P>
      <P>By default, the date is set to today.</P>
      <P>
        Retrieve sunrise/sunset and tide details based on the location and date
        selected.
      </P>
      <P>
        There is a limit on the number of API requests. In the event too many
        people use this website to retrieve information, the website might
        break.
      </P>
      <P>
        If you see a screen like this, please try again tomorrow. Tide requests
        are capped at 50 per day, although you can still retrieve sunrise/sunset information.
      </P>
      <img src={TideExceed} alt="..." />
    </>
  );
}

export default Home;
