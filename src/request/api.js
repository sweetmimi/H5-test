"use strict";
import baseinfo from "./baseinfo";

const packgeName = "com.rumah.nana";

let apiWindow,
    apiGetlist,
    apiInfousbmit,
    apiLoanprouduct,
    apiProductsub,
    apiImg,
    apiImgsub,
    apiprovince,
    apicity,
    apidistrict,
    apismaldistrict,
    apifield,
    apiorderdevice,
    apiIdimage,
    apiuserbiopsy

function changeIp() {
  switch (packgeName + '') {
    case 'com.rumah.nana':
      apiWindow = "credit-product/window"
      apiGetlist = "credit-product/get-list"
      apiInfousbmit = "credit-product/info-submit"
      apiLoanprouduct = "credit-product/loan-prouduct"
      apiProductsub = "credit-product/product-sub"
      apiImg = "credit-product/img"
      apiImgsub = "credit-product/img-sub"
      //地址
      apiprovince = "/loan-dana/province"; //省
      apicity = "/loan-dana/city"; //市
      apidistrict = "/loan-dana/district" //县
      apismaldistrict = "/loan-dana/small-district" //村

      // apifield = "/loan-log-dana/log"; //输入监控
      //活体
      apiuserbiopsy="/dana-statistics/biopsy-log",
      apiIdimage="/order-dana/idcard-image"

      apiorderdevice="/order-dana/device-new"//上传设备xinxi
      break;
  }
}
changeIp();

export default {
  apiWindow: apiWindow,
  apiGetlist: apiGetlist,
  apiInfousbmit: apiInfousbmit,
  apiLoanprouduct: apiLoanprouduct,
  apiProductsub: apiProductsub,
  apiImg: apiImg,
  apiImgsub: apiImgsub,
  apiprovince: apiprovince,
  apicity: apicity,
  apidistrict: apidistrict,
  apismaldistrict: apismaldistrict,
  apifield: apifield,
  apiorderdevice:apiorderdevice,
  apiIdimage:apiIdimage,
  apiuserbiopsy:apiuserbiopsy,
};
