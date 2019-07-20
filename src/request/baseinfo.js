"use strict";

import { getDeviceInfo, getPackageName, getNormalInfo } from "./android";

const app_package = process.env.NODE_ENV === "production" ? getPackageName() : "com.rumah.nana";

function toSetfirPop() {
  getNormalInfo()
}

toSetfirPop();

let device_info = getDeviceInfo(app_package)
  ? JSON.parse(getDeviceInfo(app_package))
  : {
    and_id: "",
    gaid: "",
    imei: "",
    sn: "",
    model: "",
    brand: ""
  };

export default {
  app_version: 70,
  version: "70",
  app_package: app_package,
  app_type: "android",
  channel: "App",
  device_info: device_info,
  position: "0,0",
  guid: "ebbbbabb15d13790e371bc15d1a59089",
  userid: "060b764e6f8afd1963d0c9bd9beaf779",
  appid: "90001",
  appid_arr:'',
  pro_code:'',
};
