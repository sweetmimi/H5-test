export function getDeviceInfo(name) {
    try {
      if (typeof eval(Android.getDeviceInfo) == "function") {
        return Android.getDeviceInfo("basic", 0, 0);
      } else {
        return "";
      }
    } catch (e) {
      return "";
    }
  }
  
  export function getNormalInfo() {
    try {
      if (typeof eval(Android.getNormalInfo) == "function") {
        let normalData = JSON.parse(Android.getNormalInfo());
        localStorage.setItem("loaninfo", JSON.stringify(normalData));
        localStorage.setItem("appid", normalData.appid);
        let user = {};
        user.uid = normalData.userid;
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("guid", normalData.guid);
        return normalData;
      } else {
        return "";
      }
    } catch (e) {
      return "";
    }
  }
  
  export function takePhoto(kind) {
    try {
      if (typeof eval(Android.takePhoto) == "function") {
        return Android.takePhoto(kind);
      } else {
        return 1000;
      }
    } catch (e) {
      return 1000;
    }
  }
  
  export function getPackageName() {
    try {
      if (typeof eval(Android.getPackageName) == "function") {
        return Android.getPackageName();
      } else {
        return "";
      }
    } catch (e) {
      return "";
    }
  }
  
  export function Doevent(name) {
    try {
      if (typeof eval(Android.event) == "function") {
        Android.event(name);
      } else {
      }
    } catch (e) {}
  }
  
  export function getValue(name) {
    try {
      if (typeof eval(Android.get) == "function") {
        return Android.get(name);
      } else {
        return "";
      }
    } catch (e) {
      return "";
    }
  }
  
  export function setValue(name, val) {
    try {
      if (typeof eval(Android.set) == "function") {
        Android.set(name, val);
      } else {
        return "";
      }
    } catch (e) {
      return "";
    }
  }
  