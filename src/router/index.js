import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
  
    {
      //额度测试首页
      path: "/CreditTest",
      name: "CreditTest",
      component: resolve => require(["@/components/CreditTest.vue"], resolve),
      options: {
        history: true,
        pushState: true
      }
    },
    {
      //额度测试首页
      path: "/productpage",
      name: "productpage",
      component: resolve => require(["@/components/productpage.vue"], resolve),
      options: {
        history: true,
        pushState: true
      }
    },
    {
      //活体失败
      path: "/idcardreward",
      name: "idcardreward",
      component: resolve => require(["@/components/idcardreward.vue"], resolve),
      options: {
        history: true,
        pushState: true
      }
    },
    {
      //上传基础信息
      path: "/infoBasic",
      name: "infoBasic",
      component: resolve => require(["@/components/infoBasic.vue"], resolve),
      options: {
        history: true,
        pushState: true
      }
    },

    {
      //上传基础信息
      path: "/BasicInfo",
      name: "infoBasic",
      component: resolve => require(["@/components/infoBasic.vue"], resolve),
      options: {
        history: true,
        pushState: true
      }
    },

    {
      //上传工作证明
      path: "/Toselect",
      name: "Toselect",
      component: resolve => require(["@/components/Toselect.vue"], resolve),
      options: {
        history: true,
        pushState: true
      }
    },

    

    {
      //绑定银行卡
      path: "/infoBankCard",
      name: "infoBankCard",
      component: resolve => require(["@/components/infoBankCard.vue"], resolve),
      options: {
        history: true,
        pushState: true
      }
    },

    {
      //绑定银行卡
      path: "/bindBankCard",
      name: "infoBankCard",
      component: resolve => require(["@/components/infoBankCard.vue"], resolve),
      options: {
        history: true,
        pushState: true
      }
    },
    //紧急联系人
    {
      path: "/infoAdd",
      name: "infoAdd",
      component: resolve => require(["@/components/infoAdd.vue"], resolve),
      options: {
        history: true,
        pushState: true
      }
    },
    //用户信息
    {
      path: "/infoUser",
      name: "infoUser",
      component: resolve => require(["@/components/infoUser.vue"], resolve),
      options: {
        history: true,
        pushState: true
      }
    },
    //用户信息
    {
      path: "/userInfo",
      name: "infoUser",
      component: resolve => require(["@/components/infoUser.vue"], resolve),
      options: {
        history: true,
        pushState: true
      }
    },
    //用户地址
    {
      path: "/UserAddress",
      name: "UserAddress",
      component: resolve => require(["@/components/UserAddress.vue"], resolve),
      options: {
        history: true,
        pushState: true
      }
    },
    //工作证明
    {
      path: "/infoJob",
      name: "infoJob",
      component: resolve => require(["@/components/infoJob.vue"], resolve),
      options: {
        history: true,
        pushState: true
      }
    },
    //工作证明
    {
      path: "/jobinfo",
      name: "infoJob",
      component: resolve => require(["@/components/infoJob.vue"], resolve),
      options: {
        history: true,
        pushState: true
      }
    },
    //学生证明
    {
      path: "/infoStudent",
      name: "infoStudent",
      component: resolve =>
        require(["@/components/infoStudent.vue"], resolve),
      options: {
        history: true,
        pushState: true
      }
    },
    {
      //选择联系人
      path: "/infoCont",
      name: "infoCont",
      component: resolve => require(["@/components/infoCont.vue"], resolve),
      options: {
        history: true,
        pushState: true
      }
    },
    {
      //选择联系人
      path: "/ContactInfo",
      name: "infoCont",
      component: resolve => require(["@/components/infoCont.vue"], resolve),
      options: {
        history: true,
        pushState: true
      }
    },
    
    //活体检查
    {
      path: "/checkLive",
      name: "LiveCheck",
      component: resolve => require(["@/components/checkLive.vue"], resolve),
      options: {
        history: true,
        pushState: true
      }
    },
    //活体检查
    {
      path: "/liveCheck",
      name: "LiveCheck",
      component: resolve => require(["@/components/checkLive.vue"], resolve),
      options: {
        history: true,
        pushState: true
      }
    },
    
    
    
    {
      path: "/ToPage",
      name: "ToPage",
      component: resolve => require(["@/components/ToPage.vue"], resolve),
      options: {
        history: true,
        pushState: true
      }
    },
    
    
    
    
    // UangzamanSdk 临时
    {
      path: "/UangzamanSdk", 
      name: "UangzamanSdk",
      component: resolve => require(["@/components/UangzamanSdk.vue"], resolve),
      options: {
        history: true,
        pushState: true
      }
    },
    
  ]
});
