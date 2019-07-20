<template>
<div class="number-grow-warp">
 <span ref="numberGrow" :data-time="time" class="number-grow" :data-value="value">0</span>
 </div>
</template>
<script>
export default {
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
 data(){
    return {
     value:0
   } 
 },
 watch: {
  value(val){
    if(val > 0){
      this.value = val;
      this.numberGrow(this.$refs.numberGrow)
    }
  }
 },
 methods: {
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
}
</script>
<style>
  
    .number-grow-warp {
      transform: translateZ(0);
      text-align: center;
      
    }
    .number-grow {
      font-family: Arial-BoldMT;
      font-size: 25px;
      color: #2CB45C;
      letter-spacing: 2.67px;
      margin: 10px auto;
      line-height: 30px;
      letter-spacing:1px;
      font-weight: 700;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 170px;
      overflow: hidden;
    }
  
</style>