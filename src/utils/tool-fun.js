
/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
import Storage from "@/utils/storage"
import Constant from "./constant.js"

function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

/**
 * 删除url中的某个参数
 * @param {*} names  要删除的参数名
 * @returns
 */
function funcUrlDel(names) {
  if (typeof names == "string") {
    names = [names];
  }
  var loca = window.location;
  var obj = {};
  var arr = loca.search.substr(1).split("&");
  //获取参数转换为object
  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].split("=");
    obj[arr[i][0]] = arr[i][1];
  }
  //删除指定参数
  for (var i = 0; i < names.length; i++) {
    delete obj[names[i]];
  }
  //重新拼接url
  var url =
    loca.origin +
    loca.pathname +
    "?" +
    JSON.stringify(obj)
      .replace(/[\"\{\}]/g, "")
      .replace(/\:/g, "=")
      .replace(/\,/g, "&");
  return url;
}

// 安全解析json 防止抛出异常
function parseJSONSafely(str, fn) {
  try {
    return JSON.parse(str);
  } catch (e) {
    fn && fn();
    //返回默认对象，或根据用例返回null。
  }
}

// 权限判断
function hasPermission(...perList) {
  let permissions = Storage.get('userPermission') || []
  if (perList) {
    return perList.some((item) => permissions.indexOf(Constant.PERMISSION_CODE[item]) > -1);
  }
}

// 检测是否是数组并且长度大于1
function checkListLen(obj) {
  if (obj) {
    if (Array.isArray(obj) && obj.length > 0) {
      return obj
    } else {
      return false
    }
  } else {
    return false
  }
}

/**
 *
 * @param {*} router
 * @param {*} pp
 * @returns
 */
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

/**
 *
 * @param {*} url
 * @param {*} loading_blacks  黑名单
 * @returns
 */
var loading_timer;
function showLoading(url, loading_blacks) {
  if (loading_timer) return;
  loading_timer = setTimeout(() => {
    if (url) {
      if (loading_blacks.some(item => url.indexOf(item) > -1)) {
        return;
      }
    }
    let gLoading = document.getElementById("g-loading");
    if (gLoading) {
      gLoading.style.display = "block";
    }
  }, 500)
}
function hiddenLoading() {
  let gLoading = document.getElementById("g-loading");
  gLoading.style.display = "none";
  if (loading_timer) {
    clearTimeout(loading_timer)
    loading_timer = null
  }
}

export default {
  deepClone,
  funcUrlDel,
  parseJSONSafely,
  hasPermission,
  checkListLen,
  getFlatPath,
  showLoading,
  hiddenLoading
}
