<template>
  <div class="bgc">
     <div class="loading"
         v-if="!infoData">Loading....
    
    </div>
    <div class="topBgc">
      <div class="maBiao">
        
        <p class="organName">{{infoData.title}}</p>
        <div class="number-grow-warp">
          <span class="rp">Rp</span>
          <numberRun :value="amount" style="display:inline-block"></numberRun>
        </div>
      </div>
    </div>

    <div class="infoList">
      <li>
        <i class="left">{{loan_process.name}}</i>
        <span class="right" v-if="loan_process.type===0" @click="gobaseInfo">Sertifikasi</span>
        <span class="right1" v-else >Selesai</span>
      </li>

      <li>
        <i class="left">{{loan_process1.name}}</i>
        <span class="right" v-if="loan_process1.type===0" @click="goPage">Sertifikasi </span>
        <span class="right1" v-else>Selesai</span>
      </li>
    </div>

    <div class="btn-test-out">
      <span class="btn-test" @click="goPage" v-if="infoData.product_list!==''">Tes berapa yang dapat Anda pinjam 
</span>
      <span class="btn-test" @click="goPage" v-else>Lengkapi Info, Naikkan Limit</span>
    </div>
      <div class="headerline" v-if="infoData.product_list==''">
      <div>Pinjaman berikut cocok buat Anda</div>
    </div>
        <div class="item_card" v-if="infoData.product_list!==''">
      <ul>
        <li>
          <div
            class="itemIcon"
            v-for="(item,index) in infoProductlist"
            :key="index"
            
            @click="toappidpage(item.appid)"
          >
            

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
      
    </div>
  </div>
</template>

<style lang="less" scoped>
html , body{
  background-color: #fff;
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
 .maBiao{
   position: absolute;
   top: 115px;
   left: 50%;
   transform: translateX(-50%);
   .organName {
      
       color: #2CB45C;
      text-align: center;
      font-size: 18px ;
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
      color: #2CB45C;
      display: inline-block;
      letter-spacing: 2.67px;
      line-height: 30px;
      margin: 10px auto;
      font-weight: 700;
    }
 }
    
  }

.infoList {
  width: 90%;
  margin: 30px auto;
  height: 100px;
  
  overflow: hidden;
  li {
    list-style: none;
    line-height: 35px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px 0px;

    i {
      display: flex;
      font-style: normal;
    }

    .left {
      font-family: Arial-BoldMT;
      font-size: 16px;
    }

    .right {
      width: 100px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #2CB45C;
      border: 1px solid #2CB45C;
      color: #fff;
      border-radius: 50px;
      font-size: 18px;
      font-size: 16px; //font-family: @fMedium;
    }
    .right1 {
      width: 100px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #fff;
      border: 1px solid #2CB45C;
      color: #2CB45C;
      border-radius: 50px;
      font-size: 18px;
      font-size: 16px; //font-family: @fMedium;
    }
  }
}
.btn-test-out {
  width: 90%;
  margin: 20px auto;
  height: 50px;
  margin-top: 30px;
}
.btn-test {
  font-family: Arial-BoldMT;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  background: #2CB45C;
  border: 1px solid #2CB45C;
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

<script>
import { toNexturl } from "./tonext";
export default {
  data() {
    return {
      infoData: "",
      amount: "",
      loan_process: "",
      loan_process1: "",
      next_process: "",
      infoProductlist:""
    };
  },
  async created() {
    await this.getIndexdata();
    try {
      Android.eventTrack("testlimit_pageview");
    } catch (e) {}
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

    async getIndexdata() {
      console.log(this.$IPS.apiWindow)
      let info = await this.axios.post(this.$IPS.apiWindow, {});

      let arr = [];
      if (info.code === 0) {
        this.infoData = info.data;
        this.amount = Number(info.data.amount);
        this.loan_process = info.data.loan_process[0];
        this.loan_process1 = info.data.loan_process[1];
        this.next_process = info.data.next_process;
        this.infoProductlist= info.data.product_list;
        localStorage.setItem("pro_code", this.next_process);
        if (this.next_process === 0) {
          this.$router.replace({
            path: "productpage"
          });
        }
        //console.log(this.next_process)
        // for(let i = 0, n = info.data.loan_process.length; i < n; i++){
        //     let loan_process = info.data.loan_process
        // }
      } else {
        this.showmsg(info.code + info.message);
      }
    },
    //主按钮跳转页面
    async goPage() {
      try {
      Android.eventTrack("testlimit_test_button_click");
    } catch (e) {}

      if (this.infoData.next_process === 1000) {
        this.$router.replace({ path: "infoBasic", query: { pro_code: this.next_process } });
        console.log(this.next_process)
      }
     
      if (this.infoData.next_process === 1100) {
        this.$router.replace({ path: "infoUser", query: { pro_code: this.next_process } });
      }

      if (this.infoData.next_process === 2000) {
        this.$router.replace({ path: "infoJob", query: { pro_code: this.next_process } });
      }

      if (this.infoData.next_process === 4000) {
        this.$router.replace({ path: "infoCont", query: { pro_code: this.next_process } });
      }

      if (this.infoData.next_process === 7000) {
        this.$router.replace({ path: "infoBankCard",query: {pro_code: this.next_process}
        });
      }

      if (this.infoData.next_process === 6000) {
        this.$router.replace({ path: "checkLive", query: { pro_code: this.next_process} });
      }
    },
    gobaseInfo() {
       this.$router.replace({ path: "infoBasic", query: { pro_code: this.next_process } });
    },
    toappidpage(id) {
      Android.startProductLoan(id + '')  //对应得产品借款页面方法
    },
  },
  mounted() {

    try {
          Android.doTestLimitShowBack(false, 'Jika Anda mengisi informasi, Anda dapat meminjam uang. Yakin ingin keluar?');
        } catch (e) {
          Android.doTestLimitShowBack(false,'')
        }

  window["comebackIndex"] =()=>{
          this.$router.replace({path: "CreditTest"})
      }
  }
};
</script>
