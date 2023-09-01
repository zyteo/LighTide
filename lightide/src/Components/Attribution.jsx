// GA SEI 32 Project 2: FrontEnd with API
// ZY, 2 Oct 2021

import React from "react";
import styled from "styled-components";
import { text } from "../Localisation/text";

const A = styled.a`
  text-decoration: none;
  color: black;
`;
const Span = styled.span`
  color: ${(props) => (props.dark ? "gold" : "blue")};
  border-radius: 10px;
  &:hover {
    background-color: ${(props) => (props.dark ? "blue" : "gold")};
    cursor: pointer;
  }
  &:active {
    background-color: yellowgreen;
  }
`;
const P = styled.p`
  margin: 4px;
`;

function Attribution({ darkMode, language }) {
  return (
    <footer className="attribution">
      <P>
        {text[language].attributionText}
        <A href="https://sunrise-sunset.org/" target="_blank">
          <Span dark={darkMode ? true : false}> Sunrise Sunset,</Span>
        </A>
        <A href="https://stormglass.io/marine-weather/" target="_blank">
          <Span dark={darkMode ? true : false}> Stormglass,</Span>
        </A>
        <A href="https://www.geoapify.com/" target="_blank">
          <Span dark={darkMode ? true : false}> Geoapify</Span>
        </A>
      </P>
      <P>
        <strong>{text[language].attributionWarning}</strong>
        <em> {text[language].attributionReminder}</em>
      </P>
      {text[language].attributionLink}
      <A href="https://github.com/zyteo/LighTide" target="_blank">
        <Span dark={darkMode ? true : false}>
          {text[language].attributionLinkSpan}
        </Span>
      </A>
    </footer>
  );
}

export default Attribution;
