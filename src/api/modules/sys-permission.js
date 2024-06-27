import { Request, Constant } from '@/utils'


export function listPermissions(pageNum, pageSize, params) {
  return Request({
    url: `${Constant.SYSTEM_PREFIX}/permission/listPermissions`,
    method: 'get',
    params: params,
  })
}

export function findPermissionByPermissionId(permissionId, params) {
  let newParams = Object.assign({}, { permissionId }, params)
  return Request({
    url: `${Constant.SYSTEM_PREFIX}/permission/findPermissionByPermissionId`,
    method: 'get',
    params: newParams,
  })
}


export function findByGroupId(groupId, params) {
  let newParams = Object.assign({}, { groupId }, params)
  return Request({
    url: `${Constant.SYSTEM_PREFIX}/permission/findByGroupId`,
    method: 'get',
    params: newParams,
  })
}

export function findPermissionByGroupId(groupId, params) {
  let newParams = Object.assign({}, { groupId }, params)
  return Request({
    url: `${Constant.SYSTEM_PREFIX}/permission/findPermissionByGroupId`,
    method: 'get',
    params: newParams,
  })
}

export function savePermissionGroupInfo(data) {
  return Request({
    url: `${Constant.SYSTEM_PREFIX}/permission/savePermissionGroupInfo`,
    method: 'post',
    data,
  })
}

export function savePermissionInfo(data) {
  return Request({
    url: `${Constant.SYSTEM_PREFIX}/permission/savePermissionInfo`,
    method: 'post',
    data,
  })
}

export function updatePermissionGroupInfo(data) {
  return Request({
    url: `${Constant.SYSTEM_PREFIX}/permission/updatePermissionGroupInfo`,
    method: 'put',
    data,
  })
}

export function updatePermissionInfo(data) {
  return Request({
    url: `${Constant.SYSTEM_PREFIX}/permission/updatePermissionInfo`,
    method: 'put',
    data,
  })
}

export function deleteByPermissionGroupId(groupId) {
  return Request({
    url: `${Constant.SYSTEM_PREFIX}/permission/deleteByPermissionGroupId`,
    method: 'delete',
    params: { groupId },
  })
}

export function deleteByPermissionId(permissionId) {
  return Request({
    url: `${Constant.SYSTEM_PREFIX}/permission/deleteByPermissionId`,
    method: 'delete',
    params: { permissionId },
  })
}

export function getPermissionTypeList() {
  return Request({
    url: `${Constant.SYSTEM_PREFIX}/permission/getPermissionTypeList`,
    method: 'get',
  })
}

export function findAll() {
  return Request({
    url: `${Constant.SYSTEM_PREFIX}/permission/findAll`,
    method: 'get',
  })
}
