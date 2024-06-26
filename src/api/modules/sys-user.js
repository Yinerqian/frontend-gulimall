import { Request, Constant } from '@/utils'

export function queryByPage(pageNum, pageSize, params) {
    let newParams = Object.assign({}, { pageNum, pageSize }, params)
    return Request({
        url: `${Constant.PREFIX}/user/queryByPage`,
        method: 'get',
        params: newParams
    })
}

export function findByUserId(userId, params) {
    let newParams = Object.assign({}, { userId }, params);
    return Request({
        url: `${Constant.PREFIX}/user/findByUserId`,
        method: 'get',
        params: newParams
    })
}

export function saveUserInfo(data) {
    return Request({
        url: `${Constant.PREFIX}/user/saveUserInfo`,
        method: 'post',
        data: data
    })
}

export function updateByUserId(data) {
    return Request({
        url: `${Constant.PREFIX}/user/updateByUserId`,
        method: 'put',
        data: data
    }, {
        feedback: true  // 或者是字符串,字符串是提示内容
    })
}


export function updatePassword(data) {
    return Request({
        url: `${Constant.PREFIX}/user/updatePassword`,
        method: 'put',
        data: data
    })
}

export function deleteByUserId(userId, params) {
    let newParams = Object.assign({}, { userId }, params);
    return Request({
        url: `${Constant.PREFIX}/user/deleteByUserId`,
        method: 'delete',
        params: newParams
    })
}

