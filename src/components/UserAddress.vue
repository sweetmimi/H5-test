<template>
  <div>
    <!-- <cell title="Informasi Utama" style="padding-left: 6px;" class="home-navbar" is-link>
        <i slot="icon" class="home-navbar-icon" >
            <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><path d='M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z' fill='#fff'/></svg>
        </i>
    </cell>-->
    <div class="loading"
         v-if="!infoList">Loading....</div>
    <div class="top-tips"
         v-if="refill_type===1">Silahkan isi informasi dengan sebenar benarnya, tingkat keberhasilan pinjaman meningkat hingga 20%</div>
    <!-- <van-notice-bar v-if="refill_type===1" mode="closeable">Silahkan isi informasi dengan sebenar benarnya, tingkat keberhasilan pinjaman meningkat hingga 20%</van-notice-bar> -->
    
    <div class="info-main">
      <div v-for="(item,index) in infoList"
           :key="index"
           :class="[item.input_type=='image'? 'photo-list':'']">
        <div class="mgt10 info-div"
             v-if="item.input_type=='text'">
          <!-- <p>
            {{item.title}}
            <em class="red1"
                v-if="item.required ==='0'">(Opsional)</em>
          </p> -->
          <input class="inpt"
                 type="text"
                 v-model="item[item.code]"
                 :placeholder="item.title ">
          <div class="br"></div>
        </div>

        <div class="mgt10 info-div"
             v-if="item.input_type=='phone'||item.input_type=='number'">
          <!-- <p>
            {{item.title}}
            <em class="red1"
                v-if="item.required ==='0'">(Opsional)</em>
          </p> -->
          <input class="inpt"
                 type="number"
                 v-model="item[item.code]"
                 :placeholder="item.title ">
          <div class="br"></div>
        </div>

        <div class="mgt10 info-div"
             v-if="item.input_type=='select'">
          <!-- <p>
            {{item.title}}
            <em class="red1"
                v-if="item.required ==='0'">(Opsional)</em>
          </p> -->
          <popup-picker class="inpt"
                        value-text-align="left"
                        cancel-text="Batal"
                        confirm-text="Konfirmasi"
                        v-model="item[item.code]"
                        :data="[item.valueArr]"
                        :placeholder="item.title "></popup-picker>
          <i class="icon-right iconfont icon-youjiantou"></i>
          <div class="br"></div>
        </div>

        <div class="mgt10 info-div"
             v-if="item.input_type=='date'|| item.input_type == 'date_month'">
          <!-- <p>
            {{item.title}}
            <em class="red1"
                v-if="item.required ==='0'">(Opsional)</em>
          </p> -->
          <!-- <popup-picker class="inpt" value-text-align='left' :data='item.value' cancel-text='Batal' confirm-text='Konfirmasi' v-model="item[item.code]" :placeholder="item.example_val "></popup-picker> -->
          <datetime :default-selected-value="`${new Date()}`"
                    class="inpt"
                    value-text-align="left"
                    v-if="item.input_type=='date'"
                    :min-year="1900"
                    cancel-text="Batal"
                    format="DD-MM-YYYY"
                    confirm-text="Konfirmasi"
                    v-model="item[item.code]"
                    :placeholder="item.title "></datetime>
          <datetime :default-selected-value="`${new Date()}`"
                    class="inpt"
                    value-text-align="left"
                    v-if="item.input_type=='date_month'"
                    :min-year="1900"
                    cancel-text="Batal"
                    format="MM-YYYY"
                    confirm-text="Konfirmasi"
                    v-model="item[item.code]"
                    :placeholder="item.title "></datetime>
          <i class="icon-right iconfont icon-youjiantou"></i>
          <div class="br"></div>
        </div>

        <div class="mgt10 info-div"
             v-if="item.input_type=='select_province'||item.input_type=='select_city'||item.input_type=='select_large_district'||item.input_type=='select_small_district'">
          <!-- <p>
            {{item.title}}
            <em class="red1"
                v-if="item.required ==='0'">(Opsional)</em>
          </p> -->
          <popup-picker class="inpt"
                        value-text-align="left"
                        :data="item.value"
                        v-if="item.value[0]&&item.value[0].length>0"
                        cancel-text="Batal"
                        confirm-text="Konfirmasi"
                        v-model="item[item.code]"
                        @on-change="todoaddress(item.input_type,'',index)"
                        show-name
                        :placeholder="item.title "></popup-picker>
          <div @click="todoaddress(item.input_type,1)"
               v-else>
            <popup-picker class="inpt"
                          value-text-align="left"
                          :data="item.value"
                          disabled
                          cancel-text="Batal"
                          show-name
                          :placeholder="item.title "></popup-picker>
          </div>
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
                   @on-change="togetVal(item.code,item[item.code])"></Radio>
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
            <input class="inpt" type="text" placeholder="Silahkan isi alamat lengkap">
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
      <!-- <BottomTips></BottomTips> -->
      <!-- <Kefuicon></Kefuicon> -->
    </div>
  </div>
