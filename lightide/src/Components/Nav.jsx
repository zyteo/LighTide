// GA SEI 32 Project 2: FrontEnd with API
// ZY, 5 Oct 2021

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { text } from "../Localisation/text";

const Navbar = styled.nav`
  display: flex;
  align-items: center;
  padding: 0 20px;
  background-color: lightskyblue;
  @media screen and (max-width: 550px) {
    padding: 0 10px;
  }
  @media screen and (max-width: 370px) {
    padding: 0 2px;
  }
`;

const LinkStyled = styled(Link)`
  text-decoration: none;
  color: black;
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
  @media screen and (max-width: 550px) {
    padding: 5px 10px;
    font-size: 12px;
  }
  @media screen and (max-width: 370px) {
    padding: 2px 4px;
    font-size: 10px;
  }
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
  @media screen and (max-width: 550px) {
    margin-left: 10px;
    font-size: 12px;
  }
  @media screen and (max-width: 370px) {
    margin-left: 2px;
    font-size: 10px;
  }
`;

const Option = styled.option`
  font-size: 16px;
  @media screen and (max-width: 550px) {
    font-size: 12px;
  }
  @media screen and (max-width: 370px) {
    font-size: 10px;
  }
`;
function Nav({ handleDarkMode, language, setLanguage }) {
  const handleLanguage = (event) => {
    setLanguage(event.target.value);
  };
  return (
    <>
      <Navbar>
        <LinkStyled to="/">{text[language].navHome}</LinkStyled>
        <LinkStyled to="/maps">{text[language].navLT}</LinkStyled>
        <LinkStyled to="/results">{text[language].navResults}</LinkStyled>
        <CheckBoxWrapper>
          <CheckBox
            id="checkbox"
            type="checkbox"
            label="darkmode"
            aria-label="darkmode"
            onClick={handleDarkMode}
          />
          <CheckBoxLabel htmlFor="checkbox" />
        </CheckBoxWrapper>
        &#127769;
        <Select onChange={(event) => handleLanguage(event)} label="Language">
          <Option value="English" label="English">
            <label>English</label>
          </Option>
          <Option value="简体中文" label="简体中文">
            <label>简体中文</label>
          </Option>
          <Option value="繁体中文" label="繁体中文">
            <label>繁体中文</label>
          </Option>
        </Select>
      </Navbar>
    </>
  );
}

export default Nav;
