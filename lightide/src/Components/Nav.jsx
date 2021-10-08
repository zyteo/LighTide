// GA SEI 32 Project 2: FrontEnd with API
// ZY, 5 Oct 2021

import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Navbar = styled.nav`
  display: flex;
  align-items: center;
  width: 100vw;
  height: 8vh;
  padding: 0 20px;
  background-color: lightskyblue;
  &:hover {
    background-color: lightblue;
  }
`;
const Li = styled.li`
  display: flex;
  justify-content: center;
  text-align: center;
  padding: 5px 26px;
  font-size: 16px;
  border-radius: 24px;
  &:hover {
    background-color: gold;
  }
  &:active {
    background-color: yellowgreen;
  }
`;
const LinkStyled = styled(Link)`
  text-decoration: none;
  color: black;
`;
function Nav() {
  return (
    <>
      <Navbar>
        <LinkStyled to="/">
          <Li>Home</Li>
        </LinkStyled>
        <LinkStyled to="/maps">
          <Li>LighTide</Li>
        </LinkStyled>
        <LinkStyled to="/results">
          <Li>Results</Li>
        </LinkStyled>
      </Navbar>
    </>
  );
}

export default Nav;
