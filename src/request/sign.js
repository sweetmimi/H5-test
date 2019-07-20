
import baseinfo from "./baseinfo";

const packgeName = baseinfo.app_package;
console.log(packgeName)
let baseKey, baseIv, signStr, requestKey, responseKey;

function changeSignKey() {
  switch (packgeName + '') {
    case 'com.sajjaaj.ajajaj':
      baseKey = 'BukuUang783acyu0';
      baseIv = '690bc1jkcyy78rtf';
      signStr = 'BukuUang@BC9KK#CV78';
      requestKey = 'bucode';
      break;
    case 'com.ahsiahd.adha':
      baseKey = 'huangxuke@o09888';
      baseIv = 'ahsiahdadha23d22';
      signStr = 'BursaUang@1237jsdd';
      requestKey = 'mcode';
      break;
      case 'com.rumah.nana':
        baseKey = 'el5k4ym99k9dm96n';
        baseIv = '5zy2a77xbz3i9whe';
        signStr = '8t7l71l7ot8sdyyw8nahvc6w2';
        requestKey = 'ccode';
        break;
  }
}

changeSignKey();

export default {
  baseKey: baseKey,
  baseIv: baseIv,
  signStr: signStr,
  requestKey: requestKey,
  responseKey: responseKey,
};

