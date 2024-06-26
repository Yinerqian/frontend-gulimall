import Vue from 'vue'
import store from './store'
import App from "./App.vue"
import './utils/dateFilter'
import router from './router' //路由总入口

window.$3dModelCache = new Map()  // 全局缓存3d模型
window.$3dModelRender = null  // 3d渲染缓存


Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App),
})

// ------------非必要的放在Vue加载完后挂在----------------
import * as util from "@/utils"
import api from "@/api"  // 接口总入口
util.ElementDefaultProps(); // 使用element以及设置element组件默认属性
util.VxeTableDefaultProps(); // 设置vxe-table组件默认属性
// 全局挂载
Vue.prototype.$util = util  // 常用工具类
Vue.prototype.$message = util.RewriteElmessage.MyMessage
Vue.prototype.$api = api
Vue.use(util.Directive)
import "@/css/index.js" // 仓库公用样式
