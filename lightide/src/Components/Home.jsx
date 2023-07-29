// GA SEI 32 Project 2: FrontEnd with API
// ZY, 4 Oct 2021

import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { text } from "../Localisation/text";

const P = styled.p`
  margin: 8px;
`;
const Button = styled.button`
  padding: 3px 3px;
  margin: 6px 2px;
  border-radius: 6px;
  box-sizing: border-box;
  font-size: 16px;
  background-color: ${(props) => (props.dark ? "darkgray" : "white")};
  color: ${(props) => (props.dark ? "white" : "black")};

  @media only screen and (max-width: 600px) {
    border-radius: 6px;
    box-sizing: border-box;
    font-size: 14px;
    position: relative;
    background-color: ${(props) => (props.dark ? "darkgray" : "white")};
    color: ${(props) => (props.dark ? "white" : "black")};
  }
  &:hover {
    background-color: rgb(228, 228, 228);
  }
  &:active {
    background-color: ${(props) => (props.dark ? "yellow" : "aqua")};
  }
`;
const LinkStyled = styled(Link)`
  text-decoration: none;
  color: black;
`;

function Home({ darkMode, language }) {
  return (
    <>
      <h1>{text[language].homeWelcome}</h1>
      <h2>{text[language].homeIntro}</h2>
      <P>{text[language].home1}</P>
      <P>{text[language].home2}</P>
      <P>{text[language].home3}</P>
      <P>{text[language].homeNote}</P>
      <Button dark={darkMode ? true : false}>
        <LinkStyled to="/maps">{text[language].homeButton}</LinkStyled>
      </Button>
      <hr></hr>
    </>
  );
}

export default Home;
