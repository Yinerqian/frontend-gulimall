import { Request, Constant } from '@/utils'

export function listCategoryTree(pageNum, pageSize, params) {
    let newParams = Object.assign({}, {pageNum, pageSize}, params)
    return Request({
        url: `${Constant.PRODUCT_PREFIX}/product/listCategoryTree`,
        method: 'get',
        params: newParams
    })
}

