import { Notification } from 'element-ui'
import XEUtils from "xe-utils";

let defaultConf = {
    type: "info",
    title: "提示"
}

MyMessage.error = function (options) {
    if (XEUtils.isString(options)) {
        Notification({
            type: "error",
            title: "错误",
            message: options
        })
    } else {
        Notification({
            ...defaultConf,
            ...options,
        })
    }
}

MyMessage.success = function (options) {
    if (XEUtils.isString(options)) {
        Notification({
            type: "success",
            title: "成功",
            message: options
        })
    } else {
        Notification({
            ...defaultConf,
            ...options,
        })
    }
}

MyMessage.warning = function (options) {
    if (XEUtils.isString(options)) {
        Notification({
            type: "warning",
            title: "警告",
            message: options
        })
    } else {
        Notification({
            ...defaultConf,
            ...options,
        })
    }
}

MyMessage.info = function (options) {
    if (XEUtils.isString(options)) {
        Notification({
            type: "info",
            title: "提示",
            message: options
        })
    } else {
        Notification({
            ...defaultConf,
            ...options,
        })
    }
}

function MyMessage(options) {
    if (XEUtils.isString(options)) {
        Notification({
            type: "warning",
            title: "警告",
            message: options
        })
    } else {
        Notification({
            ...defaultConf,
            ...options,
        })
    }
}

export default {
    MyMessage,
}
