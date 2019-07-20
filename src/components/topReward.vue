

<template>
  <div class="topRew">
    <div class="use-money">
      <span class="use-by">Limit Anda saat ini</span>
      <br>
      <span class="rp">Rp</span>
      <span ref="numberGrow" class="money" :data-time="time" :data-value="value">0</span>
    </div>
    
      <x-progress :percent="percentage" :show-cancel="false" class="boxbar" style="position: absolute;" >
        
      </x-progress>
      <div class="bargift" :style="changestyle"></div>
   
  </div>
</template>

<style lang="less" scoped>

  /deep/ .weui-progress__bar {
    background-color: #EBEBEB;
    height: 8px;
    border-radius:8px; 

}
/deep/ .weui-progress__inner-bar{
    background-color: #FF9E1F;
}


.topRew {
  width: 100%;
  height: 150px;
  background-image: url(/static/images/infoBgc.png);
  background-size: 100% 100%;
  position: relative;
  .use-money{
      height: 60px;
      max-width: 180px;
      position: absolute;
      top:2%;
      left: 10%;
      overflow: hidden;
      .use-by{
        font-size: 16px;
        color: #fff;
        width: 100%;
      }
      .rp{
        display: inline-block;
        font-size: 18px;
        color:#FFEA1A;
      }
      .money{
        width: 100%;
        font-size: 20px;
        color:#FFEA1A;
      }
  }
  .boxbar{
        position: absolute;
        width:80%;
        height:8px;
        background-color:#fff;
        border-radius:10px; 
        margin:0 10%;
        top: 60%;
    }
    .bargift{
        position: relative;
        top: 50px;
        min-width: 80px;
        float:left;
        width:0%;
        height:80px;
        background-image:url(/static/images/rewardGift.png);
        background-size: 100% 100%;
        
        position: relative;
       
        overflow: hidden;
    }
    .bar:after{
        content:'';
        position:absolute;
    }

}
</style>
    
<script>
import { XProgress, Box } from 'vux'
import appid from "../request/baseinfo";
import { stringify } from 'querystring';
import { setTimeout } from 'timers';

export default {
  name: "topReward",
  components: {
    XProgress,
    Box
  },
  props: {
  time: {
   type: Number,
   default: 2
  },
  value: {
   type: Number,
   default: 720000
  }
 },
  data() {
    return {
      oBar:'',
      value:0,
      percentage:"",
      changestyle:""
    };
  },

watch: {
  value(val){
    if(val > 0){
      this.value = val;
       this.numberGrow(this.$refs.numberGrow)
    }
  }
 },


  async created() {
      let pro_codes =this.$route.query.pro_code ;
         switch ('' + pro_codes){
           case '1000':
             
             this.percentage=30;
             this.changestyle="left:30%"
             break;
            case '1100':
             this.percentage=40;
             this.changestyle="left:38%"
             break;
            case '2000':
             this.percentage=50;
             this.changestyle="left:50%"
             break;
            case '4000':
             this.percentage=70;
             this.changestyle="left:60%"
             break;
             case '7000':
               
             this.percentage=90;
             this.changestyle="left:65%"
             break;
         } 
    
  },
   methods: {
  
  getremove(){

    
  },


  numberGrow (ele) {
   let _this = this
   let step = (_this.value * 10) / (_this.time * 1000)
   let current = 0
   let start = 0
   let t = setInterval(function () {
    start += step
    if (start > _this.value) {
     clearInterval(t)
     start = _this.value
     t = null
    }
    if (current === start) {
     return
    }
    current = start
    ele.innerHTML = current.toString().replace(/(\d)(?=(?:\d{3}[+]?)+$)/g, '$1.')
   }, 10)
  }
 },
 mounted () {
  this.numberGrow(this.$refs.numberGrow)
 }
};
</script>
