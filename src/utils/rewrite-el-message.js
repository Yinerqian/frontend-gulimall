import { Notification } from 'element-ui'
import Validate from "@cii/cii-base-utils/dist/cii-base-utils.esm"

let defaultConf = {
    type: "info",
    title: "提示"
}

MyMessage.error = function (options) {
    if (Validate.isString(options)) {
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
    if (Validate.isString(options)) {
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
    if (Validate.isString(options)) {
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
    if (Validate.isString(options)) {
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
    if (Validate.isString(options)) {
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
