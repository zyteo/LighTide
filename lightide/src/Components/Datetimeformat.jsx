// GA SEI 32 Project 2: FrontEnd with API
// ZY, 15 Oct 2021

import { format, parseISO } from "date-fns";

// convert the time from ISO format to a more readable format
function Datetimeformat({ dateTime, dateTimeFormat }) {
  // sometimes, there is no dateTime, so it will throw an error. in that case, return an empty string
  if (!dateTime) {
    return "";
  } else {
    let localtime = format(parseISO(dateTime), dateTimeFormat);
    return localtime;
  }
}
export default Datetimeformat;
