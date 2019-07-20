<template>
  <div>
    <div class="loading"
         v-if="!infoList">Loading....</div>

    <div class="top-tips">
      <p>Informasi penting. Pastikan benar.</p>
      <!-- <p>2. Cukup unggah 1 bukti kerja saja untuk diproses.</p> -->
    </div>

    <div class="need_main">
      <div class='need_div'
           v-if="listArr1&&listArr1.length>0">
        <div class='title'>Wajib isi</div>
        <div class='need_div1'>
          <li v-for="(item,index) in listArr1"
              :key="index">
            <div class='need_div2'
                 @click="showexamplefun(item)">
              <span v-if="item.input_val"> <img :src="item.input_val"
                     alt=""></span>
              <span v-else> <em class="iconfont icon-Photo"></em></span>
              <p>{{item.title}}</p>
            </div>
          </li>
        </div>

      </div>

      <div class='noneed_div'
           v-if="listArr2&&listArr2.length>0">
        <div class='title'>Opsional<i>(Satu Opsional,Tekan dan unggah)</i></div>
        <!-- <div class='noneed_div1'
             v-for="(item1,index1) in  Math.ceil(listArr2.length/3)"
             :key="index1">
          <div class="br"></div> -->
        <div class='noneed_div1'>

          <!-- <li v-for="(item,index) in listArr2"
              v-if="(index1)*3<=(index)&&(index)<(index1+1)*3"
              :key="index"
              @click="showexamplefun(item)"> -->
          <li v-for="(item,index) in listArr2"
              :key="index"
              @click="showexamplefun(item)">
            <div class='noneed_div2'
                 :class="[item.input_val ? 'colorff5' :'']">
              <span>
                <!-- <img class='img1'
                     v-if="item.input_val"
                     :src="item.input_val"
                     alt=""> -->
                <!-- <img class='img2'
                     :src="`/static/images/${item.code}.jpg`"
                     alt=""> -->
                <i :class="`iconfont icon-${item.code}`"></i>
              </span>
              <!-- <span> <img src="" alt=""></span> -->
              <p>{{item.title}}</p>
            </div>
            <!-- <div class="hairline-right"
                 v-if="(index+1)%3!=0"></div> -->

          </li>

        </div>
        <!-- <div class="br"></div> -->

      </div>

    </div>

    <div class='info-main'>
      <div class="sub-btn-out">
        <span class="sub-btn"
              @click="toSubmit">Lanjut</span>
      </div>

      <!-- <BottomTips></BottomTips> -->
    </div>

    <!-- <Kefuicon></Kefuicon> -->

    <div class="show-photo-view">
      <confirm v-model="showexample"
               :show-cancel-button="false"
               :show-confirm-button="false"
               :close-on-confirm="false"
               :hide-on-blur="true"
               @on-hide="closeshowexamplefun">
        <div class="show-photo-div">
          <div class="show-photo-div1">
            <span style="display: block;max-height: 320px; overflow: scroll;">
              <img width="100%"
                   v-if="imgurl"
                   :src="`/static/images/${imgurl}_1.jpg`"
                   alt="">
            </span>
            <!-- <p>Foto ktp yang jelas akan meningkatkan tingkat persetujuan sebesar 20%</p> -->
            <p>Unggah foto yang jelas</p>
          </div>

          <div class="show-photo-div2">
            <!-- <span @click="closeshowexamplefun"
                  class="c1">Keluar</span> -->
            <span class="c2"
                  style="width: 100%;"
                  @click="toOpenFun">Unggah ulang</span>
          </div>
        </div>
      </confirm>
    </div>

  </div>
</template>
<style scoped>
.title {
  font-size: 16px;
  margin-top: 15px;
  padding-left: 15px;
  margin-bottom: 15px;
}
.title i {
  font-size: 12px;
  font-style: normal;
  color: #999;
  padding-left: 10px;
}
.need_div1 {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 80%;
  margin: auto;
}
.need_div1 li {
  list-style: none;
  width: 50%;
  margin-top: 15px;
}
.need_div2 {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 15px;
}
.need_div2 span {
  display: flex;
  width: 80px;
  height: 80px;
  background-color: #eeeeee;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border: 1px #c8c8c8 dashed;
}
.need_div2 span em {
  font-size: 25px;
  color: #acacac;
  position: relative;
  left: 4px;
}
.need_div2 span img {
  width: 100%;
}

