import request from '../util/request'

export const configUndercover = (configData)=>{
  return request({
    url:'/whoIsUndercover/configUndercover',
    method:'post',
    data:{
      configData:configData
    }
  })
}

export const joinCurrentGame = ()=>{
  return request({
    url:'/whoIsUndercoverGamer/joinCurrentGame',
    method:'post',
  })
}

export const isInCurrentRound = ()=>{
  return request({
    url:'/whoIsUndercoverGamer/isInCurrentRound',
    method:'post',
  })
}

export const playerGetCurrentGameInfo = (current,size)=>{
  return request({
    url:'/whoIsUndercoverGamer/playerGetCurrentGameInfo',
    method:'post',
    data:{
      current:current,
      size:size
    }
  })
}

export const isFullOfLength = ()=>{
  return request({
    url:'/whoIsUndercover/isFullOfLength',
    method:'post',
  })
}

export const controllerGetCurrentGameInfo = ()=>{
  return request({
    url:'/whoIsUndercover/controllerGetCurrentGameInfo',
    method:'post',
  })
}

export const clearAllGamerInfo = ()=>{
  return request({
    url:'/whoIsUndercoverGamer/clearAllGamerInfo',
    method:'post',
  })
}

export const out = (id)=>{
  return request({
    url:'/whoIsUndercover/out',
    method:'post',
    data:{
      id:id
    }
  })
}
