import request from '../util/request'

export const getAllVocations =()=>{
  return request({
    url:'/vocations/getAllVocations',
    method:'post',
  })
}
