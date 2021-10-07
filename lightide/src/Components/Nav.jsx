// GA SEI 32 Project 2: FrontEnd with API
// ZY, 5 Oct 2021

import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <>
      <nav>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/maps">LighTide</Link>
        </li>
        <li>
          <Link to="/results">Results</Link>
        </li>
      </nav>
    </>
  );
}

export default Nav;
