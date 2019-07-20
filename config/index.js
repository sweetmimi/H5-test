"use strict";


const path = require("path");

module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: "static",
    assetsPublicPath: "/",
    proxyTable: {
      "/loanapis": {
         //开发环境
         //target: "http://devloanapi.luno.id",
        //测试环境
        // target: "http://test-api-loan.vieweryoyo.com",
         target: "http://dana-loan.dannyrumah.com/",
         //正式环境
         //target: "http://loanapi.luno.id",
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          "^/loanapis": ""
        }
        // onProxyReq: function(proxyReq, req, res) {
        //   console.log("原路径：" + req.originalUrl, "代理路径：" + req.path);
        // }
      },
      "/": {
        target: "http://devspider.cashcash.id",
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          "^/spider": ""
        }
        // onProxyReq: function(proxyReq, req, res) {
        //   console.log("原路径：" + req.originalUrl, "代理路径：" + req.path);
        // }
      }
    },

    // Various Dev Server settings
    host: "192.168.10.85", // can be overwritten by process.env.HOST
    port: 8000, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: true,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: false,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: "cheap-module-eval-source-map",

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, "../dist/index.html"),

    // Paths
    assetsRoot: path.resolve(__dirname, "../dist"),
    assetsSubDirectory: "static",
    // assetsSubDirectory: '',
    assetsPublicPath: "./",

    /**
     * Source Maps
     */

    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: "#source-map",

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: true,
    productionGzipExtensions: ["js", "css"],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
};
