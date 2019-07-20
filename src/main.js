import Vue from "vue";
import App from "./App";
import router from "./router";
import IPS from "./request/api.js";
import { ToastPlugin, LoadingPlugin, Popup } from "vux";
Vue.use(Popup);
Vue.use(ToastPlugin);
Vue.use(LoadingPlugin);

// 将Api对象绑定在vue实例的原型上
Vue.prototype.$IPS = IPS;

const FastClick = require("fastclick");
FastClick.attach(document.body);
Vue.config.productionTip = false;

import axios from "./request";
Vue.prototype.axios = axios;


// 全局组件 数字滚动
import numberRun from "./components/numberRun.vue";
Vue.component("numberRun", numberRun);


//全局组件 头部奖励
import topReward from "./components/topReward.vue";
Vue.component("topReward", topReward);

import { Doevent, takePhoto } from "./request/android";
Vue.prototype.Doevent = Doevent;

let DoPhotoFun = kind => {
  let cc = takePhoto(kind);
  if (cc == 0) {
    Vue.$vux.loading.show({ text: "Loading" });
  } else if (cc == -1) {
    Android.requestPermissions("android.permission.CAMERA");
  } else {
    untils.showmsg(this, cc);
  }
};

Vue.prototype.DoPhotoFun = DoPhotoFun;

// import eruda from "eruda";
// if (process.env.NODE_ENV !== "production") {
//   eruda.init();
// }

// import './flexible'

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