.need_div2 p {
  color: #666;
  margin-top: 10px;
  word-break: break-word;
  text-align: center;
}

.noneed_div1 {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
}
.noneed_div1 li {
  width: 33.33%;
  list-style: none;
  position: relative;
}
.hairline-right::after {
  content: "";
  position: absolute;
  background-color: #c8c8c8;
  display: block;
  top: 0;
  bottom: auto;
  height: 100%;
  width: 1px;
  left: auto;
  right: 0;

  transform: scaleX(0.5);
  -webkit-transform: scaleX(0.5);
}
.noneed_div2 {
  padding: 20px 10px;
  padding-top: 15px;
  color: #c6c6c6;
}

.noneed_div2 span {
  width: 100%;
  display: block;
  text-align: center;
  overflow: hidden;
  margin-bottom: 5px;
  max-height: 40px;
}
.noneed_div2 span i {
  font-size: 20px;
}
.noneed_div2 span .img1 {
  width: 100%;
}
.noneed_div2 span .img2 {
  width: 35%;
  max-width: 40px;
  /* height: 40px; */
}
.noneed_div2 p {
  text-align: center;
  font-size: 14px;
  word-break: break-word;
  text-align: center;
}
</style>


<script>
import { Confirm } from "vux";
import baseinfo from "../request/baseinfo";
import devinfo from "../request/devinfo";

