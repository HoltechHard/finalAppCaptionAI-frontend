import request from '../util/request'

export const disabledRole =(ID)=>{
  return request({
    url:'/userRole/disabledRole',
    method:'post',
    data:{
      ID:ID
    }
  })
}

export const addRole =(role)=>{
  return request({
    url:'/userRole/addRole',
    method:'post',
    data:{
      roleName:role
    }
  })
}

export const getAllRoles =()=>{
  return request({
    url:'/userRole/getAllRoles',
    method:'post',
  })
}

export const getAllRolesPageList =(role,current,size)=>{
  return request({
    url:'/role/getAllRoles',
    method:'post',
    data:{
      role:role,
      current:current,
      size:size
    }
  })
}

export const getRolesById =(id)=>{
  return request({
    url:'/userRole/getRolesById',
    method:'post',
    data:{
      id:id
    }
  })
}

export const updateRolesById =(id,roles)=>{
  return request({
    url:'/userRole/updateRolesById',
    method:'post',
    data:{
      id:id,
      roles:roles
    }
  })
}

export const getAllApi =(api,module,current,size)=>{
  return request({
    url:'/roleUrl/getAllApi',
    method:'post',
    data:{
      api:api,
      module:module,
      current:current,
      size:size
    }
  })
}

export const selectRolesHasThisAuthority =(url)=>{
  return request({
    url:'/roleUrl/selectRolesHasThisAuthority',
    method:'post',
    data:{
      url:url,
    }
  })
}

export const updateRolesHasAuthorityById =(url,roles)=>{
  return request({
    url:'/roleUrl/updateRolesHasAuthorityById',
    method:'post',
    data:{
      url:url,
      roles:roles
    }
  })
}
