// GA SEI 32 Project 2: FrontEnd with API
// ZY, 1 Oct 2021

import React from "react";
import styled from "styled-components";
import Datetimeformat from "./Datetimeformat";
import { text } from "../Localisation/text";

const Ul = styled.ul`
  list-style-type: none;
`;
const Li = styled.li`
  margin: 6px;
`;

// Sun takes in 10 props
function Sun({
  sr,
  ss,
  sn,
  dl,
  ctb,
  cte,
  ntb,
  nte,
  atb,
  ate,
  language,
  date,
  coordinates,
}) {
  const localtime = "dd MMM yyyy (eee) pppp";

  ////////////////////////convert day length in seconds to hours/mins/sec/////////////////
  let hours = Math.floor(dl / 3600);
  let mins = Math.floor((dl - hours * 3600) / 60);
  let seconds = dl - hours * 3600 - mins * 60;
  let daylength = `${hours} ${text[language].sunHours}, ${mins} ${text[language].sunMinutes}, ${seconds} ${text[language].sunSeconds}`;
  ////////////////////////end of convert day length in seconds to hours/mins/sec/////////////////

  return (
    <div className="sun">
      <h3>
        {text[language].searchDetailsDate} {date}
      </h3>
      <h3>
        {text[language].mapsPopup}: {coordinates?.lat} (
        {text[language].mapsLatitude}), {coordinates?.long} (
        {text[language].mapsLongitude})
      </h3>
      <Ul>
        <strong>
          <u>{text[language].sunInfo}</u>
        </strong>
        <Li>
          <strong> {text[language].sunSunrise}: </strong>
          <Datetimeformat
            dateTime={sr}
            dateTimeFormat={localtime}
            language={language}
          />
        </Li>
        <Li>
          <strong> {text[language].sunSunset}: </strong>
          <Datetimeformat
            dateTime={ss}
            dateTimeFormat={localtime}
            language={language}
          />
        </Li>
        <Li>
          <strong> {text[language].sunSolarNoon}: </strong>
          <Datetimeformat
            dateTime={sn}
            dateTimeFormat={localtime}
            language={language}
          />
        </Li>
        <Li>
          <strong> {text[language].sunDayLength}: </strong>
          {daylength}
        </Li>
        <Li>
          <strong> {text[language].sunCivilTwilightBegin}: </strong>
          <Datetimeformat
            dateTime={ctb}
            dateTimeFormat={localtime}
            language={language}
          />
        </Li>
        <Li>
          <strong> {text[language].sunCivilTwilightEnd}: </strong>
          <Datetimeformat
            dateTime={cte}
            dateTimeFormat={localtime}
            language={language}
          />
        </Li>
        <Li>
          <strong> {text[language].sunNauticalTwilightBegin}: </strong>
          <Datetimeformat
            dateTime={ntb}
            dateTimeFormat={localtime}
            language={language}
          />
        </Li>
        <Li>
          <strong> {text[language].sunNauticalTwilightEnd}: </strong>
          <Datetimeformat
            dateTime={nte}
            dateTimeFormat={localtime}
            language={language}
          />
        </Li>
        <Li>
          <strong> {text[language].sunAstronomicalTwilightBegin}: </strong>
          <Datetimeformat
            dateTime={atb}
            dateTimeFormat={localtime}
            language={language}
          />
        </Li>
        <Li>
          <strong> {text[language].sunAstronomicalTwilightEnd}: </strong>
          <Datetimeformat
            dateTime={ate}
            dateTimeFormat={localtime}
            language={language}
          />
        </Li>
      </Ul>
    </div>
  );
}

export default Sun;
