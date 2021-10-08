// GA SEI 32 Project 2: FrontEnd with API
// ZY, 4 Oct 2021

import React from "react";
import styled from "styled-components";

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
    </>
  );
}

export default Home;
