import request from '../util/request'

export const addSignUpInfo =(competitionId)=>{
  return request({
    url:'/competitionsSignUpInfo/addSignUpInfo',
    method:'post',
    data:{
      competitionId:competitionId,
    }
  })
}

export const getSignUpInfo =(competitionId)=>{
  return request({
    url:'/competitionsSignUpInfo/getSignUpInfo',
    method:'post',
    data:{
      competitionId:competitionId,
    }
  })
}

export const cancelSignUp =(competitionId)=>{
  return request({
    url:'/competitionsSignUpInfo/cancelSignUp',
    method:'post',
    data:{
      competitionId:competitionId,
    }
  })
}
