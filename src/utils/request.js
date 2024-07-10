import axios from 'axios'
import { Notification, MessageBox } from 'element-ui'
import { Storage } from '@/utils/index.js'
import router from '@/router';
import ToolFun from "./tool-fun"
import Constant from "./constant"

var msg_lock = false;  // 上锁,防止多次message连续报错
var timer;

// 创建axios实例
const Axios = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: process.env.VUE_APP_ENV == 'development' ? process.env.VUE_APP_BASE_API : `http://${window.location.hostname}:8080`,
  // 超时
  timeout: 10000,
  withCredentials: true, // 请求携带Cookie
})
// 请求接口拦截器
Axios.interceptors.request.use(
  (config) => {
    // console.log(config, "config");
    // 设置token
    let accessToken = Storage.get('accessToken')
    Constant.HEADER_ADD_PARAMS_WHITE_LIST.forEach(item => {
      if (config.url === item) {
        return config
      }
    })
    config.headers['Authorization'] = `Bearer ${accessToken}`
    if (config.url.indexOf('/odc/') != -1) {
      config.headers.masterKey = Constant.VUE_APP_MASTER_KEY
      config.headers.appKey = Constant.VUE_APP_APP_KEY
    }
    ToolFun.showLoading(config.url, Constant.LOADING_BLACK_LIST);
    return config;
  },
  (error) => {
    Promise.reject(error)
  }
)

// 接口返回响应拦截器
Axios.interceptors.response.use(
  (res) => {
    ToolFun.hiddenLoading();
    // 未设置状态码则默认成功状态
    const code = res.data.code || 200
    if (code === 401) {
      MessageBox.alert(res.data.content, '系统提示', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取 消',
        type: 'warning',
      })
        .then(() => {
          location.href = 'http://localhost:8080/'
        })
        .catch(() => { })
    } else if (code === 500) {
      let message = res.data.msg || '服务器错误！'
      Notification.error({
        title: "错误",
        message,
      })
      return Promise.reject(new Error(msg))
    } else if (code === 200 && !res.data.successFlag && res.data.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      Notification.error({
        title: "错误",
        message: res.data.message,
      })
      return Promise.reject('error')
    } else if (code !== 200) {
      Notification.error({
        title: "错误",
        message: '系统未知错误，请反馈给管理员',
      })
      return Promise.reject('error')
    } else {
      return res.data
    }
  },
  (error) => {
    ToolFun.hiddenLoading();
    if (!msg_lock) {
      msg_lock = true
      if (error.response && error.response.status == 401) {
        MessageBox.alert(error.response.data.message, '系统提示', {
          confirmButtonText: '重新登录',
          type: 'warning',
          showClose: false,
          callback: action => {
            router.replace("/login")
          }
        })
      } else {
        Notification({
          type: "error",
          title: "错误",
          message: (error.response && error.response.data && error.response.data.message) || "系统未知错误,请联系管理员!",
          duration: 3000
        })
      }
    } else if (!timer) {
      timer = setTimeout(() => {
        msg_lock = false;
        clearTimeout(timer)
      }, 1000);
    }
    return Promise.reject(error)
  }
)

function Request(options = {}, config = {}) {
  let { feedback } = config;
  return new Promise((resolve, reject) => {
    Axios(options).then(res => {
      resolve(res)
      if (feedback) {  // 如果在定义接口的方法中加了参数feedback:true 表示接口请求成功会返回提示信息, 报错不用加,上面已经有了
        Notification.success({message: XEUtils.isString(feedback) ? feedback : "保存成功", title: "成功"})
      }
    }).catch(err => {
      reject(err)
    })
  })
}

export default Request
