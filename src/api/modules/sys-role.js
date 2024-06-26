import { Request, Constant } from '@/utils'


export function queryByPage(pageNum, pageSize, params) {
    let newParams = Object.assign({}, {pageNum, pageSize}, params)
    return Request({
        url: `${Constant.PREFIX}/role/queryByPage`,
        method: 'get',
        params: newParams
    })
}

export function findAllByRoleId(roleId, params) {
    let newParams = Object.assign({}, {roleId}, params);
    return Request({
        url: `${Constant.PREFIX}/role/findAllByRoleId`,
        method: 'get',
        params: newParams
    })
}

export function saveRoleInfo(data) {
    return Request({
        url: `${Constant.PREFIX}/role/saveRoleInfo`,
        method: 'post',
        data: data
    })
}

export function updateByRoleId(data) {
    return Request({
        url: `${Constant.PREFIX}/role/updateByRoleId`,
        method: 'put',
        data: data
    })
}

export function deleteByRoleId(roleId, params) {
    let newParams = Object.assign({}, {roleId}, params);
    return Request({
        url: `${Constant.PREFIX}/role/deleteByRoleId`,
        method: 'delete',
        params: newParams
    })
}

