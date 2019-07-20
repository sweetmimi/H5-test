<template>
  <div>

    <!-- <cell title="Informasi Utama" style="padding-left: 6px;" class="home-navbar" is-link>
        <i slot="icon" class="home-navbar-icon" >
            <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><path d='M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z' fill='#fff'/></svg>
        </i>
    </cell> -->
    <div class="loading"
         v-if="!infoList">Loading....
      <!-- <img src="../assets/images/loading.svg" alt="">  -->
    </div>
    <!-- 头部奖励-->
    <topReward :value="amount" ></topReward>

    <div class="info-main">
      <!-- <div class="" v-if="refill_type===1" style=" font-size: 14px;padding: 20px 0px 10px;text-align: left;">
        <p>Mohon foto ulang bagian depan KTP pada kotak di bawah dan coba verifikasi wajah kembali.</p>
      </div> -->

      <div v-for="(item,index) in infoList"
           :key="index"
           :class="[item.input_type=='image'? 'photo-list':'',item.input_type=='image'&&!hasimgflag&&refill_type!==1 ?'photo-list-p':'']">

        <div class="mgt10 info-div"
             v-if="item.input_type=='text'">
          <p v-if="item.has_val&&item.code=='user_name'&&refill_type!==1"
             style="color: #ccc;">{{item.title}}</p>
          <p v-else>{{item.title}}
            <font style="color: #999;"
                  v-if="item.code=='user_name'">(Tidak dapat diubah)</font>
            <em class="red1"
                v-if="item.required ==='0'">(Opsional)</em>
          </p>

          <input class="inp"
                 type="text"
                 v-model="item[item.code]"
                 v-if="item.has_val&&item.code=='user_name'&&refill_type!==1"
                 readonly
                 style="color: #ccc;"
                 :placeholder="item.example_val ">
          <input class="inp"
                 type="text"
                 @blur="blurFun(item)"
                 v-model="item[item.code]"
                 v-else
                 :placeholder="item.example_val ">
          <div class="br"></div>
        </div>

        <div class="mgt10 info-div"
             v-if="item.input_type=='phone'||item.input_type=='number'||item.input_type=='tel'">

          <p v-if="item.has_val&&(item.code=='user_mobile'||item.code=='user_idcard')&&refill_type!==1"
             style="color: #ccc;">{{item.title}}</p>
          <p v-else>{{item.title}}
            <font style="color: #999;"
                  v-if="item.code=='user_mobile'||item.code=='user_idcard'">(Tidak dapat diubah)</font>
            <em class="red1"
                v-if="item.required ==='0'">(Opsional)</em>
          </p>
          <input class="inp"
                 type="tel"
                 v-model="item[item.code]"
                 v-if="item.has_val&&(item.code=='user_mobile'||item.code=='user_idcard')&&refill_type!==1"
                 readonly
                 style="color: #ccc;"
                 :placeholder="item.example_val">
          <input class="inp"
                 type="tel"
                 @blur="blurFun(item)"
                 v-model="item[item.code]"
                 v-else
                 :placeholder="item.example_val ">
          <i v-if="(item.check_type=='phone'||item.check_type=='telephone_or_phone')&&!(item.has_val&&(item.code=='user_mobile'||item.code=='user_idcard'))"
             @click="toselectTel(index)"
             class="icon-right-addtel iconfont icon-yuanquanjiahao"></i>
          <div class="br"></div>
        </div>

        <div class="mgt10 info-div"
             v-if="item.input_type=='select'">
          <p>{{item.title}}
            <em class="red1"
                v-if="item.required ==='0'">(Opsional)</em>

          </p>
          <popup-picker class="inp"
                        value-text-align='left'
                        @on-change="blurFun(item)"
                        cancel-text='Batal'
                        confirm-text='Konfirmasi'
                        v-model="item[item.code]"
                        :data="[item.valueArr]"
                        :placeholder="item.example_val "></popup-picker>
          <i class="icon-right iconfont icon-youjiantou"></i>
          <div class="br"></div>
        </div>

        <div class="mgt10 info-div"
             v-if="item.input_type=='date'">
          <p>{{item.title}}
            <em class="red1"
                v-if="item.required ==='0'">(Opsional)</em>

          </p>
          <!-- <popup-picker class="inp" value-text-align='left' @on-change="blurFun(item)" :data='item.value' cancel-text='Batal' confirm-text='Konfirmasi' v-model="item[item.code]" :placeholder="item.example_val "></popup-picker> -->
          <datetime @on-change="blurFun(item)"
                    :default-selected-value='`${new Date()}`'
                    class="inp"
                    value-text-align='left'
                    :min-year='1900'
                    cancel-text='Batal'
                    format='DD-MM-YYYY'
                    confirm-text='Konfirmasi'
                    v-model="item[item.code]"
                    :placeholder="item.example_val "></datetime>
          <i class="icon-right iconfont icon-youjiantou"></i>
          <div class="br"></div>
        </div>

        <div class="mgt10 info-div"
             v-if="item.input_type=='select_province'||item.input_type=='select_city'||item.input_type=='select_large_district'||item.input_type=='select_small_district'">
          <p>{{item.title}}
            <em class="red1"
                v-if="item.required ==='0'">(Opsional)</em>

          </p>
          <popup-picker class="inp"
                        value-text-align='left'
                        :data='item.value'
                        v-if="item.value[0]&&item.value[0].length>0"
                        cancel-text='Batal'
                        confirm-text='Konfirmasi'
                        v-model="item[item.code]"
                        @on-change="todoaddress(item.input_type,'',index)"
                        show-name
                        :placeholder="item.example_val "></popup-picker>
          <div @click="todoaddress(item.input_type,1)"
               v-else>
            <popup-picker class="inp"
                          value-text-align='left'
                          :data='item.value'
                          disabled
                          cancel-text='Batal'
                          show-name
                          :placeholder="item.example_val "></popup-picker>
          </div>
          <i class="icon-right iconfont icon-youjiantou"></i>
          <div class="br"></div>
        </div>

        <div class="mgt10  info-div1"
             v-if="item.input_type=='radio'">
          <p>{{item.title}}
            <em class="red1"
                v-if="item.required ==='0'">(Opsional)</em>

          </p>
          <span>
            <Radio :options='item.value'
                   v-model="item[item.code]"
                   @on-change='togetVal(item,item[item.code])'></Radio>
          </span>
        </div>

        <div class="info-div titonly"
             v-if="item.input_type=='image'&&item.code=='idcard_image_front'&&!hasimgflag&&refill_type!==1">
          <p>Unggah KTP anda dan dapatkan bonus Rp 2000
          </p>
        </div>

        <li v-if="item.input_type=='image'&&item.code=='idcard_image_front'">
          <i v-if="item[item.code]"
             @click="showphotofun(toOpenCammerFront,item[item.code])">
            <img width="100%"
                 :src="item[item.code]"
                 alt="">
          </i>
          <i v-else
             @click="toOpenCammerFront">
            <em class="iconfont icon-Photo"></em>
          </i>
          <p>{{item.title}}
            <em class="red1"
                v-if="item.required ==='0'">(Opsional)</em>
          </p>
        </li>

        <li v-if="item.input_type=='image'&&item.code=='idcard_image_reverse_side'">

          <i v-if="item[item.code]"
             @click="showphotofun(toOpenCammerSide,item[item.code])">
            <img width="100%"
                 :src="item[item.code]"
                 alt="">
          </i>
          <i v-else
             @click="toOpenCammerSide">
            <em class="iconfont icon-Photo"></em>
          </i>
          <p>{{item.title}}
            <em class="red1"
                v-if="item.required ==='0'">(Opsional)</em>

          </p>

        </li>

        <li v-if="item.input_type=='image'&&item.code=='idcard_image_hand'">
          <i v-if="item[item.code]"
             @click="showphotofun(toOpenCammerHand,item[item.code])">
            <img width="100%"
                 :src="item[item.code]"
                 alt="">
          </i>
          <i v-else
             @click="toOpenCammerHand">
            <em class="iconfont icon-Photo"></em>
          </i>
          <p>{{item.title}}
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
        </div> -->
      <!-- <div class="info-div mgt10">
            <input class="inp" type="text" placeholder="Silahkan isi alamat lengkap">
            <div class="br"></div>
        </div> -->

      <!-- <div class="mgt10 info-div2">
            <p>No KTP</p>
             <div>6541643478864688467</div>
             <div class="br"></div>
        </div> -->

      <div class="sub-btn-out"
           v-if="infoList&&infoList.length>0">
        <span v-if="hasvalflag&&refill_type!==1"
              class="sub-btn"
              @click="toshowConfirm()">
          Lanjut
        </span>

        <span v-else
              class="sub-btn"
              @click="toSubmit(1)">
          Lanjut
        </span>

      </div>

      <BottomTips></BottomTips>
      <Kefuicon></Kefuicon>

    </div>

    <div class="show-photo-view">
      <confirm v-model="showphoto"
               :show-cancel-button="false"
               :show-confirm-button="false"
               :close-on-confirm="false">
        <div class="show-photo-div">
          <div class="show-photo-div1">
            <img width="100%"
                 :src="showphotoVal.url"
                 alt="">
            <p>Foto ktp yang jelas akan meningkatkan tingkat persetujuan sebesar 20%</p>
          </div>

          <div class="show-photo-div2">
            <span @click="showphoto=false"
                  class="c1">Keluar</span>
            <span class="c2"
                  @click="showphoto=false,showphotoVal.funname()">Unggah ulang</span>
          </div>
        </div>
      </confirm>
    </div>

    <!-- confirm -->
    <div class="confirm-divmain">
      <confirm v-model="showconfirm"
               :close-on-confirm="false"
               cancel-text='Ubah'
               confirm-text='Yakin'
               @on-confirm='toSubmit()'>
        <div class="confirm-div">
          <div class="confirm-div1">Konfirmasi Informasi KTP</div>
          <div class="br"></div>
          <div class="confirm-div2">
            <p v-for="(item,index) in infoList"
               :key="index"
               v-if="item.code=='user_name'||item.code=='user_idcard'">
              <i>{{item.title}}</i> {{item[item.code]}}</p>

            <em>Pastikan informasi benar, setelah konfirmasi tidak dapat diubah lagi.</em>
          </div>
        </div>
      </confirm>
    </div>

  </div>
