// GA SEI 32 Project 2: FrontEnd with API
// ZY, 5 Oct 2021

import React from "react";
import Sun from "./Sun";
import Tides from "./Tides";
function Results({ sr, ss, sn, dl, ctb, cte, ntb, nte, atb, ate, tide }) {
  return (
    <>
      <Sun
        sr={sun?.results?.sunrise}
        ss={sun?.results?.sunset}
        sn={sun?.results?.solar_noon}
        dl={sun?.results?.day_length}
        ctb={sun?.results?.civil_twilight_begin}
        cte={sun?.results?.civil_twilight_end}
        ntb={sun?.results?.nautical_twilight_begin}
        nte={sun?.results?.nautical_twilight_end}
        atb={sun?.results?.astronomical_twilight_begin}
        ate={sun?.results?.astronomical_twilight_end}
      />
      <Tides tide={tide} />
    </>
  );
}

export default Results;
