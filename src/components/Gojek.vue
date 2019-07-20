<template>
  <div class>
    <div class="top-tips">Unggah bukti kerja, tingkatkan keberhasilan pinjaman.</div>

    <div class="list">
      <div class="list_1"
           @click="toclient('gojek')">
        <img src="/static/images/gojek_icon.jpg"
             alt>
        <p>Pilih
          <i class="right iconfont icon-youjiantou"></i>
        </p>
      </div>

      <div class="list_1"
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

      <!-- <div class="list_1"
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

    <div class="sub-btn-out">
      <span class="sub-btn"
            @click="tourl()">Lewati</span>
    </div>
  </div>
</template>
<script>
import baseinfo from "../request/baseinfo";
// const apiKey = process.env.NODE_ENV === "production" ? 'b3db12ec11d84d4bb12190882754b8bd' : '05a33af020184ae6a5a8a4c0728ff854';
const apiKey = location.host.split('.')[0] === 'loan' ? 'b3db12ec11d84d4bb12190882754b8bd' : '05a33af020184ae6a5a8a4c0728ff854';
export default {
  name: 'gojek',
  data() {
    return {
      userid: baseinfo.userid
    }
  },
  created() {

  },
  mounted() {
    //导入失败调用方法
    window["importMoXieDataError"] = () => {
      this.$router.push({ path: '/PayStep1', query: { order_no: this.$route.query.order_no } })
    };
    //导入成功调用方法
    window["importMoXieDataSuccess"] = (v) => {
      this.$router.push({ path: '/PayStep1', query: { order_no: this.$route.query.order_no, taskId: v.taskId, taskType: v.taskType } })
    };
  },
  methods: {

    tourl() {
      this.$router.push({ path: '/PayStep1', query: { order_no: this.$route.query.order_no } })
    },

    async toclient(tasktype) {
      let info = await this.axios.post(this.$Port.apisocial, { order_no: this.$route.query.order_no, taskType: tasktype })
      try {
        if (typeof eval(Android.startMoXieClient) == "function") {
          Android.startMoXieClient(this.userid, apiKey, tasktype);
        } else {
          this.$vux.toast.show({ text: "none function", type: "text" });
          this.tourl()
        }
      } catch (e) {
        this.$vux.toast.show({ text: "none function", type: "text" });
        this.tourl()
      }
    },

  },
}
</script>
<style scoped>
.list {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 10%;
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
}
.list_1 p i {
  font-size: 22px;
  height: 20px;
  display: flex;
  align-items: center;
}
</style>
