"use strict";
import Vue from "vue";
import axios from "axios";
import CryptoJS from "crypto-js";
import sign from "./sign";
import baseinfo from "./baseinfo";


const DEV_BASE_URL = "/loanapis";
const PROD_BASE_URL = "/loanapis";
const baseURL =
  process.env.NODE_ENV === "production" ? PROD_BASE_URL : DEV_BASE_URL;

const baseKey = sign.baseKey;
const baseIv = sign.baseIv;
const signStr = sign.signStr;
const requestKey = sign.requestKey;
//console.log(requestKey)
const service = axios.create({
  baseURL: baseURL,
  headers: {"Content-Type": "application/json;charset=utf-8"},
  method: "post",
  responseType: "json",
  transformRequest(data) {
    let sortdata = {};

    if (localStorage.getItem("user")) {
      baseinfo.userid = JSON.parse(localStorage.getItem("user")).uid;
    }

    if (localStorage.getItem("appid")) {
      baseinfo.appid = localStorage.getItem("appid");
    }

    data = Object.assign({}, baseinfo, data);
    Object.keys(data)
      .sort()
      .map(item => {
        sortdata[item] = data[item];
      });
    const time = new Date().valueOf();
    const sign = CryptoJS.MD5(
      CryptoJS.MD5(
        `${signStr}*|*${JSON.stringify(sortdata)}@!@${time}`
      ).toString()
    ).toString();
//console.log(sortdata)
    let encrypt = function (key, iv, data) {
      var key = CryptoJS.enc.Utf8.parse(key);
      var iv = CryptoJS.enc.Utf8.parse(iv);
      var encrypted = "";
      if (typeof data == "string") {
        var srcs = CryptoJS.enc.Utf8.parse(data);
        encrypted = CryptoJS.AES.encrypt(srcs, key, {
          iv: iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7
        });
      }
      return encrypted.toString();
    };
    const form = new FormData();
    form.append(
      requestKey,
      encrypt(
        baseKey,
        baseIv,
        JSON.stringify(
          Object.assign({}, sortdata, {
            sign,
            timestamp: time
          })
        )
      )
    );
    return form;
  }
});

service.interceptors.request.use(
  config => config,
  error => Promise.reject(error)
);

service.interceptors.response.use(
  response => {
    if (+response.status !== 200) {
      return Promise.reject(response);
    }
    let result = getResult(response);
    var key = CryptoJS.enc.Utf8.parse(baseKey);
    var iv = CryptoJS.enc.Utf8.parse(baseIv);
    var decrypted = CryptoJS.AES.decrypt(result, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
   
    let responseData = decrypted.toString(CryptoJS.enc.Utf8)
    
    let data = JSON.parse(responseData);
    //console.log(data)
    
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

function getResult(response) {
  let result = '';
  switch (baseinfo.app_package + '') {
    case 'com.sajjaaj.ajajaj':
      result = response.data.bureturn;
      break;
    case 'com.ahsiahd.adha':
      result = response.data.mreturn;
      break;
    case 'com.adhuks.dukahd':
      result = response.data.mbrcode;
      break;
     case 'com.rumah.nana':
        result = response.data.rcode;
        break;  
  }
  return result;
}

export default service;
