// GA SEI 32 Project 2: FrontEnd with API
// ZY, 15 Oct 2021

import { format, parseISO } from "date-fns";
import { enGB, zhCN, zhTW } from "date-fns/locale";

// set the datetimeformat for chinese, need to be in year month day format as it is different from english
const zhTimeFormat = "yyyy年MM月dd日 (eee) pppp";

// convert the time from ISO format to a more readable format
function Datetimeformat({ dateTime, dateTimeFormat, language }) {
  // sometimes, there is no dateTime, so it will throw an error. in that case, return an empty string
  if (!dateTime) {
    return "";
  } else {
    if (language === "English") {
      let localtime = format(parseISO(dateTime), dateTimeFormat, {
        locale: enGB,
      });
      return localtime;
    } else if (language === "简体中文") {
      let localtime = format(parseISO(dateTime), zhTimeFormat, {
        locale: zhCN,
      });
      return localtime;
    } else if (language === "繁体中文") {
      let localtime = format(parseISO(dateTime), zhTimeFormat, {
        locale: zhTW,
      });
      return localtime;
    }
  }
}
export default Datetimeformat;
