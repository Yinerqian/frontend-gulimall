import { Request, Constant } from '@/utils'

export function pageBrand(pageNum, pageSize, params) {
    let newParams = Object.assign({}, {pageNum, pageSize}, params)
    return Request({
        url: `${Constant.PRODUCT_PREFIX}/brand/page`,
        method: 'get',
        params: newParams
    })
}

