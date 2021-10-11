// GA SEI 32 Project 2: FrontEnd with API
// ZY, 1 Oct 2021

import React from "react";
import styled from "styled-components";
import { parseISO, format } from "date-fns";
const Ul = styled.ul`
  list-style-type: none;
`;
const Li = styled.li`
  margin: 6px;
`;

// Sun takes in 10 props
function Sun({ sr, ss, sn, dl, ctb, cte, ntb, nte, atb, ate }) {
  ////////////////////////////convert the time in ISO to local time - 9 props here //////////////////////
  let sunprops = [sr, ss, sn, ctb, cte, ntb, nte, atb, ate];
  let sundetails = [];

  for (let i = 0; i < sunprops.length; i++) {
    sundetails[i] = format(parseISO(sunprops[i]), "dd MMM yyyy (eee) pppp");
  }
  ////////////////////////////convert the time in ISO to local time//////////////////////

  ////////////////////////convert day length in seconds to hours/mins/sec/////////////////
  let hours = Math.floor(dl / 3600);
  let mins = Math.floor((dl - (hours * 3600)) / 60);
  let seconds = (dl - (hours * 3600) - (mins * 60));
  let daylength = `${hours} hours, ${mins} minutes, ${seconds} seconds`
  ////////////////////////convert day length in seconds to hours/mins/sec/////////////////

  return (
    <div className="sun">
      <Ul>
        <strong>
          <u>Sunrise & Sunset Times</u>
        </strong>
        <Li>
          <strong> Sunrise: </strong>
          {sundetails[0]}
        </Li>
        <Li>
          <strong> Sunset: </strong>
          {sundetails[1]}
        </Li>
        <Li>
          <strong> Solar noon: </strong>
          {sundetails[2]}
        </Li>
        <Li>
          <strong> Day length: </strong>
          {daylength}
        </Li>
        <Li>
          <strong> Civil twilight begin: </strong>
          {sundetails[3]}
        </Li>
        <Li>
          <strong> Civil twilight end: </strong>
          {sundetails[4]}
        </Li>
        <Li>
          <strong> Nautical twilight begin: </strong>
          {sundetails[5]}
        </Li>
        <Li>
          <strong> Nautical twilight end: </strong>
          {sundetails[6]}
        </Li>
        <Li>
          <strong> Astronomical twilight begin: </strong>
          {sundetails[7]}
        </Li>
        <Li>
          <strong> Astronomical twilight end: </strong>
          {sundetails[8]}
        </Li>
      </Ul>
    </div>
    // Copy of the sun details in ISO format here
    // <div className="sun">
    //   <Ul>
    //     <strong>
    //       <u>Sunrise & Sunset Times (in UTC)</u>
    //     </strong>
    //     <Li>
    //       <strong> Sunrise: </strong>
    //       {sr}
    //     </Li>
    //     <Li>
    //       <strong> Sunset: </strong>
    //       {ss}
    //     </Li>
    //     <Li>
    //       <strong> Solar noon: </strong>
    //       {sn}
    //     </Li>
    //     <Li>
    //       <strong> Day length: </strong>
    //       {dl}
    //     </Li>
    //     <Li>
    //       <strong> Civil twilight begin: </strong>
    //       {ctb}
    //     </Li>
    //     <Li>
    //       <strong> Civil twilight end: </strong>
    //       {cte}
    //     </Li>
    //     <Li>
    //       <strong> Nautical twilight begin: </strong>
    //       {ntb}
    //     </Li>
    //     <Li>
    //       <strong> Nautical twilight end: </strong>
    //       {nte}
    //     </Li>
    //     <Li>
    //       <strong> Astronomical twilight begin: </strong>
    //       {atb}
    //     </Li>
    //     <Li>
    //       <strong> Astronomical twilight end: </strong>
    //       {ate}
    //     </Li>
    //   </Ul>
    // </div>
  );
}

export default Sun;
