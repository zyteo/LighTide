// GA SEI 32 Project 2: FrontEnd with API
// ZY, 29 Jul 2023
import styled from "styled-components";
import { text } from "../Localisation/text";

const Input = styled.input`
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
    position:relative;
}
  }
`;
const SearchInput = styled(Input)`
  padding: 3px;
  margin: 8px 2px;
  border-radius: 6px;
  box-sizing: border-box;
  font-size: 16px;

  @media only screen and (max-width: 600px) {
    border-radius: 6px;
    box-sizing: border-box;
    font-size: 14px;
    position: relative;
  }
  &:hover {
    background-color: rgb(228, 228, 228);
    cursor: pointer;
  }
  &:active {
    background-color: ${(props) => (props.dark ? "yellow" : "aqua")};
  }
`;
const Label = styled.label`
  padding: 10px 5px;
  font-size: 16px;
`;

function SearchDetails({
  handleDateChange,
  inputTextSearch,
  darkMode,
  language,
  handleSearch,
}) {
  return (
    <>
      <Label for="start">{text[language].searchDetailsDate}</Label>
      <Input
        type="date"
        id="date"
        name="selectdate"
        min="2000-01-01"
        max="2100-12-31"
        onChange={handleDateChange}
      />
      <Label>{text[language].searchDetailsLocation}</Label>
      <Input
        type="text"
        ref={inputTextSearch}
        placeholder={text[language].searchPlaceholder}
      />
      <SearchInput
        dark={darkMode ? true : false}
        type="submit"
        value={text[language].searchDetailsButton}
        onClick={handleSearch}
      />
    </>
  );
}

export default SearchDetails;
