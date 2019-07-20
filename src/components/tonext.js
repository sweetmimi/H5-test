//  进入页面成功检测跳转
import axios_spider from '../request/index_spider'

export async function toNext (obj) {
}

// 提交信息成功跳转
export async function toNexturl (obj, url, data, fa, appid, devlist) {
  obj.$vux.loading.show({text: 'Loading'})
  let info = ''
  if (url == '/talang-v1/auth-submit') {
    info = await axios_spider.post(url, data)
  } else {
    info = await obj.axios.post(url, data)
  }
  // let info = await obj.axios.post(url, data);
  // alert(JSON.stringify(info));
  
  if (info.code == 0) {
    obj.$vux.loading.hide()
    // alert(devlist)
    // alert(info.data.order_no)
    // alert(appid)
    // 上传设备信息

    // if (obj.$route.query.order_type == 1) {
    //     obj.$vux.toast.show({ text: 'Dimodifikasi dengan sukses, akan segera melompat', type: "text", position: 'middle', width: '80%', time: 1000 });
    //     // await setTimeout(() => {}, 1000)
    // }

    // alert(info.data.next_pro);
    if (info.data.points && info.data.points.length > 0) {
      obj.$vux.toast.show({
        text: info.data.points[0].msg,
        type: 'text'
      })
    }
    if (info.data.next_pro == 1000) {
      obj.$router.replace({
        path: '/infoBasic',
        query: {
          order_no: info.data.order_no || '',
          pro_code: info.data.next_pro
        }
      })
    }
    if (info.data.next_pro == 0) {
      obj.$router.replace({
        path: '/productpage',
        query: {
          order_no: info.data.order_no || '',
          pro_code: info.data.next_pro
        }
      })
    }
    if (info.data.next_pro == 1100) {
      obj.$router.replace({
        path: '/infoUser',
        query: {
          order_no: info.data.order_no || '',
          pro_code: info.data.next_pro
        }
      })
    }

    if (info.data.next_pro == 8500) {
      obj.$router.replace({
        path: '/Toselect',
        query: {
          order_no: info.data.order_no || '',
          pro_code: info.data.next_pro
        }
      })
    }
    if (info.data.next_pro == 1200) {
      obj.$router.replace({
        path: '/UserAddress',
        query: {
          order_no: info.data.order_no || '',
          pro_code: info.data.next_pro
        }
      })
    }
    if (info.data.next_pro == 2000) {
      obj.$router.replace({
        path: '/infoJob',
        query: {
          order_no: info.data.order_no || '',
          pro_code: info.data.next_pro
        }
      })
    }
    // 跳转工作学生基本信息
    if (info.data.next_pro == 8000) {
      obj.$router.replace({
        path: '/infoStudent',
        query: {
          order_no: info.data.order_no,
          pro_code: info.data.next_pro
        }
      })
    }

    // 跳转补充信息
    if (info.data.next_pro == 7500) {
      obj.$router.replace({
        path: '/infoAdd',
        query: {
          order_no: info.data.order_no,
          pro_code: info.data.next_pro
        }
      })
    }
    // 跳转 联系人信息
    if (info.data.next_pro == 4000) {
      obj.$router.replace({
        path: '/infoCont',
        query: {
          order_no: info.data.order_no,
          pro_code: info.data.next_pro
        }
      })
    }
    // 跳转 活体检测
    if (info.data.next_pro == 6000) {
      obj.$router.replace({
        path: '/checkLive',
        query: {
          order_no: info.data.order_no,
          pro_code: info.data.next_pro
        }
      })
    }
    // 跳转 绑定英航卡
    if (info.data.next_pro == 7000) {
      obj.$router.replace({
        path: '/infoBankCard',
        query: {
          order_no: info.data.order_no,
          pro_code: info.data.next_pro
        }
      })
    }
    // 跳转 确认
    if (info.data.next_pro == 9000) {
      obj.$router.replace({
        path: '/ConfirmPage',
        query: {
          order_no: info.data.order_no,
          pro_code: info.data.next_pro
        }
      })
    }
   
    
    // 跳转信息授权
    if (info.data.next_pro == 10000) {
      obj.$router.replace({
        path: '/ToAuthorize',
        query: {
          order_no: info.data.order_no,
          pro_code: info.data.next_pro
        }
      })
    }

    if (info.data.next_pro == -1000) {
      Android.finishWeb()
    }
    if (fa === 1) {
      
      let info= await obj.axios.post(obj.$IPS.apiorderdevice, {
        order_no: "18122514311464341473",
        appid: "90000",
        device: Android.getDeviceInfo(
          devlist,
          0,
          0
        )

      });
     
    }
  } else {
    obj.$vux.toast.show({
      text: info.code + info.message ,
      type: 'text',
      position: 'middle',
      width: '80%'
    })
  }

  obj.$vux.loading.hide()
}