</template>
<style scoped>
  .titonly {
    position: absolute;
    text-align: center;
    left: 0;
    right: 0;
    top: 0;
    width: 300%;
  }
  .photo-list-p {
    padding-top: 30px;
    position: relative;
  }
</style>


<script>
  import { PopupPicker, Confirm, Datetime } from "vux";
  import Radio from "./Radio";
  import { toNext, toNexturl, getData, tocheckVal, todoaddress } from "./tonext";


  import baseinfo from "../request/baseinfo";
  if (localStorage.getItem("appid")) {
    baseinfo.appid = localStorage.getItem("appid");
  }
  const vm = {
    name: "BasicInfo",
    components: {
      PopupPicker,
      Radio,
      Datetime,
      Confirm
    },
    data() {
      return {
         amount: "",
        // 表项目list
        infoList: '',
        o_push: "",
        device_conf: "",
        sub_url: "",
        refill_type: '',  // 是否重填字段
        imgkind: '',

        hasvalflag: false,
        hasimgflag: false,
        showconfirm: false,
        showphoto: false,
        showphotoVal: {
          url: '',
          funname: ""
        },
        // showkap: true,
      };
    },

    async created() {
      
      await toNext(this);
      await getData(this, this.$IPS.apiGetlist, 1);
       let amount= localStorage.getItem("amount")
   this.amount=amount
      if (this.refill_type === 1) {
        this.show_idcard_image_front()
      }


      try {
        this.Doevent('info_basic_view');
      } catch (e) {
      }
    },
    mounted() {

      window["GetTakePhotoUrl"] = (kind, url) => {
        // alert(JSON.stringify(obj))
        if (url && url.image_path) {
          this.$vux.loading.hide();
        }
        for (let i = 0, n = this.infoList.length; i < n; i++) {
          if ((this.infoList[i].code == "idcard_image_front" && kind == 1010) || (this.infoList[i].code == "idcard_image_reverse_side" && kind == 1020) || (this.infoList[i].code == "idcard_image_hand" && kind == 1000)) {
            if (baseinfo.appid == '10001') {
              let img = new Image();
              img.src = url.image_path;
              img.onload = () => {
                // alert(img.width)  // kp得拍照检验
                if (img.width > 256 && img.height > 256) {
                  this.infoList[i][this.infoList[i].code] = url.image_path;
                  this.touplodimg(url.image_path);
                  this.blurFun(this.infoList[i])
                } else {
                  this.showmsg('Ukuran gambar terlalu kecil, silahkan unggah ulang')
                }
              }
            } else {
              this.infoList[i][this.infoList[i].code] = url.image_path;
              this.touplodimg(url.image_path);
              this.blurFun(this.infoList[i])
            }

          }
        }
      };

      window["GetDefaultPhone"] = url => {
        this.infoList[this.imgkind][this.infoList[this.imgkind].code] = ((url.user_number + '').replace(/[^0-9]/ig, ""));
      };
      
      window["comebackIndex"] =()=>{
          this.$router.replace({path: "CreditTest"})
      }
        if (this.refill_type === 1) {
          try {
            Android.doTestLimitShowBack(true, 'Informasi tidak diberikan kepada pihak ketiga, mohon dilengkapi. Apakah yakin Anda ingin keluar?');
          } catch (e) {
            Android.doTestLimitShowBack(true, '')
          }
        } else {
          try {
            // Android.doTestLimitShowBack(true, 'Cukup isi informasi sekali untuk mengajukan beberapa produk');
            Android.doTestLimitShowBack(true, 'Isi informasi sekali untuk mengajukan beberapa produk. Yakin keluar?');
          } catch (e) {
            Android.doTestLimitShowBack(true, '')
          }
        }

    },
    methods: {
      // 电话号码选着
      toselectTel(index) {
        this.imgkind = index;
        try {
          if (typeof eval(Android.chooseContact) == "function") {
            Android.chooseContact();
          }
        } catch (e) {
          this.showmsg("Versi anda sekarang versi rendah, tidak bisa menggunakan fitur memilih nomor dari kontak");
        }
      },

      checkimg(imgurl) {
        let img = new Image()
        img.src = imgurl
        img.onload = function () {
          if (img.width > 256 && img.height > 256) {
            return true
          }
        }
      },


      // 消息提示
      showmsg(msg) {
        this.$vux.toast.show({
          text: msg,
          type: "text",
          position: "middle",
          width: "80%"
        });
      },


      // 自动调用是省份证图片弹窗

      show_idcard_image_front() {
        for (let i = 0, n = this.infoList.length; i < n; i++) {
          if (this.infoList[i].code == "idcard_image_front" && this.infoList[i][this.infoList[i].code]) {
            // this.showphotofun('toOpenCammerFront', this.infoList[i][this.infoList[i].code])
            this.infoList[i][this.infoList[i].code] = '';
            // this.toOpenCammerFront()

          }
        }
      },

      // 点击放大图片
      showphotofun(name, url) {
        this.showphoto = true;
        console.log(url)
        this.showphotoVal = {
          url: url,
          funname: name
        }
      },


      //输入监控操作
      // async blurFun(item) {
      //   let info = await this.axios.post(this.$Api.apifield, { pro_code: 1000, order_no: this.$route.query.order_no || '', field_name: item.code, field_value: JSON.stringify(item[item.code]) });
      // },

      async touplodimg(imgurl) {
        
        let info = await this.axios.post(this.$IPS.apiImgsub, { idcard_image_front: imgurl })
      },


      togetVal(item, val) {
        item[item.code] = val;
        this.blurFun(item)
      },



      toOpenCammerFront() {
        this.DoPhotoFun(1010); //正
      },
      toOpenCammerSide() {
        this.DoPhotoFun(1020); //反
      },
      toOpenCammerHand() {
        this.DoPhotoFun(1000); //手持
      },

      todoaddress(type, kind, index) {
        todoaddress(type, this, kind, index);
      },

      async toshowConfirm() {
        if ((await tocheckVal(this)) === false) return;
        this.showconfirm = true;
      },

      async toSubmit(type) {
        if (type == 1) {
          if ((await tocheckVal(this)) === false) return;
        }
        // 埋点统计上报
        try {
          this.Doevent('info_basic_next_click');
        } catch (e) {

        }
        let data = {
          order: {},
          //order_base: {}
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

        let devinfo = JSON.parse(localStorage.getItem("loaninfo"))
        // data.order_base.application_amount = devinfo.application_amount;
        // data.order_base.application_term = devinfo.application_term;
        // data.order_base.product_name = devinfo.product_name;
        // data.order_base.is_reloan = "0";
        // data.order.product_id =devinfo.product_id;
        data.order_type = this.$route.query.order_type || 0;
        data.order_no = this.$route.query.order_no || "";
        data.pro_code = this.$route.query.pro_code || 1000;
        data.o_push = this.o_push;
        // console.log(JSON.stringify(data))
        let devlist = JSON.stringify(this.device_conf);
        // url操作
        toNexturl(
          this,
          this.sub_url || this.$IPS.apiInfousbmit,
          data,
          1,
          baseinfo.appid,
          devlist
        );
      }
    }
  };
  export default vm;
</script>


