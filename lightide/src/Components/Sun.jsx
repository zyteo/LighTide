// GA SEI 32 Project 2: FrontEnd with API
// ZY, 1 Oct 2021

import React from "react";
import styled from "styled-components";
import { format } from "date-fns";
const Ul = styled.ul`
  list-style-type: none;
`;
const Li = styled.li`
  margin: 6px;
`;

function Sun({ sr, ss, sn, dl, ctb, cte, ntb, nte, atb, ate }) {
  // let localtime = format(sr, "eee");
  // console.log(localtime);
  return (
    <div className="sun">
      <Ul>
        <strong>
          <u>Sunrise & Sunset Times (in UTC)</u>
        </strong>
        <Li>
          <strong> Sunrise: </strong>
          {sr}
        </Li>
        <Li>
          <strong> Sunset: </strong>
          {ss}
        </Li>
        <Li>
          <strong> Solar noon: </strong>
          {sn}
        </Li>
        <Li>
          <strong> Day length: </strong>
          {dl}
        </Li>
        <Li>
          <strong> Civil twilight begin: </strong>
          {ctb}
        </Li>
        <Li>
          <strong> Civil twilight end: </strong>
          {cte}
        </Li>
        <Li>
          <strong> Nautical twilight begin: </strong>
          {ntb}
        </Li>
        <Li>
          <strong> Nautical twilight end: </strong>
          {nte}
        </Li>
        <Li>
          <strong> Astronomical twilight begin: </strong>
          {atb}
        </Li>
        <Li>
          <strong> Astronomical twilight end: </strong>
          {ate}
        </Li>
      </Ul>
    </div>
  );
}

export default Sun;
