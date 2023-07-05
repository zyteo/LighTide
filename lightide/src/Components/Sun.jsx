// GA SEI 32 Project 2: FrontEnd with API
// ZY, 1 Oct 2021

import React from "react";
import styled from "styled-components";
import Datetimeformat from "./Datetimeformat";

const Ul = styled.ul`
  list-style-type: none;
`;
const Li = styled.li`
  margin: 6px;
`;

// Sun takes in 10 props
function Sun({ sr, ss, sn, dl, ctb, cte, ntb, nte, atb, ate }) {
  const localtime = "dd MMM yyyy (eee) pppp";

  ////////////////////////convert day length in seconds to hours/mins/sec/////////////////
  let hours = Math.floor(dl / 3600);
  let mins = Math.floor((dl - (hours * 3600)) / 60);
  let seconds = (dl - (hours * 3600) - (mins * 60));
  let daylength = `${hours} hours, ${mins} minutes, ${seconds} seconds`
  ////////////////////////end of convert day length in seconds to hours/mins/sec/////////////////

  return (
    <div className="sun">
      <Ul>
        <strong>
          <u>Sunrise & Sunset Times</u>
        </strong>
        <Li>
          <strong> Sunrise: </strong>
          <Datetimeformat dateTime={sr} dateTimeFormat={localtime}/>
        </Li>
        <Li>
          <strong> Sunset: </strong>
          <Datetimeformat dateTime={ss} dateTimeFormat={localtime}/>
        </Li>
        <Li>
          <strong> Solar noon: </strong>
          <Datetimeformat dateTime={sn} dateTimeFormat={localtime}/>
        </Li>
        <Li>
          <strong> Day length: </strong>
          {daylength}
        </Li>
        <Li>
          <strong> Civil twilight begin: </strong>
          <Datetimeformat dateTime={ctb} dateTimeFormat={localtime}/>
        </Li>
        <Li>
          <strong> Civil twilight end: </strong>
          <Datetimeformat dateTime={cte} dateTimeFormat={localtime}/>
        </Li>
        <Li>
          <strong> Nautical twilight begin: </strong>
          <Datetimeformat dateTime={ntb} dateTimeFormat={localtime}/>
        </Li>
        <Li>
          <strong> Nautical twilight end: </strong>
          <Datetimeformat dateTime={nte} dateTimeFormat={localtime}/>
        </Li>
        <Li>
          <strong> Astronomical twilight begin: </strong>
          <Datetimeformat dateTime={atb} dateTimeFormat={localtime}/>
        </Li>
        <Li>
          <strong> Astronomical twilight end: </strong>
          <Datetimeformat dateTime={ate} dateTimeFormat={localtime}/>
        </Li>
      </Ul>
    </div>
  );
}

export default Sun;