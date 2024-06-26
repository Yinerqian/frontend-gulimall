import { Request, Constant } from '@/utils'


export function queryUserPermissions(pageNum, pageSize, params) {
  return Request({
    url: `${Constant.SYSTEM_PREFIX}/oauth/userMenus`,
    method: 'get',
    params: params,
  })
}

export function queryUserFlatPermissions(pageNum, pageSize, params) {
  return Request({
    url: `${Constant.SYSTEM_PREFIX}/oauth/userFlatMenus`,
    method: 'get',
    params: params,
  })
}
