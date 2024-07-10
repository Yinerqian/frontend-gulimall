import { Request, Constant } from '@/utils'

export function pageBrand(pageNum, pageSize, params) {
    let newParams = Object.assign({}, {pageNum, pageSize}, params)
    return Request({
        url: `${Constant.PRODUCT_PREFIX}/brand/page`,
        method: 'get',
        params: newParams
    })
}

export function findBrandById(id, params) {
    let newParams = Object.assign({}, {id}, params)
    return Request({
        url: `${Constant.PRODUCT_PREFIX}/brand/findBrandById`,
        method: 'get',
        params: newParams
    })
}

export function updateBrandById(data) {
    return Request({
        url: `${Constant.PRODUCT_PREFIX}/brand/updateBrandById`,
        method: 'put',
        data: data
    })
}

export function saveBrand(data) {
    return Request({
        url: `${Constant.PRODUCT_PREFIX}/brand/saveBrand`,
        method: 'post',
        data: data
    })
}

export function deleteBrandById(id) {
    return Request({
        url: `${Constant.PRODUCT_PREFIX}/brand/deleteBrandById`,
        method: 'delete',
        params: {id}
    })
}




