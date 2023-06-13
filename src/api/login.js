import request from '../util/request'

export const login =(username,password)=>{
  return request({
    url:'/login',
    method:'post',
    params:{
      username:username,
      password:password
    }
  })
}

export const logout =()=>{
  return request({
    url:'/logout',
    method:'post',
  })
}