// 公用拉取数据信息

export async function getData (obj, url, fa) {
  // let years = [];
  // let mounths = [];
  // let days = [];
  // let dateFun = function(ti, ti1, kind) {
  //   for (var i = ti; i <= ti1; i++) {
  //     i = i < 10 ? "0" + i : i;
  //     kind.push(i);
  //   }
  //   return kind;
  // };
  
  // obj.$vux.loading.show({ text: "Loading" });
  let infoList = await obj.axios.post(url, {
    order_no: obj.$route.query.order_no,
    pro_code: obj.$route.query.pro_code,
  })
  
  if (infoList.code === 0) {
    
    var amount= infoList.data.amount;
  
    localStorage.setItem("amount" , amount)
    let caddress =
      fa === 1 ? await obj.axios.post(obj.$IPS.apiprovince) : ''
      
    for (let i = 0, n = infoList.data.field_list.length; i < n; i++) {
      let v = infoList.data.field_list[i]
      v.input_val = v.input_val || ''
      if (
        v.input_type == 'select' ||
        // v.input_type == "date" ||
        // v.input_type == "date_month" ||
        v.input_type == 'select_province' ||
        v.input_type == 'select_city' ||
        v.input_type == 'select_large_district' ||
        v.input_type == 'select_small_district'
      ) {
        v.valueArr = []
        if (v.value && v.value.length > 0) {
          v.value.forEach(s => {
            v.valueArr.push(s.text)
          })
        }

        if (v.input_val && v.input_type == 'select') {
          // v.value.forEach((s, i) => {
          //   if (s.value == v.input_val) {
          //     v.input_val = s.text;
          //   }
          // });

          let cc = v.value.some((s, i) => {
            if (s.value == v.input_val) {
              return true
            }
          })

          if (cc) {
            for (let c = 0, n = v.value.length; c < n; c++) {
              if (v.value[c].value == v.input_val) {
                v.input_val = v.value[c].text
              }
            }
          } else {
            v.input_val = ''
          }
        }

        v[v.code] = v.input_val ? [v.input_val] : []

        // if (
        //   (v.input_type == "date" || v.input_type == "date_month") &&
        //   v.input_val
        // ) {
        //   v[v.code] = [v.input_val] = v.input_val.split("-");
        // }
      } else {
        if (v.input_type == 'select_child') {
          if (v.input_val && typeof v.input_val === 'string') {
            v.input_val = ''
          }
        }
        v[v.code] = v.input_val
      }

      if (v.input_val) {
        v.has_val = true
      }

      // if (v.input_type == "date") {
      //   years = [];
      //   mounths = [];
      //   days = [];
      //   v.value = [
      //     dateFun(1, 31, days),
      //     dateFun(1, 12, mounths),
      //     dateFun(1900, 2018, years).reverse()
      //   ];
      // }

      // if (v.input_type == "date_month") {
      //   years = [];
      //   mounths = [];
      //   // days = [];
      //   v.value = [
      //     // dateFun(1, 31, days),
      //     dateFun(1, 12, mounths),
      //     dateFun(1900, 2018, years).reverse()
      //   ];
      // }

      if (v.input_type == 'select_province') {
        v.value = [caddress.data]
      }
      if (v.input_type == 'select_city') {
        let ad1 = infoList.data.field_list[i - 1].input_val
          ? infoList.data.field_list[i - 1].input_val
          : ''

        let caddress1 = ad1
          ? await obj.axios.post(obj.$IPS.apicity, {ad_id: ad1})
          : ''
        // console.log(ad1);
        // console.log(caddress1.data);
        v.value = [caddress1.data]
      }
      if (v.input_type == 'select_large_district') {
        let ad1 = infoList.data.field_list[i - 1].input_val
          ? infoList.data.field_list[i - 1].input_val
          : ''

        let caddress1 = ad1
          ? await obj.axios.post(obj.$IPS.apidistrict, {
            ad_id: ad1
          })
          : ''
        // console.log(ad1);
        // console.log(caddress1.data);
        v.value = [caddress1.data]
      }
      if (v.input_type == 'select_small_district') {
        let ad1 = infoList.data.field_list[i - 1].input_val
          ? infoList.data.field_list[i - 1].input_val
          : ''

        let caddress1 = ad1
          ? await obj.axios.post(obj.$IPS.apismaldistrict, {
            ad_id: ad1
          })
          : ''
        // console.log(ad1);
        // console.log(v.input_val);
        // console.log(caddress1.data);
        v.value = [caddress1.data]
      }
    }

    // obj.$vux.loading.hide();
    obj.infoList = infoList.data.field_list
    obj.infoList.forEach(info => {
      info.vFlag = false
    })
    obj.o_push = infoList.data.o_push
  
    // console.log(obj.infoList);
    if (obj.device_conf === '') {
      obj.device_conf = infoList.data.device_conf
        ? infoList.data.device_conf
        : ''
    }
    if (obj.sub_url === '') {
      obj.sub_url = infoList.data.sub_url ? infoList.data.sub_url : ''
    }

    if (obj.refill_type === '') {
      obj.refill_type = infoList.data.refill_type
    }
    if (obj.hasvalflag === false) {
      let cc1 = infoList.data.field_list.some(v => {
        return v.has_val && v.code == 'user_idcard'
      })
      let cc2 = infoList.data.field_list.some(v => {
        return v.has_val && v.code == 'user_name'
      })
      let cc3 = infoList.data.field_list.some(v => {
        return v.has_val && v.code == 'user_mobile'
      })
      // console.log(cc1, cc2, cc3);
      let cc4 = cc1 && cc2 && cc3
      obj.hasvalflag = !cc4
    }
    if (obj.hasimgflag === false) {
      let cc1 = infoList.data.field_list.some(v => {
        return v.has_val && v.code == 'idcard_image_front'
      })
      let cc2 = infoList.data.field_list.some(v => {
        return v.has_val && v.code == 'idcard_image_reverse_side'
      })
      let cc3 = infoList.data.field_list.some(v => {
        return v.has_val && v.code == 'idcard_image_hand'
      })
      // console.log(cc1, cc2, cc3);
      let cc4 = cc1 && cc2 && cc3
      obj.hasimgflag = cc4
    }
  } else {
    obj.$vux.toast.show({
      text: infoList.code + infoList.message,
      type: 'text'
    })
  }
  // obj.$vux.loading.hide();
}

