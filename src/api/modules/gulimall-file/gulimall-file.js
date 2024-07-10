import { Request, Constant } from '@/utils'

export function ossSign() {
    return Request({
        url: `${Constant.FILE_PREFIX}/file/ossSign`,
        method: 'get',
    })
}

