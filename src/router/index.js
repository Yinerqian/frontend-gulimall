import Vue from 'vue'
import Router from 'vue-router'
import Storage from "good-storage";
import Constant from "@/utils/constant"

Vue.use(Router)

//自动注册,不必一个个导入导出
const requireComponent = require.context(
  // 其组件目录的相对路径
  './',
  // 是否查询其子目录
  true,
  // 匹配基础组件文件名的正则表达式
  /.(js)$/
)

var routeArr = [] //导出路由对象

requireComponent.keys().forEach((fileName) => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName)
  if (componentConfig.default) {
    routeArr.push(componentConfig.default)
  }
})

//防止跳转相同路由报错
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

// 引入各个路由模块
export const constantRoutes = [
  {
    path: '/',
    redirect: '/login',
    meta: {},
  },
  {
    path: '/login',
    component: (resolve) => require(['@/views/Login'], resolve),
  },
  {
    path: '*',
    redirect: "/404/index",
  },
  ...routeArr,
]

const router = new Router({
  // mode: 'history', // 去掉url中的#
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes,
})

export default router

// -------------验证菜单权限----------------------
let localTotalUrls = getFlatPath(router.options.routes);  // 前端定义的所有路由
router.beforeEach((to, from, next) => {
  let userMenuPermissions = Storage.get("userMenuPermissions") || []; //登陆获取到的所有路由
  if (to.meta.subpage) {
    next();
  } else {
    if (localTotalUrls.find(item => item && item.indexOf(to.name) > - 1) && userMenuPermissions.find(item => item && item.indexOf(to.name) > - 1)) {
      next();
    } else {
      if (!Constant.WHITE_ROUTE_PATH_LIST.includes(to.fullPath)) {
        router.push({
          path: "/403/index"
        })
      } else {
        next()
      }
    }
  }
})

function getFlatPath(router, pp) {
  var arr = [];
  pp = pp || ''
  for (let r of router) {
    let path = r.path
    let children = r.children
    if (pp) {
      path = `${pp}/${path}`
    }
    // 如果有子元素，不添加父元素的路径
    if (children && children.length > 0) {
      arr = arr.concat(getFlatPath(children, path))
    } else {
      arr.push(path)
    }
  }
  return arr;
};