function showmsg (obj, msg) {
  obj.$vux.toast.show({
    text: msg,
    type: 'text',
    position: 'middle',
    width: '80%'
  })
}

export async function tocheckVal (obj) {
  let num = 0
  for (let i = 0, n = obj.infoList.length; i < n; i++) {
    let cc = obj.infoList[i][obj.infoList[i].code]
    if (obj.infoList[i].required === '1') {
      if (!cc || cc.length < 1) {
        num++
      }
    }
  }

  console.log(num)

  for (let i = 0, n = obj.infoList.length; i < n; i++) {
    let cc = obj.infoList[i][obj.infoList[i].code]
    if (obj.infoList[i].required === '1') {
      if ((!cc || cc.length < 1) && num < n) {
        obj.infoList[i].vFlag = true
        obj.$set(obj.infoList, i, obj.infoList[i])
      }
    }
  }

  for (let i = 0, n = obj.infoList.length; i < n; i++) {
    let cc = obj.infoList[i][obj.infoList[i].code]
    if (obj.infoList[i].required === '1') {
      if (!cc || cc.length < 1) {
        showmsg(obj, obj.infoList[i].title + '  Tidak boleh kosong')
        return false
      }
    }
    if (obj.infoList[i].code == 'birthday') {
      cc = cc.split('-')
      let oldData = new Date(`${cc[2]}-${cc[1]}-${cc[0]}`).valueOf()
      let nowDate = new Date().valueOf()
      console.log(oldData)
      console.log(nowDate)
      if (oldData > nowDate) {
        showmsg(obj, 'Silakan isi ulang tahun yang benar')
        return false
      }
    }
    if (obj.infoList[i].check_type == 'monthly_income_num') {
      if (!/^[0-9]{5,9}$/g.test(cc)) {
        showmsg(obj, 'Pengisian gaji bulanan tidak boleh pakai titik \'.\'')
        return false
      }
    }
    if (obj.infoList[i].check_type == 'user_name') {
      if (!/^[a-zA-Z ]{2,}$/g.test(cc)) {
        showmsg(obj, 'Format pengisian nama salah')
        return false
      }
    }
  }

}

