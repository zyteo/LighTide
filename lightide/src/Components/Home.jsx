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
  padding: 8px;
  margin: 8px 2px;
  border-radius: 6px;
  box-sizing: border-box;
  font-size: 16px;
  background-color: ${(props) => (props.dark ? "black" : "white")};
  color: ${(props) => (props.dark ? "white" : "black")};

  @media only screen and (max-width: 600px) {
    border-radius: 6px;
    box-sizing: border-box;
    font-size: 14px;
    position: relative;
    background-color: ${(props) => (props.dark ? "black" : "white")};
    color: ${(props) => (props.dark ? "white" : "black")};
  }
  &:hover {
    background-color: rgb(228, 228, 228);
    cursor: pointer;
  }
  &:active {
    background-color: ${(props) => (props.dark ? "yellow" : "aqua")};
  }
`;
const LinkStyled = styled(Link)`
  text-decoration: none;
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

      <LinkStyled to="/maps">
        <Button dark={darkMode ? true : false}>
          {text[language].homeButton}{" "}
        </Button>
      </LinkStyled>

      <hr></hr>
    </>
  );
}

export default Home;
