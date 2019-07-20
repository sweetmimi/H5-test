<template>
  <div class="bgc">
    <div class="topBgc">
      <div class="maBiao">
        <p class="organName">{{infoData.title}}</p>
        <div class="number-grow-warp">
          <span class="rp">Rp</span>
          <numberRun :value="amount" style="display:inline-block;"></numberRun>
        </div>
      </div>
    </div>
    <div class="headerline">
      <div>Pinjaman berikut cocok buat Anda</div>
    </div>
    <div class="item_card">
      <ul>
        <li>
          <div
            class="itemIcon"
            v-for="(item,index) in infoProductlist"
            :key="index"
            :class="{ isActive:arr.includes(index)}"
            @click="goappidPage(item.appid)"
          >
            <div class="iconImg" :class="{ isActive:arr.includes(index)}"></div>

            <div class="iconLeft fl">
              <img :src="item.icon" alt width="100%" />
            </div>

            <div class="fr itemRight">
              <p class="item_title">{{item.product_name}}</p>
              <p class="item_number">{{item.price}}</p>
              <div class="item_score">
                <div class="fl">{{item.score}}</div>
                <img class="fl" src="/static/images/star_icon.png" alt />
              </div>
            </div>
          </div>
        </li>
      </ul>

      <div class="btn-test-out">
        <span v-if = "oneclick&&isfirstCome==0" class="btn-test"  @click="toSubmit(1)">Pengajuan sekali klik</span>
        <!-- <span v-if = "oneclick" class="btn-test" @click="toSubmit(1)" >Pengajuan sekali klik</span> -->
        <span v-else class="btn-test" @click="backIndex">Dapatkan limit</span>
      </div>
      <p class="tishi" v-if="oneclick&&isfirstCome==0">
        Setelah pengajuan, pinjaman segera ditinjau.
        <br />Pastikan ponsel Anda aktif.
      </p>
    </div>
    <alert
      v-model="show"
      title="Selamat pengajuan Anda berhasil, harap menunggu sistem untuk pencairan"
      @on-show="onShow"
      @on-hide="onHide"
      button-text="Saya mengerti"
    ></alert>
  </div>
</template>


<script>
import { Alert } from "vux";
import { toNext, toNexturl } from "./tonext";
import devinfo from "../request/devinfo";
import { setTimeout } from "timers";
export default {
  name: "step1",
  components: {
    Alert
  },
  data() {
    return {
      show: false,
      infoData: "",
      amount: "",
      infoProduct: "",
      infoProductlist: "",
      device_conf: "",
      isfirstCome: "",
      arr: [],
      oneclick: true
    };
  },
  async created() {
    
    await this.getProduct();
  },
  methods: {
    // 消息提示
    showmsg(msg) {
      this.$vux.toast.show({
        text: msg,
        type: "text",
        position: "middle",
        width: "80%"
      });
    },
    // async getIndexdata() {
    //   let info = await this.axios.post(this.$IPS.apiWindow, {});

    //   if (info.code === 0) {
    //     this.infoData = info.data;
    //     this.amount = Number(info.data.amount);
    //   } else {
    //     this.showmsg(info.code + info.message);
    //   }
    // },
    async getProduct() {
      let infoProduct = await this.axios.post(this.$IPS.apiLoanprouduct, {});

      if (infoProduct.code === 0) {
        this.infoData = infoProduct.data;
        this.infoProductlist = infoProduct.data.product_list;
        this.isfirstCome = infoProduct.data.push_status;
        this.amount = Number(infoProduct.data.amount);
      } else {
        this.showmsg(infoProduct.code + info.message);
      }
    },
    //一键申请
    async toSubmit() {
      
      try {
        Android.eventTrack("testlimit_apply_button_click");
      } catch (e) {}
      let data = {
        appid_arr: {}
      };

      //通过forEach();

      let appid_arr = [];
      this.infoProductlist.forEach((val, index, val_arr) => {
        appid_arr.push(val.appid);
      });
      // localStorage.setItem("appid_arr",JSON.stringify(appid_arr));

      //console.log(appid_arr)
      data.appid_arr = appid_arr;
      data.pro_code = this.$route.query.pro_code || 1000;
      data.o_push = this.o_push;

      // data.appid_arr=
      let devlist = JSON.stringify(this.device_conf);
      var _this = this;
      setTimeout(function() {
        _this.show = true;
        _this.$vux.loading.hide();
      }, 2500);

      // url操作
      toNexturl(
        this,
        this.sub_url || this.$IPS.apiProductsub,
        data
      );
    },
    //点击弹窗确认按钮
    onHide() {
      //this.showmsg("123")
      this.oneclick = false;
    },
    //领取额度
    backIndex() {
      try {
        Android.eventTrack("testlimit_getamount_button_click");
      } catch (e) {}
      Android.finishWeb();
    },
    //推荐产品跳转
    goappidPage(id) {
      try {
        Android.eventTrack("testlimit_product_click");
      } catch (e) {}

      Android.startProductLoan(id + ""); //对应得产品借款页面方法
    }
  },

  mounted() {}
};
</script>

<style lang="less" scoped>
/deep/ .weui-dialog {
  max-width: 600px;
  width: 92%;
}
/deep/ .weui-dialog__btn_primary {
  color: #fff;
}
/deep/ .weui-dialog__btn {
  background-color: #029c2e;
  margin: 2% 8% 8%;
  color: #fff;
  display: block;
  border-radius: 25px;
}
/deep/ .weui-dialog__bd {
  display: none;
}
/deep/ .weui-dialog__ft:after {
  display: none;
}
/deep/ .weui-dialog__hd {
  padding: 8% 5%;
  text-align: left;
  font-size: 12px;
}
/deep/ .weui-dialog__title {
  font-size: 16px;
}
html {
  background-color: #ffffff;
}
.bgc {
  background-color: #ffffff;
}
.fl {
  float: left;
}
.fr {
  float: right;
}

.topBgc {
  width: 100%;
  height: 350px;
  position: relative;
  background-image: url(/static/images/topTestBgc.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  .maBiao {
    position: absolute;
    top: 115px;
    left: 50%;
    transform: translateX(-50%);
    .organName {
      color: #2cb45c;
      text-align: center;
      font-size: 18px;
      text-overflow: ellipsis;
      display: inline-block;
      white-space: nowrap;
      max-width: 170px;
      overflow: hidden;
      font-family: Arial-BoldMT;
    }
    .rp {
      font-family: Arial-BoldMT;
      font-size: 18px;
      color: #2cb45c;
      display: inline-block;
      letter-spacing: 2.67px;
      line-height: 30px;
      margin: 10px auto;
      font-weight: 700;
    }
  }
}

.tishi {
  text-align: center;
  font-size: 12px;
  color: #999;
  margin: 10px 0 0px;
}
.btn-test-out {
  width: 90%;
  margin: 20px auto;
  height: 50px;
  margin-top: 20px;
}
.btn-test {
  font-family: Arial-BoldMT;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  background: #2cb45c;
  border: 1px solid #2cb45c;
  color: #fff;
  border-radius: 50px;
  font-size: 18px;
}

.headerline {
  width: 100%;
  height: 36px;
  line-height: 36px;
  text-align: center;
  color: #666666;
  position: relative;
}
.headerline div:before,
.headerline div:after {
  position: absolute;
  background: #bbbbbb;
  content: "";
  height: 1px;
  top: 50%;
  width: 50px;
}
.headerline div:before {
  left: 10px;
}
.headerline div:after {
  right: 10px;
}
</style>