export async function todoaddress (type, obj, kind, index) {
  if (kind === 1) {
    if (type == 'select_city') {
      showmsg(obj, 'Dimohon mengisi provinsi terlebih dahulu')
    }
    if (type == 'select_large_district') {
      showmsg(obj, 'Dimohon mengisi kabupaten/kota terlebih dahulu')
    }
    if (type == 'select_small_district') {
      showmsg(obj, 'Dimohon mengisi kecamatan terlebih dahulu')
    }
    return
  }

  if (type == 'select_province') {
    let ad_id = ''
    let num = index
    obj.infoList.forEach((v, i) => {
      if (v.input_type == type && v[v.code].length > 0 && i == num) {
        ad_id = v[v.code][0]
      }
    })
    let caddress = await obj.axios.post(obj.$IPS.apiprovince, {
      ad_id: ad_id
    })
    console.log(ad_id)

    obj.infoList.forEach((v, i) => {
      if (v.input_type == 'select_city' && i == num + 1) {
        v.value = [caddress.data]
        v[v.code] = []
      }
      if (v.input_type == 'select_large_district' && i == num + 2) {
        v.value = []
        v[v.code] = []
      }
      if (v.input_type == 'select_small_district' && i == num + 3) {
        v.value = []
        v[v.code] = []
      }
    })
  }
  if (type == 'select_city') {
    let ad_id = ''
    let num = index
    obj.infoList.forEach((v, i) => {
      // if (v.input_type == "select_province" && v[v.code].length > 0) {
      //     pro = v[v.code].join("");
      // }
      if (v.input_type == type && v[v.code].length > 0 && i == num) {
        ad_id = v[v.code][0]
      }
    })
    let caddress = await obj.axios.post(obj.$IPS.apidistrict, {
      ad_id: ad_id
    })
    obj.infoList.forEach((v, i) => {
      if (v.input_type == 'select_large_district' && i == num + 1) {
        v.value = [caddress.data]
        v[v.code] = []
      }
      if (v.input_type == 'select_small_district' && i == num + 2) {
        v.value = []
        v[v.code] = []
      }
    })
  }
  if (type == 'select_large_district') {
    let ad_id = ''
    let num = index
    // let city = "";
    // let large_dist = "";
    obj.infoList.forEach((v, i) => {
      // if (v.input_type == "select_province" && v[v.code].length > 0) {
      //     pro = v[v.code].join("");
      // }
      // if (v.input_type == "select_city" && v[v.code].length > 0) {
      //     city = v[v.code].join("");
      // }
      if (v.input_type == type && v[v.code].length > 0 && i == num) {
        ad_id = v[v.code][0]
      }
    })
    let caddress = await obj.axios.post(obj.$IPS.apismaldistrict, {
      ad_id: ad_id
      // city: city,
      // large_dist: large_dist
    })
    obj.infoList.forEach((v, i) => {
      if (v.input_type == 'select_small_district' && i == num + 1) {
        v.value = [caddress.data]
        v[v.code] = []
      }
    })
  }
}
