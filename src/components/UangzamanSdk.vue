<template>
  <div class>
    <div class="loading"
         v-if="!infoList">Loading....</div>
    <div class="top-tips">Unggah bukti kerja, tingkatkan keberhasilan pinjaman.</div>

    <div style="margin: 4%;font-size: 14px;">Ikatkan akun (min. 2)</div>
    <div class="list"
         v-if="infoList&&infoList.length>0">

      <div class="list_1"
           v-for="(item,index) in infoList"
           :key="index"
           @click="toclient(item.name,item.states)">
        <img :src="`/static/images/${item.name}_icon.jpg`"
             alt>
        <p v-if="item.states===2">
          <img style="height: 15px;"
               src="../assets/toauth_img2.png"
               alt="">
        </p>
        <p v-else>Pilih
          <i class="right iconfont icon-youjiantou"></i>
        </p>
      </div>

      <!-- <div class="list_1"
           @click="toclient('facebook')">
        <img src="/static/images/facebook_icon.jpg"
             alt>
        <p>Pilih
          <i class="right iconfont icon-youjiantou"></i>
        </p>
      </div>

      <div class="list_1"
           @click="toclient('akulaku')">
        <img src="/static/images/akulaku_icon.jpg"
             alt>
        <p>Pilih
          <i class="right iconfont icon-youjiantou"></i>
        </p>
      </div>

      <div class="list_1"
           @click="toclient('tokopedia')">
        <img src="/static/images/tokopedia_icon.jpg"
             alt>
        <p>Pilih
          <i class="right iconfont icon-youjiantou"></i>
        </p>
      </div>

      <div class="list_1"
           @click="toclient('telkomsel')">
        <img src="/static/images/telkomsel_icon.jpg"
             alt>
        <p>Pilih
          <i class="right iconfont icon-youjiantou"></i>
        </p>
      </div>

      <div class="list_1"
           @click="toclient('lazada')">
        <img src="/static/images/lazada_icon.jpg"
             alt>
        <p>Pilih
          <i class="right iconfont icon-youjiantou"></i>
        </p>
      </div>

      <div class="list_1"
           @click="toclient('whatsapp')">
        <img src="/static/images/whatsapp_icon.jpg"
             alt>
        <p>Pilih
          <i class="right iconfont icon-youjiantou"></i>
        </p>
      </div> -->

    </div>
    <div v-else>no data</div>

    <div class="sub-btn-out">
      <span class="sub-btn"
            @click="toSubmit()">{{btntxt ? 'Lanjut':'Lewati' }}</span>
    </div>
  </div>
</template>
<script>
import baseinfo from "../request/baseinfo";
import devinfo from "../request/devinfo";
import { toNext, toNexturl, getData, tocheckVal, todoaddress } from "./tonext";
const apiKey = location.host.split('.')[0] === 'loan' ? 'b3db12ec11d84d4bb12190882754b8bd' : '05a33af020184ae6a5a8a4c0728ff854';
export default {
  name: 'gojek',
  data() {
    return {
      userid: baseinfo.userid,
      infoList: "",
      o_push: "",
      sub_url: "",

      btntxt: false,
    }
  },
  created() {
    this.getData();
  },
  mounted() {
    //导入失败调用方法
    window["importMoXieDataError"] = () => {
      this.$router.push({ path: '/UangzamanSdk', query: { order_no: this.$route.query.order_no } })
    };
    //导入成功调用方法
    window["importMoXieDataSuccess"] = (v) => {
      this.showmsg('Keberhasilan resmi');
      this.getData();
      this.$router.push({ path: '/UangzamanSdk', query: { order_no: this.$route.query.order_no, taskId: v.taskId, taskType: v.taskType } })
    };
  },
  methods: {

    async  getData() {
      let info = await this.axios.post(this.$Port.apiauthlist, { order_no: this.$route.query.order_no })
      if (info.code === 0) {
        this.infoList = info.data;
        this.btntxt = this.infoList.some(e => {
          return e.states === 2
        });

      } else {
        this.$vux.toast.show({ text: info.code, type: "text" });
      }

    },
    tourl() {
      this.$router.push({ path: '/UangzamanSdk', query: { order_no: this.$route.query.order_no } })
    },

    showmsg(msg) {
      this.$vux.toast.show({
        text: msg,
        type: "text",
        position: "middle",
        width: "80%"
      });
    },



    async toclient(tasktype, states) {
      if (states === 2) {
        this.showmsg('Data sudah selesai verifikasi, tidak perlu verifikasi ulang');
        return
      }
      this.$vux.loading.show({ text: "Melompat ..." });
      let info = await this.axios.post(this.$Port.apisocial, { order_no: this.$route.query.order_no, taskType: tasktype })
      this.$vux.loading.hide()
      try {
        if (typeof eval(Android.startMoXieClient) == "function") {
          Android.startMoXieClient(this.userid, apiKey, tasktype);
        } else {
          this.showmsg('none function');
          this.tourl()
        }
      } catch (e) {
        this.showmsg('none function');
        this.tourl()
      }
    },


    async toSubmit() {
      // if ((await tocheckVal(this)) === false) return;
      // try {
      //   Android.eventTrack('info_toauth_next_click');
      // } catch (e) {
      // }

      gtag('event', `UangzamanSdk_list_bottom_btnclick`, {
        value: 1,
      });

      let data = {
        // order: {},
        order_base: {}
      };
      // this.infoList.forEach(v => {
      //   data.order[v.code] = v[v.code];
      //   if (v.input_type == "select") {
      //     v.value.forEach((s, i) => {
      //       if (s.text == v[v.code].join("")) {
      //         data.order[v.code] = s.value;
      //       }
      //     });
      //   }

      //   if (data.order[v.code] instanceof Array) {
      //     data.order[v.code] = data.order[v.code].join("");
      //   }
      // });

      data.order_no = this.$route.query.order_no;
      data.pro_code = this.$route.query.pro_code || 10000;
      data.order_type = this.$route.query.order_type || 0;

      data.order_base.application_amount = devinfo.application_amount || '5000';
      data.order_base.application_term = devinfo.application_term || '7';
      data.order_base.is_reloan = devinfo.is_reloan || 0;
      //开发环境 
       data.order_base.product_id =devinfo.product_id;
      //生产环境
      //data.order_base.product_name = devinfo.product_name || 'cashX';




      // console.log(data)
      // return
      data.o_push = this.o_push;
      // data.userid = this.$route.query.user_id || this.userinfo.user_id;
      toNexturl(this, this.sub_url || this.$Port.apiprocess, data);
    }


  },
}
</script>
<style scoped>
.list {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 3%;
  width: 100%;
  flex-wrap: wrap;
}
.list_1 {
  /* flex: 0.4; */
  text-align: center;
  border: 1px solid #e2e2e2;
  padding: 10px 0px;
  width: 44%;
  box-sizing: border-box;
  margin-left: 4%;
  margin-bottom: 5%;
}
.list_1 img {
  height: 30px;
  /* width: 80%; */
}
.list_1 p {
  font-size: 14px;
  color: #8a8a8a;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
  height: 22px;
}
.list_1 p i {
  font-size: 22px;
  height: 20px;
  display: flex;
  align-items: center;
}
</style>
