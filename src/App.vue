<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import devinfo from './request/devinfo'

var packgename =
  process.env.NODE_ENV === 'production' ? devinfo.app_package : ''
export default {
  name: 'App',
  data() {
    return {
      theme: 'themeBurcsUang'
    }
  },
  created() {
     switch (packgename + '') {
      case 'com.sajjaaj.ajajaj':
        document.title = 'Buku Uang';
        this.theme = 'themeBukuUang';
        break;
      case 'com.ahsiahd.adha':
        document.title = 'Bursa Uang';
        this.theme = 'themeBursaUang';
        break;
      case 'com.rumah.nana':
        document.title = 'Dana Rumah';
        this.theme = 'themeBurcsUang';
        break;
    }
    
    document.body.className = this.theme
  }

}
</script>

<style lang='less'>
@import "./common.less";
.themeBurcsUang {
  .theme(#2CB45C, #2CB45C, #2CB45C);
}
.themeBursaUang {
  .theme(#F55506, #F55506, #F55506);
}
.themeBurdsUang {
  .theme(#B059C2, #B059C2, #B059C2);
}

</style>
