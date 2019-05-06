import { axios } from '@/utils/request'
const api = {
  user: '/user',
  role: '/role',
  service: '/service',
  permission: '/permission',
  addPermission:'http://192.169.9.66/auth/right/add',
  permissionNoPager: '/permission/no-pager',
  orgTree: '/org/tree',
  addMeum:'http://192.169.9.66/auth/menu/add',
  meumList:'http://192.169.9.66/auth/menu/page'
}

export default api

export function getUserList (parameter) {
  return axios({
    url: api.user,
    method: 'get',
    params: parameter
  })
}

export function getRoleList (parameter) {
  return axios({
    url: api.role,
    method: 'get',
    params: parameter
  })
}

export function getServiceList (parameter) {
  return axios({
    url: api.service,
    method: 'get',
    params: parameter
  })
}

export function getPermissions (parameter) {
  return axios({
    url: api.permissionNoPager,
    method: 'get',
    params: parameter
  })
}

export function addPermissions(parameter ){
  return axios({
    url:api.addPermission,
    method: 'psot',
    params: parameter
  })
}

export function getOrgTree (parameter) {
  return axios({
    url: api.orgTree,
    method: 'get',
    params: parameter
  })
}
export function addMeum(parameter){
  console.log(parameter)
  return axios({
    url:api.addMeum,
    method: 'post',
    data: parameter
  })
}

export function meumList(parameter){
  console.log('meumList')
  return axios({
    url:api.meumList,
    method: 'post',
    data: parameter
  })
}
// id == 0 add     post
// id != 0 update  put
export function saveService (parameter) {
  return axios({
    url: api.service,
    method: parameter.id === 0 ? 'post' : 'put',
    data: parameter
  })
}

