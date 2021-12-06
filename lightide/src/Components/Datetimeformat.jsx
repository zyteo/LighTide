// GA SEI 32 Project 2: FrontEnd with API
// ZY, 15 Oct 2021

import { format, parseISO } from "date-fns";

function Datetimeformat({ dateTime, dateTimeFormat }) {
  // convert the time from ISO format to a more readable format
  let localtime = format(parseISO(dateTime), dateTimeFormat);
  return localtime;
}
export default Datetimeformat;