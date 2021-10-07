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
  background-color: lightblue;
  &:hover {
    background-color: cyan;
  }
`;
const Li = styled.li`
  display: flex;
  justify-content: center;
  text-align: center;
  padding: 14px 36px;
  font-size: 16px;
  border-radius: 20px;
  &:hover {
    background-color: pink;
  }
`;
function Nav() {
  return (
    <>
      <Navbar>
        <Li>
          <Link to="/" style={{ textDecoration: 'none' }}>Home</Link>
        </Li>
        <Li>
          <Link to="/maps" style={{ textDecoration: 'none' }}>LighTide</Link>
        </Li>
        <Li>
          <Link to="/results" style={{ textDecoration: 'none' }}>Results</Link>
        </Li>
      </Navbar>
    </>
  );
}

export default Nav;
