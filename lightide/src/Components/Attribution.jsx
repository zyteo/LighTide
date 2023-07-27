// GA SEI 32 Project 2: FrontEnd with API
// ZY, 2 Oct 2021

import React from "react";
import styled from "styled-components";

const A = styled.a`
  text-decoration: none;
  color: black;
`;
const Span = styled.span`
  color: ${(props) => (props.dark ? "gold" : "blue")};
  border-radius: 10px;
  &:hover {
    background-color: ${(props) => (props.dark ? "blue" : "gold")};
  }
  &:active {
    background-color: yellowgreen;
  }
`;
const P = styled.p`
  margin: 4px;
`;

function Attribution({ darkMode }) {
  return (
    <footer className="attribution">
      <P>
        Attribution:
        <A href="https://sunrise-sunset.org/" target="_blank">
          <Span dark={darkMode ? true : false}> Sunrise Sunset,</Span>
        </A>
        <A href="https://stormglass.io/marine-weather/" target="_blank">
          <Span dark={darkMode ? true : false}> Stormglass,</Span>
        </A>
        <A href="https://www.geoapify.com/" target="_blank">
          <Span dark={darkMode ? true : false}> Geoapify,</Span>
        </A>
        <A href="https://www.mapbox.com/" target="_blank">
          <Span dark={darkMode ? true : false}> Mapbox</Span>
        </A>
      </P>
      <P>
        <strong>Nature is unpredictable.</strong>
        <em> Use the information presented at your own risk.</em>
      </P>
      Created Oct 2021 by ZY of GA SEI-32. Github code
      <A href="https://github.com/zyteo/LighTide" target="_blank">
        <Span dark={darkMode ? true : false}> here.</Span>
      </A>
    </footer>
  );
}

export default Attribution;
