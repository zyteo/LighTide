// GA SEI 32 Project 2: FrontEnd with API
// ZY, 5 Oct 2021

import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { text } from "../Localisation/text";

const Navbar = styled.nav`
  display: flex;
  align-items: center;
  width: 100vw;
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
// To toggle dark mode
const CheckBoxWrapper = styled.div`
  position: relative;
`;
const CheckBoxLabel = styled.label`
  position: absolute;
  top: 5px;
  left: 2px;
  width: 39px;
  height: 20px;
  border-radius: 14px;
  background: rgb(133, 143, 143);
  cursor: pointer;
  &::after {
    content: "";
    display: block;
    border-radius: 50%;
    width: 15px;
    height: 15px;
    margin: 3px;
    background: #ffffff;
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition: 0.5s;
  }
`;
const CheckBox = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 42px;
  height: 26px;
  &:checked + ${CheckBoxLabel} {
    background: #4fbe79;
    &::after {
      content: "";
      display: block;
      border-radius: 50%;
      width: 15px;
      height: 15px;
      margin-left: 21px;
      transition: 0.5s;
    }
  }
`;

const Select = styled.select`
  margin-left: 20px;
  font-size: 16px;
`;

const Option = styled.option`
  font-size: 16px;
`;
function Nav({ handleDarkMode, language, setLanguage }) {
  const handleLanguage = (event) => {
    setLanguage(event.target.value);
  };
  return (
    <>
      <Navbar>
        <LinkStyled to="/">
          <Li>{text[language].navHome}</Li>
        </LinkStyled>
        <LinkStyled to="/maps">
          <Li>{text[language].navLT}</Li>
        </LinkStyled>
        <LinkStyled to="/results">
          <Li>{text[language].navResults}</Li>
        </LinkStyled>
        <CheckBoxWrapper>
          <CheckBox id="checkbox" type="checkbox" onClick={handleDarkMode} />
          <CheckBoxLabel htmlFor="checkbox" />
        </CheckBoxWrapper>
        &#127769;
        <Select onClick={(event) => handleLanguage(event)}>
          <Option value="English">English</Option>
          <Option value="简体中文">简体中文</Option>
          <Option value="繁体中文">繁体中文</Option>
        </Select>
      </Navbar>
    </>
  );
}

export default Nav;
