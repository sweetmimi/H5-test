<template>
  <div>
    <!-- <cell title="Informasi Utama" style="padding-left: 6px;" class="home-navbar" is-link>
        <i slot="icon" class="home-navbar-icon" >
            <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><path d='M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z' fill='#fff'/></svg>
        </i>
    </cell>-->
    <div class="loading"
         v-if="!infoList">Loading....</div>
    <!-- 头部奖励-->
    <topReward :value="amount" ></topReward>
    <div class="info-main">
      <div v-for="(item,index) in infoList"
           :key="index"
           :class="[item.input_type=='image'? 'photo-list':'']">
        <div class="mgt10 info-div"
             v-if="item.input_type=='text'">
          <p>
            {{item.title}}
            <em class="red1"
                v-if="item.required ==='0'">(Opsional)</em>
          </p>
          <input class="inp"
                 type="text"
                 @blur="blurFun(item)"
                 v-model="item[item.code]"
                 :placeholder="item.example_val ">
          <div class="br"></div>
        </div>

        <div class="mgt10 info-div"
             v-if="item.input_type=='phone'||item.input_type=='number'">
          <p>
            {{item.title}}
            <em class="red1"
                v-if="item.required ==='0'">(Opsional)</em>
          </p>
          <input class="inp"
                 type="number"
                 @blur="blurFun(item)"
                 v-model="item[item.code]"
                 :placeholder="item.example_val ">
          <i v-if="item.check_type=='phone'||item.check_type=='telephone_or_phone'"
             @click="toselectTel(index)"
             class="icon-right-addtel iconfont icon-yuanquanjiahao"></i>
          <div class="br"></div>
        </div>

        <div class="mgt10 info-div"
             v-if="item.input_type=='select'">
          <p>
            {{item.title}}
            <em class="red1"
                v-if="item.required ==='0'">(Opsional)</em>
          </p>

          <popup-picker class="inp"
                        v-if="item.code=='ktpType'"
                        value-text-align="left"
                        @on-change="dateclick(item,index)"
                        cancel-text="Batal"
                        confirm-text="Konfirmasi"
                        v-model="item[item.code]"
                        :data="[item.valueArr]"
                        :placeholder="item.example_val "></popup-picker>
          <popup-picker class="inp"
                        v-else
                        value-text-align="left"
                        @on-change="blurFun(item)"
                        cancel-text="Batal"
                        confirm-text="Konfirmasi"
                        v-model="item[item.code]"
                        :data="[item.valueArr]"
                        :placeholder="item.example_val "></popup-picker>

          <i class="icon-right iconfont icon-youjiantou"></i>
          <div class="br"></div>
        </div>

        <!-- <div class="mgt10 info-div" v-if="item.code=='idExpiryDate'">
          <p>Tipe tanggal
            <em class="red1" v-if="item.required ==='0'">(Opsional)</em>
          </p>

          <popup-picker class="inp" value-text-align='left' cancel-text='Batal' confirm-text='Konfirmasi' v-model="alldateArrval"  :data="[alldateArr]" show-name></popup-picker>
          <i class="icon-right iconfont icon-youjiantou"></i>
          <div class="br"></div>

        </div>-->
        <div class="mgt10 info-div"
             v-if="item.input_type=='date'|| item.input_type == 'date_month'">
          <p>
            {{item.title}}
            <em class="red1"
                v-if="item.required ==='0'">(Opsional)</em>
          </p>
          <!-- <popup-picker class="inp" value-text-align='left' :data='item.value' cancel-text='Batal' confirm-text='Konfirmasi' v-model="item[item.code]" :placeholder="item.example_val "></popup-picker> -->
          <datetime @on-change="blurFun(item)"
                    :default-selected-value="`${new Date()}`"
                    class="inp"
                    value-text-align="left"
                    v-if="item.input_type=='date'"
                    :min-year="1900"
                    :max-year="2100"
                    cancel-text="Batal"
                    format="DD-MM-YYYY"
                    confirm-text="Konfirmasi"
                    v-model="item[item.code]"
                    :placeholder="item.example_val "></datetime>
          <datetime @on-change="blurFun(item)"
                    :default-selected-value="`${new Date()}`"
                    class="inp"
                    value-text-align="left"
                    v-if="item.input_type=='date_month'"
                    :min-year="1900"
                    cancel-text="Batal"
                    format="MM-YYYY"
                    confirm-text="Konfirmasi"
                    v-model="item[item.code]"
                    :placeholder="item.example_val "></datetime>
          <i class="icon-right iconfont icon-youjiantou"></i>
          <div class="br"></div>
        </div>

        <div class="mgt10 info-div"
             v-if="item.input_type=='select_province'||item.input_type=='select_city'||item.input_type=='select_large_district'||item.input_type=='select_small_district'">
          <p>
            {{item.title}}
            <em class="red1"
                v-if="item.required ==='0'">(Opsional)</em>
          </p>
          <popup-picker class="inp"
                        value-text-align="left"
                        :data="item.value"
                        v-if="item.value[0]&&item.value[0].length>0"
                        cancel-text="Batal"
                        confirm-text="Konfirmasi"
                        v-model="item[item.code]"
                        @on-change="todoaddress(item.input_type,'',index)"
                        show-name
                        :placeholder="item.example_val "></popup-picker>
          <div @click="todoaddress(item.input_type,1)"
               v-else>
            <popup-picker class="inp"
                          value-text-align="left"
                          :data="item.value"
                          disabled
                          cancel-text="Batal"
                          show-name
                          :placeholder="item.example_val "></popup-picker>
          </div>
          <i class="icon-right iconfont icon-youjiantou"></i>
          <div class="br"></div>
        </div>

        <div class="mgt10 info-div"
             @click="showAddress(index)"
             v-if="item.input_type=='address'">
          <p>{{item.title}}</p>
          <input v-if="!item[item.code].text"
                 class="inp"
                 type="text"
                 readonly
                 v-model="item[item.code]"
                 :placeholder="item.example_val ">

          <em class="address-style"
              v-else>{{item[item.code].text.provinces}} {{item[item.code].text.city}} {{item[item.code].text.districts}} {{item[item.code].text.villages}}</em>
          <i class="icon-right iconfont icon-youjiantou"></i>
          <div class="br"></div>
        </div>

        <div class="mgt10 info-div1"
             v-if="item.input_type=='radio'">
          <p>
            {{item.title}}
            <em class="red1"
                v-if="item.required ==='0'">(Opsional)</em>
          </p>
          <span>
            <Radio :options="item.value"
                   v-model="item[item.code]"
                   @on-change="togetVal(item,item[item.code])"></Radio>
          </span>
        </div>

        <li v-if="item.input_type=='image'"
            @click="toOpenCammerSide(item.code)">
          <i>
            <img v-if="item[item.code]"
                 width="100%"
                 :src="item[item.code]"
                 alt>
            <em v-else
                class="iconfont icon-Photo"></em>
          </i>
          <p>
            {{item.title}}
            <em class="red1"
                v-if="item.required ==='0'">(Opsional)</em>
          </p>
        </li>
      </div>

      <!-- <div class="info-div1 mgt10">
            <p>Nomor Telepon</p>
           <span>
               543613654136
           </span>
      </div>-->
      <!-- <div class="info-div mgt10">
            <input class="inp" type="text" placeholder="Silahkan isi alamat lengkap">
            <div class="br"></div>
      </div>-->
      <!-- <div class="mgt10 info-div2">
            <p>No KTP</p>
             <div>6541643478864688467</div>
             <div class="br"></div>
      </div>-->
      <div class="sub-btn-out"
           v-if="infoList&&infoList.length>0">
        <span class="sub-btn"
              @click="toSubmit()">Lanjut</span>
      </div>

      <BottomTips></BottomTips>
      <Kefuicon></Kefuicon>
    </div>

    <div class="pop-div">
      <popup v-model="showpopflag"
             position="bottom"
             height="75%"
             @on-hide="closeaddress">
        <div class>
          <ul>
            <div class="list-items"
                 v-for="(item,index) in prArr"
                 :key="index"
                 @click="toselect(item)">
              <div class="list-items1">
                <p>{{item.name}}</p>
                <i class="right iconfont icon-youjiantou"></i>
              </div>
              <div class="br"></div>
            </div>
            <div style="height: 10px;"></div>
          </ul>
        </div>
        <!-- <div class="closeBox">
          <span @click="closeaddress">Batal</span>
        </div>-->
      </popup>
    </div>
  </div>
