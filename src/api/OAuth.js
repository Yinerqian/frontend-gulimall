import { Request, Constant } from '@/utils'


export function userLogin(data) {
    return Request({
        url: `${Constant.PREFIX}/oauth/login`,
        method: "post",
        data: data
    });
}

export function userLogout() {
    return Request({
        url: `${Constant.PREFIX}/oauth/logout`,
        method: "get"
    });
}

export function queryUserInfo() {
    return Request({
        url: `${Constant.PREFIX}/oauth/userInfo`,
        method: 'get'
    })
}