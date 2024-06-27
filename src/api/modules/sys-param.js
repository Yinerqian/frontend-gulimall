import { Request, Constant } from '@/utils'


export function queryByPage(pageNum, pageSize, params) {
    let newParams = Object.assign({}, {pageNum, pageSize}, params)
    return Request({
        url: `${Constant.SYSTEM_PREFIX}/param/queryByPage`,
        method: 'get',
        params: newParams
    })
}

export function findByConfigId(configId, params) {
    let newParams = Object.assign({}, {configId}, params);
    return Request({
        url: `${Constant.SYSTEM_PREFIX}/param/findByConfigId`,
        method: 'get',
        params: newParams
    })
}

export function saveParamInfo(data) {
    return Request({
        url: `${Constant.SYSTEM_PREFIX}/param/saveParamInfo`,
        method: 'post',
        data: data
    })
}

export function updateByConfigId(data) {
    return Request({
        url: `${Constant.SYSTEM_PREFIX}/param/updateByConfigId`,
        method: 'put',
        data: data
    })
}

export function deleteByConfigId(configId, params) {
    let newParams = Object.assign({}, {configId}, params);
    return Request({
        url: `${Constant.SYSTEM_PREFIX}/param/deleteByConfigId`,
        method: 'delete',
        params: newParams
    })
}

