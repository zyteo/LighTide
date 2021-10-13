// GA SEI 32 Project 2: FrontEnd with API
// ZY, 4 Oct 2021

import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
const P = styled.p`
  margin: 8px;
`;
const Button = styled.button`
  padding: 3px 3px;
  margin: 6px 2px;
  border: 1px solid black;
  border-radius: 6px;
  box-sizing: border-box;
  cursor: pointer;
  font-size: 16px;

  @media only screen and (max-width: 600px) {
    border: 1px solid black;
    border-radius: 6px;
    box-sizing: border-box;
    cursor: pointer;
    font-size: 14px;
    position: relative;
  }

  &:hover {
    background-color: rgb(228, 228, 228);
  }
  &:active {
    background-color: grey;
  }
`;
const LinkStyled = styled(Link)`
  text-decoration: none;
  color: black;
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
      <Button>
        <LinkStyled to="/maps">Let's Go!</LinkStyled>
      </Button>
      <hr></hr>
    </>
  );
}

export default Home;