</template>
<script>
import { PopupPicker, Datetime } from "vux";
import Radio from "./Radio";
import devinfo from "../request/devinfo";
import { toNext, toNexturl, getData, tocheckVal, todoaddress } from "./tonext";

export default {
  name: "UserAddress",
  components: {
    PopupPicker,
    Datetime,
    Radio
  },
  data() {
    return {
      // 表项目list
      infoList: '',
      o_push: "",
      sub_url: "",
      refill_type: '',  // 是否重填字段
      imgkind: ""
    };
  },
  async created() {
    await toNext(this);
    getData(this,this.$Port.apiuseraddress, 1);
  },
  mounted() {
    if (this.refill_type === 1) {
      try {
        Android.doTestLimitShowBack(true, 'Jika Anda mengisi informasi, Anda dapat meminjam uang. Yakin ingin keluar?');
      } catch (e) {
        Android.doTestLimitShowBack(true)
      }
    } else {
      Android.doTestLimitShowBack(true);
    }
    window["GetDefaultCameraImg"] = url => {
      for (let i = 0, n = this.infoList.length; i < n; i++) {
        if (this.infoList[i].code == this.imgkind) {
          this.infoList[i][this.infoList[i].code] = url.image_path;
        }
      }
    };
  },
  methods: {
    toOpenCammerSide(imgkind) {
      this.imgkind = imgkind;
      Android.defaultCamera();
    },

    //输入监控操作方式
    // async blurFun(item) {
    //   let info = await this.axios.post(this.$Port.apifield,
    //     { pro_code: 1100, order_no: this.$route.query.order_no || '', field_name: item.code, field_value: JSON.stringify(item[item.code]) }
    //   );
    // },

    todoaddress(type, kind, index) {
      todoaddress(type, this, kind, index);
    },

    async toSubmit() {
      if ((await tocheckVal(this)) === false) return;
      let data = {
        order: {},
        order_base: {}
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
        // }
        // if (v.input_type == "date_month") {
        //   data.order[v.code] = `${v[v.code][0]}-${
        //     v[v.code][1]
        //     }`;
        // }
        if (data.order[v.code] instanceof Array) {
          data.order[v.code] = data.order[v.code].join("");
        }
      });
      // alert(this.$route.query.pro_code)
      data.order_no = this.$route.query.order_no;
      data.pro_code = this.$route.query.pro_code || 1200;
      data.order_type = this.$route.query.order_type || 0;

      data.order_base.application_amount = devinfo.application_amount;
      data.order_base.application_term = devinfo.application_term;
      data.order_base.is_reloan = devinfo.is_reloan;
      // data.order_base.product_id =devinfo.product_id;
      data.order_base.product_name = devinfo.product_name;

      data.o_push = this.o_push;
      toNexturl(this, this.sub_url || this.$Port.apiBasiInfo, data);
    }
  }
};
</script>
