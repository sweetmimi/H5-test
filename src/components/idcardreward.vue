<template>
  <!-- 活体失败跳页面 -->
  <div >
    <div class="loading"
         v-if="!idcardImg">Loading....
    </div>
    <div class="top-tips" style="color:#FF4B4B;padding:5px;">Silahkan unggah KTP Anda dengan jelas.</div>
    <div class="CameraBox" @click="takecamera">
      <img :src="idcardImg" alt="" class="IDcardImg" />
      <div class="cameraDiv">
        <img src="/static/images/camera.png" alt />
      </div>
    </div>
    <p class="ktp">Tampak depan KTP</p>
    <div class="sub-btn-out" style="margin-top:20px">
      <span
        v-if="localIdcardImg==''"
        class="sub-btn"
        style="background-color:#ccc;margin-top:0 ;border:0px"
      >Lanjut1</span>

      <span v-else class="sub-btn" @click="touplodimg(localIdcardImg)">Lanjut</span>
    </div>
    <p class="bootom">Informasi Anda kami jaga dan digunakan hanya untuk verifikasi.</p>
  </div>
</template>

<style lang="less" scoped>
.ktp {
  text-align: center;
  font-family: Roboto-Regular;
}
.bootom {
  text-align: center;
  font-size: 12px;
  color: #aaaaaa;
}
.CameraBox {
  width: 90%;
  height: 220px;
  margin: 20% 5% 10%;
  border: 1px #ccc solid;
  border-radius: 10px;
  position: relative;
  .IDcardImg {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    opacity: 0.5;
  }
  .IDcardImg:after {
    content: "";
    background-image: url(/static/images/idcard1.png);
    display: block;
    position: absolute;
    
    width: 100%;
    height: 100%;
    border-radius: 10px;
    background-size: 100% 100%;
  }
  .cameraDiv {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    width: 60px;
    height: 50px;
    z-index: 3;
    img {
      width: 100%;
      height: 100%;
      opacity: 1;
    }
  }
}
</style>

<script>
// import { XDialog } from 'vux';
export default {
  name: "idcardreward",

  data() {
    return {
      infoData: "",
      idcardImg: "",
      localIdcardImg: "",
      showHideOnBlur: false
    };
  },
  async created() {
    await this.getIdcardImg();
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

    async getIdcardImg() {
      let info = await this.axios.post(this.$IPS.apiImg, {});
      if (info.code === 0) {
        this.infoData = info.data;
         this.idcardImg= info.data.idcard_image_front;
      }
    },
    takecamera() {
      this.DoPhotoFun(1010);
    },
    async touplodimg(imgurl) {
      if (imgurl != "") {
        this.$vux.loading.show({ text: "Loading" });
        let info = await this.axios.post(this.$IPS.apiImgsub, {
          idcard_image_front: imgurl,
        });
        this.$vux.loading.hide();
        if (info.code === 0) {
          this.$router.replace({
            path: "checkLive",
            query: {
              pro_code: this.$route.query.pro_code || 1000
            }
          });
        } else {
              this.showmsg(info.message);
        }
      }
    }
  },
  mounted() {
    window["GetTakePhotoUrl"] = (kind, url) => {
      if (url && url.image_path) {
          this.$vux.loading.hide();
        }
      this.idcardImg = url.image_path;
      this.localIdcardImg = this.idcardImg;
    };
  }
};
</script>
