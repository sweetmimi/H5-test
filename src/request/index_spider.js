import axios from "axios";
import CryptoJS from "crypto-js";
import baseinfo from "./baseinfo";

const search = {};
window.location.search
  .slice(1)
  .split("&")
  .forEach(item => {
    let res = item.split("=");
    search[res[0]] = res[1];
  });

const DEV_BASE_URL = "/spider";
const PROD_BASE_URL = "/spider";
const baseURL =
  process.env.NODE_ENV === "production" ? PROD_BASE_URL : DEV_BASE_URL;
/*创建axios实例
const service = axios.create({
 baseURL:baseURL,
 headers:{"Content-type":"application/json;charset=utf-8"},
 method:"post",
 responseType:"json",
 transformRequest(data){
   let sordata={};
   data = Object.assign({
     appid:baseinfo.appid,
     userid:baseinfo.userid,
     app_package:baseinfo.app_package
   },data)
 };
 Objiect.keys(data)
 .sort()
 .map(item=> {
   sordata[item]=data[item];
 })
})*/
const service = axios.create({
  baseURL: baseURL,
  headers: { "Content-Type": "application/json;charset=utf-8" },
  method: "post",
  responseType: "json",
  transformRequest(data) {
    let sortdata = {};
    data = Object.assign(
      {
        appid: baseinfo.appid,
        userid: baseinfo.userid,
        app_package: baseinfo.app_package
      },
      data
    );
    Object.keys(data)
      .sort()
      .map(item => {
        sortdata[item] = data[item];
      });
    // const time = new Date().valueOf();
    // let signstr = "zmaoniany@mjb@tao!cashcash96300";
    // const sign = CryptoJS.MD5(
    //   CryptoJS.MD5(
    //     `${signstr}*|*${JSON.stringify(sortdata)}@!@${time}`
    //   ).toString()
    // ).toString();
    const form = new FormData();
    // console.log(sortdata);
    form.append("data", JSON.stringify(Object.assign({}, sortdata)));
    return form;
  }
});

// request拦截
service.interceptors.request.use(
  config => config,
  error => Promise.reject(error)
);
// respone拦截
service.interceptors.response.use(
  response => {
    // console.log(JSON.stringify(response));
    if (+response.status !== 200) {
      return Promise.reject(response);
    }
    const data = response.data;
    if (data.hasOwnProperty("code")) {
      return data;
    } else {
      return Promise.reject(response);
    }
  },
  error => {
    alert(error);
    Promise.reject(error);
  }
);
export default service;
