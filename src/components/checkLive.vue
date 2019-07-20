<template>
  <div>
    <div class="face-main">
      <div class="loading-gif">
        <img class="img1"
             src="/static/images/face1.png"
             alt>
        <img class="img2"
             src="/static/images/face2.png"
             alt>
        <img class="img3"
             src="/static/images/face3.png"
             alt>
      </div>

      <div class="loading-bar"
           v-if="progress">
        <span>
          <i :style="{width:progress+'%'}"></i>
        </span>
      </div>
      <div class="loading-text">Dalam verifikasi, silahkan tunggu</div>
    </div>
  </div>
</template>
<script>
  import {toNext, toNexturl} from "./tonext";
  import devinfo from "../request/baseinfo";

  if (localStorage.getItem("appid")) {
    devinfo.appid = localStorage.getItem("appid");
  }
  export default {
    name: "LiveCheck",
    components: {},
    data() {
      return {
        sub_url: "",
        progress: "",
        showflag: false,
        face_check: '',
        idcard_image_front: '',
      };
    },
    async created() {

      await toNext(this);
      this.togeturl();
      // this.livenessFun();

    },
    mounted() {
 try {
          Android.doTestLimitShowBack(true, 'Jika Anda mengisi informasi, Anda dapat meminjam uang. Yakin ingin keluar?');
        } catch (e) {
          Android.doTestLimitShowBack(true,'')
        }

  window["comebackIndex"] =()=>{
          this.$router.replace({path: "CreditTest"})
      }

      window["GetlivenessImg"] = (kind, url) => {  //活体检测返回值
        if (url) {
          this.progress='100';
          //活体+比对失败
          if (kind == 2001 && url.code != 0) {
            // this.showmsg('Verifikasi gagal. Foto KTP kurang jelas, mohon foto ulang');
            // this.tolivenessFun("", "", url.verifyStatus);
            this.tocount(2, 2, 2);

            this.$router.replace({ path: "idcardreward" ,query:{
            pro_code: this.$route.query.pro_code || 1000
            }})
             return;
          }
          //活体成功
          this.tocount(2, 1, 1);
          this.tolivenessFun(url.image_path, url.confidence);
        }
      };

 window["faceComparisonCode"] = code => {  //人脸比对接口调用code
      this.tocount(2, 2, 2,code);
    };
window["TogetLoadProsss"] = url => {  //进度返回值
      this.progress = url.progress;
    };
    },

    methods: {

      showmsg(msg) {
        this.$vux.toast.show({
          text: msg,
          type: "text",
          position: "middle",
          width: "80%"
        });
      },

      /**
       * 统计方法的调用
       * check_type  检测类型 1 face 2平安
       * type  1 活体  2 人脸
       * status 1 成功 2 失败
       *
       */
      async tocount(check_type, type, status,urlCode) {
        this.axios.post(this.$IPS.apiuserbiopsy, {
          order_no: this.$route.query.order_no || "",
          check_type: check_type,
          type: type,
          status: status,
           urlCode: urlCode
        });
      },

      async togeturl() {
        let info = await this.axios.post(this.$IPS.apiGetlist, {
          pro_code: this.$route.query.pro_code,
        });
         
        if (info.code === 0) {
          this.sub_url = info.data.sub_url;
          if (info.data.bio_assay) {
            this.tolivenessFun(info.data.bio_assay.bio_assay_image[0], info.data.bio_assay.confidence, '', 2)
            return
          }

          this.progress='50';
          if (info.data.face_check == 1) {  // 是否开启人脸比对  face_check 1 开启，否则
            //获取身份证正面照片
            let info = await this.axios.post(this.$IPS.apiIdimage, {
              appid: "90001",
            });
            if (info.code === 0) {
              this.liveness(2001, info.data.idcard_image_front, info.data.bio_values || '0');
            } else {
              this.showmsg(info.code + info.message)
            }
          } else {
            this.liveness(2000, '', '');
          }
        }
        this.tocount(2, 1, 0)
      },

      /**
       * 活体调用方法
       * code: 调用类型 2000：活体，2001：活体加人脸对比
       * imageUrl:人脸比对所需身份证正面照片
       * threshold：人脸比对阈值
       */
      liveness(code, imageUrl, threshold) {
        
        try {
          let data = {
            image_url: imageUrl,
            threshold: threshold
          };
          if (typeof eval(Android.detectAlive) == "function") {
            
            let results = Android.detectAlive(code, JSON.stringify(data));
            
            if (results == -1) {
              let permissions = Android.requestPermissions("android.permission.CAMERA");
              if (permissions == 0) {
                this.liveness(code, objectKey, threshold);
              }
            }
          }
        } catch (e) {
        }
      },

      async tolivenessFun(url, url1, url2, charge) {
        let data = {
          order: {},
          //order_base: {}
        };
        // alert(url, url1)
        data.order.bio_assay_image = url ? [url] : ""; // 获得得图片
        data.order.confidence = (url1 || url1 === 0) ? url1 : 0; // 阈值结果
        data.order.byflag = (url1 || url1 === 0) ? 1 : 0; // 人脸比对 1 通过 0不通过 人脸比有对过程就是飞哥传值  ，没有人脸比对默认给1
        // data.order.byflag = 1 // 1 通过 0不通过
        data.is_charge = charge ? charge : 1;//1:收费2.不收费

        data.order.is_bio_assay = 1;
        data.order_no = this.$route.query.order_no;
        data.pro_code = this.$route.query.pro_code || 6000;
        data.order_type = this.$route.query.order_type || 0;

        let devinfo = JSON.parse(localStorage.getItem("loaninfo"))
        // data.order_base.application_amount = devinfo.application_amount;
        // data.order_base.application_term = devinfo.application_term;
        // data.order_base.is_reloan = devinfo.is_reloan;
        // // data.order_base.product_id =devinfo.product_id;
        // data.order_base.product_name = devinfo.product_name;
        toNexturl(this, this.sub_url || this.$IPS.apiInfousbmit, data, devinfo.appid);
      }
    }
  };
</script>

<style scoped>
  .face-main {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: absolute;
    height: 100%;
  }

  .loading-gif {
    width: 60%;
    position: relative;
    text-align: center;
  }

  .loading-gif .img1 {
    width: 70%;
    position: absolute;
    left: 15%;
    margin-top: 5%;
  }

  .loading-gif .img2 {
    width: 100%;
    position: absolute;
    top: 3%;
    left: 0;
    animation: linerun 1s linear backwards infinite;
    -webkit-animation: linerun 1s linear backwards infinite;
  }

  .loading-gif .img3 {
    width: 100%;
  }

  .loading-bar {
    width: 80%;
    margin: 0 auto;
    height: 5px;
    margin-top: 20%;
  }

  .loading-bar span {
    display: block;
    width: 100%;
    height: 5px;
    background-color: #efefef;
    border-radius: 10px;
    position: relative;
  }

  .loading-bar span i {
    width: 10%;
    display: block;
    background-color: #ec8f24;
    height: 5px;
    border-radius: 10px;
    position: absolute;
    transition: 0.5s all linear;
    -webkit-transition: 0.5s all linear;
    left: 0;
    top: 0;
  }

  .loading-text {
    margin-top: 10px;
  }

  @keyframes linerun {
    0% {
      top: 3%;
    }
    100% {
      top: 95%;
    }
  }

  @-webkit-keyframes linerun {
    0% {
      top: 3%;
    }
    100% {
      top: 95%;
    }
  }
</style>