import { toNext, toNexturl, getData, tocheckVal, todoaddress } from "./tonext";
export default {
  name: "Step",
  components: {
    Confirm
  },

  data() {
    return {

      infoList: '',

      listArr1: [], // 必填
      listArr2: [], // 选填

      showexample: false,
      imgurl: '',



      o_push: "",
      sub_url: "",


    };
  },

  async created() {

    let cc = [{
      "title": "Mutasi Rekening", // 银行流水
      "code": "bank_statement_img",
      "bank_statement_img": '',
      "required": "0",
      "input_type": "photo",
      "input_val": "",
      "check_type": "text",
      "example_val": "",
      "value": []
    }, {
      "title": "Slip Gaji", //工资单
      "code": "slip_gaji_img",
      "slip_gaji_img": '',
      "required": "0",
      "input_type": "photo",
      "input_val": "",
      "check_type": "text",
      "example_val": "",
      "value": []
    }, {
      "title": "Bukti Kerja", // 工作证明
      "code": "work_proof_img",
      "work_proof_img": '',
      "required": "0",
      "input_type": "photo",
      "input_val": "",
      "check_type": "text",
      "example_val": "",
      "value": []
    }, {
      "title": "SIM",
      "code": "sim_img", // 驾照
      "sim_img": '',
      "required": "0",
      "input_type": "photo",
      "input_val": "",
      "check_type": "text",
      "example_val": "",
      "value": []
    }]


    // let cc = [{
    //   //驾照
    //   "title": "SIM",
    //   "code": "sim_img",
    //   "sim_img": '',
    //   "required": "1",
    //   "input_type": "photo",
    //   "input_val": "",
    //   "check_type": "text",
    //   "example_val": "",
    //   "value": []
    // }, {//银行卡
    //   "title": "Kartu Bank",
    //   "code": "kartu_bank_img",
    //   "kartu_bank_img": '',
    //   "required": "1",
    //   "input_type": "photo",
    //   "input_val": "",
    //   "check_type": "text",
    //   "example_val": "",
    //   "value": []
    // }, {//存折
    //   "title": "Buku Tabungan",
    //   "code": "buku_tabungan_img",
    //   "buku_tabungan_img": '',
    //   "required": "0",
    //   "input_type": "photo",
    //   "input_val": "",
    //   "check_type": "text",
    //   "example_val": "",
    //   "value": []
    // }, {//社保卡
    //   "title": "BPJS",
    //   "code": "bpjs_img",
    //   "bpjs_img": '',
    //   "required": "0",
    //   "input_type": "photo",
    //   "input_val": "",
    //   "check_type": "text",
    //   "example_val": "",
    //   "value": []
    // }, {//户口本
    //   "title": "Kartu Keluarga",
    //   "code": "kartu_keluarga_img",
    //   "kartu_keluarga_img": '',
    //   "required": "0",
    //   "input_type": "photo",
    //   "input_val": "",
    //   "check_type": "text",
    //   "example_val": "",
    //   "value": []
    // }, {//信用卡
    //   "title": "Kartu Kredit",
    //   "code": "kartu_kredit_img",
    //   "kartu_kredit_img": '',
    //   "required": "0",
    //   "input_type": "photo",
    //   "input_val": "",
    //   "check_type": "text",
    //   "example_val": "",
    //   "value": []
    // }, {//税卡
    //   "title": "NPWP",
    //   "code": "npwp_img",
    //   "npwp_img": '',
    //   "required": "0",
    //   "input_type": "photo",
    //   "input_val": "",
    //   "check_type": "text",
    //   "example_val": "",
    //   "value": []
    // }, {//员工卡
    //   "title": "Kartu Karyawan",
    //   "code": "kartu_karyawan_img",
    //   "kartu_karyawan_img": '',
    //   "required": "0",
    //   "input_type": "photo",
    //   "input_val": "",
    //   "check_type": "text",
    //   "example_val": "",
    //   "value": []
    // }, {//工资单
    //   "title": "Slip Gaji",
    //   "code": "slip_gaji_img",
    //   "slip_gaji_img": '',
    //   "required": "0",
    //   "input_type": "photo",
    //   "input_val": "",
    //   "check_type": "text",
    //   "example_val": "",
    //   "value": []
    // }, {//工作证明
    //   "title": "Bukti Kerja",
    //   "code": "work_proof_img",
    //   "work_proof_img": '',
    //   "required": "0",
    //   "input_type": "photo",
    //   "input_val": "",
    //   "check_type": "text",
    //   "example_val": "",
    //   "value": []
    // }, {//银行流水
    //   "title": "Mutasi Rekening",
    //   "code": "bank_statement_img",
    //   "bank_statement_img": '',
    //   "required": "0",
    //   "input_type": "photo",
    //   "input_val": "",
    //   "check_type": "text",
    //   "example_val": "",
    //   "value": []
    // }]
    if (baseinfo.appid == '10000') {
      this.infoList = cc
    } else {
      await getData(this, this.$Port.apiOptional);
    }
    this.listArr1 = [];
    this.listArr2 = [];
    this.infoList.forEach(v => {
      if (v.required === '1') {
        this.listArr1.push(v)
      } else {
        this.listArr2.push(v)
      }
    })

  },

  mounted() {
    try {
      Android.doTestLimitShowBack(true, 'Informasi penting. Jika tidak isi, Anda tidak akan dapat persetujuan. Yakin keluar?');
    } catch (e) {
      Android.doTestLimitShowBack(true);
    }

    //  获取相机图片
    window["GetDefaultCameraImg"] = url => {
      if (url.image_path) {
        if (this.imgurl) {
          if (this.listArr1 && this.listArr1.length > 0) {
            this.listArr1.forEach(v => {
              if (v.code == this.imgurl) {
                v[v.code] = url.image_path;
                v.input_val = url.image_path;
                this.blurFun(v)
                this.closeshowexamplefun()
                this.showmsg('Gambar berhasil diunggah')
              }
            })
          }
          if (this.listArr2 && this.listArr2.length > 0) {
            this.listArr2.forEach(v => {
              if (v.code == this.imgurl) {
                v[v.code] = url.image_path;
                v.input_val = url.image_path;
                this.blurFun(v)
                this.closeshowexamplefun()
                this.showmsg('Gambar berhasil diunggah')
              }
            })
          }


        }

      } else {
        this.showmsg('Gagal mendapatkan gambar')
      }

    };

    //  获取相册图片
    // window["GetDefaultAlbumImg"] = url => {
    //   if (url.image_path) {
    //     this.infoList[this.imgkind][this.infoList[this.imgkind].code] = url.image_path;
    //     this.infoList[this.imgkind].input_val = url.image_path;
    //     this.blurFun(this.infoList[this.imgkind])
    //     this.closeshowexamplefun()
    //   } else {
    //     this.showmsg('Gagal mendapatkan gambar')
    //   }
    // };

  },
  methods: {

    //输入监控操作
    async blurFun(item) {
      let info = await this.axios.post(this.$Port.apifield,
        { pro_code: 8500, order_no: this.$route.query.order_no || '', field_name: item.code, field_value: JSON.stringify(item[item.code]) }
      );
    },

    showexamplefun(item) {
      this.showexample = true;
      this.imgurl = item.code;
    },
    closeshowexamplefun() {
      this.showexample = false;
      this.imgurl = '';
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

    async toSubmit() {
      // if ((await tocheckVal(this)) === false) return;
      if (this.listArr1 && this.listArr1.length > 0) {
        for (let i = 0, n = this.listArr1.length; i < n; i++) {
          let cc = this.listArr1[i][this.listArr1[i].code];
          if (this.listArr1[i].required === "1") {
            if (!cc || cc.length < 1) {
              this.showmsg(this.listArr1[i].title + "  Tidak boleh kosong");
              return false;
            }
          }
        }
      }
      if (this.listArr2 && this.listArr2.length > 0) {
        let cc = this.listArr2.some(v => {
          return v[v.code] !== ''
        })

        if (!(baseinfo.appid == '90000' || baseinfo.appid == '20000' || baseinfo.appid == '20001')) {
          if (!cc) {
            this.showmsg('Mohon unggah minimal 1 bukti pekerjaan');
            return
          }
        }
      }


      let data = {
        order: {},
        order_base: {}
      };

      let tarr = [];
      tarr = this.listArr1.concat(this.listArr2);
      tarr.forEach(v => {
        data.order[v.code] = v[v.code];
      });
      // if (data.order.npwp && !/^[0-9]*$/.test(data.order.npwp)) {
      //   this.$vux.toast.show({
      //     text: 'Npwp Hanya dapat mengisi angka', type: "text", position: "middle", width: "80%"
      //   });
      //   return
      // }
      data.order_no = this.$route.query.order_no;
      data.pro_code = this.$route.query.pro_code || 8500;
      data.order_type = this.$route.query.order_type || 0;

      data.order_base.application_amount = devinfo.application_amount;
      data.order_base.application_term = devinfo.application_term;
      data.order_base.is_reloan = devinfo.is_reloan;
      // data.order_base.product_id =devinfo.product_id;
      data.order_base.product_name = devinfo.product_name;
      // alert(JSON.stringify(data))
      // return
      data.o_push = this.o_push;
      if (baseinfo.appid == '10000' || baseinfo.appid == '10009') {
        toNexturl(this, this.sub_url || this.$Port.apichangeinfo, data);
      } else {
        toNexturl(this, this.sub_url || this.$Port.apisupplyinfo, data);
      }

    },

    // 打开相机
    toOpenFun() {

      // if (item.input_type == 'photo') {
      try {
        if (typeof eval(Android.defaultCamera) == "function") {
          Android.defaultCamera();
        }
      } catch (e) {
        this.showmsg("Versi anda sekarang versi rendah, tidak bisa menggunakan fitur memilih nomor dari kontak");
      }

      // }
      // if (item.input_type == 'album') {
      //   try {
      //     if (typeof eval(Android.openAlbum) == "function") {
      //       Android.openAlbum()
      //     } else {
      //       Android.defaultCamera();
      //     }
      //   } catch (e) {
      //     Android.defaultCamera();
      //   }
      // }
    },







  }
  // methods end
};
</script>