</template>
<script>
import { PopupPicker, Popup, Datetime } from "vux";
import Radio from "./Radio";

import { toNext, toNexturl, getData, tocheckVal, todoaddress } from "./tonext";

export default {
  name: "WorkAndStuInfo",
  components: {
    PopupPicker,
    Radio,
    Datetime,
    Popup
  },
  data() {
    return {
      // alldateArrval: ["1"],
      // alldateArr: [{ value: "1", name: "Tidak permanen" }, { value: "2", name: "Seumur hidup" }],
      amount: "",
      // 表项目list
      infoList: '',
      o_push: "",
      sub_url: "",
      imgkind: "",
      refill_type: '',  // 是否重填字段

      showpopflag: false,
      num: 0,
      prArr: '',
      codeArr: {
        value: {},
        text: {}
      },
      addressindex: '',
    };
  },
  async created() {
    await toNext(this);
    getData(this, this.$IPS.apiGetlist);
    let amount= localStorage.getItem("amount")
   this.amount=amount
  },
  mounted() {

  
     window["GetTakePhotoUrl"] = (kind, url) => {
      if (url && url.image_path) {
        this.$vux.loading.hide();
      }
      for (let i = 0, n = this.infoList.length; i < n; i++) {
        if (this.infoList[i].code == this.imgkind) {
          this.infoList[i][this.infoList[i].code] = url.image_path;
          this.blurFun(this.infoList[i])

        }
      }
    };
    window["GetDefaultPhone"] = url => {
      this.infoList[this.imgkind][this.infoList[this.imgkind].code] = ((url.user_number + '').replace(/[^0-9]/ig, ""));
    };
  },
  methods: {

    dateclick(item, index) {
      console.log(item)
      if (item[item.code] == "ktp") {
        this.infoList.forEach(v => {
          if (v.code == 'idExpiryDate') {
            v.input_type = 'date'
            v[v.code] = '';
          }
        })
      } else {
        this.infoList.forEach(v => {
          if (v.code == 'idExpiryDate') {
            v.input_type = ''
            v[v.code] = '12-12-2289';
          }
        })
      }
      // this.alldateArrval == '2' ? item.input_type = '' : item.input_type = 'date';
      // this.alldateArrval == '2' ? item[item.code] = '12-12-2289' : item[item.code] = '';
    },

    // 电话号码选着
    toselectTel(index) {
      this.imgkind = index;
      try {
        if (typeof eval(Android.chooseContact) == "function") {
          Android.chooseContact();
        }
      } catch (e) {
        alert("Versi anda sekarang versi rendah, tidak bisa menggunakan fitur memilih nomor dari kontak");
      }
    },

    //输入监控操作
    // async blurFun(item) {
    //   let info = await this.axios.post(this.$Api.apifield,
    //     { pro_code: 7500, order_no: this.$route.query.order_no || '', field_name: item.code, field_value: JSON.stringify(item[item.code]) }
    //   );
    // },

    togetVal(item, val) {
      item[item.code] = val;
      this.blurFun(item)
    },





    toOpenCammerSide(imgkind) {
      this.imgkind = imgkind;
      this.DoPhotoFun(1000);
    },

    todoaddress(type, kind, index) {
      todoaddress(type, this, kind, index);
    },


    showAddress(index) {

      this.addressindex = index;
      this.prArr = this.infoList[index].value;
      this.showpopflag = true;
    },
    closeaddress() {
      this.showpopflag = false;

      this.num = 0;
      this.prArr = '';
      this.codeArr = {
        value: {},
        text: {}
      };
      this.addressindex = '';


    },


    async toselect(item) {
      this.$vux.loading.show({ text: "Loading" });
      this.num++
      // let urlArr = ['/loan-info/get-province', '/loan-info/get-city', '/loan-info/get-large-district', '/loan-info/get-small-district']
      //地址接口
        let urlArr = [this.$IPS.apiprovince,this.$IPS.apicity , this.$IPS.apidistrict, this.$IPS.apismaldistrict]
      if (this.num == 1) {
        this.codeArr.value['provinces'] = item.value
        this.codeArr.text['provinces'] = item.name
      }
      if (this.num == 2) {
        this.codeArr.value['city'] = item.value
        this.codeArr.text['city'] = item.name
      }
      if (this.num == 3) {
        this.codeArr.value['districts'] = item.value
        this.codeArr.text['districts'] = item.name
      }
      if (this.num == 4) {
        this.codeArr.value['villages'] = item.value
        this.codeArr.text['villages'] = item.name
      }
      if (this.num == urlArr.length) {
        let addressindex = this.addressindex
        this.showpopflag = false;
        this.infoList[addressindex][this.infoList[addressindex].code] = this.codeArr
        this.closeaddress()
        this.blurFun(this.infoList[addressindex])
        this.$vux.loading.hide();
        return
      }
      let info = await this.axios.post(urlArr[this.num], { ad_id: item.value });
      if (info.code === 0) {
        this.prArr = info.data;
      }
      this.$vux.loading.hide()
    },


    async toSubmit() {
      if ((await tocheckVal(this)) === false) return;
      let data = {
        order: {},
        // order_base: {}
      };
      this.infoList.forEach(v => {
        data.order[v.code] = v[v.code];
        if (v.input_type == "select") {
          v.value.forEach((s, i) => {
            if (s.text == v[v.code].join("")) {
              data.order[v.code] = s.value;
            }
          });
        }
        // if (v.input_type == "date") {
        //   data.order[v.code] = `${v[v.code][0]}-${v[v.code][1]}-${
        //     v[v.code][2]
        //     }`;
        //   // new Date(
        //   //   `${v[v.code][0]}-${v[v.code][1]}-${v[v.code][2]}`
        //   // ).valueOf() / 1000;
        // }
        if (data.order[v.code] instanceof Array) {
          data.order[v.code] = data.order[v.code].join("");
        }
      });

      data.order_no = this.$route.query.order_no;
      data.pro_code = this.$route.query.pro_code || 7500;
      data.order_type = this.$route.query.order_type || 0;

      let devinfo = JSON.parse(localStorage.getItem("loaninfo"))
      // data.order_base.application_amount = devinfo.application_amount;
      // data.order_base.application_term = devinfo.application_term;
      // data.order_base.product_name = devinfo.product_name;
      // data.order_base.is_reloan = "0";
      // data.order_base.product_id =devinfo.product_id;

      // console.log(data)
      // return
      data.o_push = this.o_push;
      toNexturl(this, this.sub_url || this.$IPS.apiInfousbmit, data);
    }
  }
};
</script>

<style scoped>
.hidden {
  overflow: hidden;
  height: 100%;
}
.vux-popup-dialog {
  background: #fff;
}

.address-style {
  font-style: normal;
  text-transform: lowercase;
  display: block;
  padding-bottom: 5px;
  padding-right: 20px;
  z-index: 9;
}
.closeBox {
  position: fixed;
  z-index: 90999999;
  bottom: 0;
  padding: 10px 15px;
  right: 0;
  left: 0;
  background: #fff;
  box-shadow: -1px -5px 16px #e8e8e8cc;
}
.closeBox span {
  border: 1px solid #cecece;
  border-radius: 5px;
  display: block;
  text-align: center;
  font-size: 16px;
  padding: 10px;
  color: #666;
}
</style>

