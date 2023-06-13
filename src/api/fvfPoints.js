import request from '../util/request'

/**
 * 请求需要携带token
 * @returns {AxiosPromise}
 */
export const getPoints =()=>{
  return request({
    url:'/FVF/',
    method:'post'
  })
}

  export const divideGroup =(pointsList)=>{
  return request({
    url:'/FVF/dg',
    method:'post',
    data:{
    persons:pointsList
    }
  })
}

export const clearAll =()=>{
  return request({
    url:'/FVF/clearAll',
    method:'post'
  })
}

export const checkScore =(score)=>{
  return request({
    url:'/FVF/checkScore',
    method:'post',
    data:{
      score:score
    }
  })
}

export const getAllFVFHistory =(current,size)=>{
  return request({
    url:'/fvfhistory/getAllFVFHistory',
    method:'post',
    data:{
      current:current,
      size:size
    }
  })
}

export const saveCurrentRound =(pointsList)=>{
  return request({
    url:'/fvfhistory/saveCurrentRound',
    method:'post',
    data:{
      pointsList:pointsList,
    }
  })
}


export const deleteCurrentRecord =(id)=>{
  return request({
    url:'/fvfhistory/deleteCurrentRecord',
    method:'post',
    data:{
      id:id,
    }
  })
}

export const getTeamMember =()=>{
  return request({
    url:'/FVF/getTeamMember',
    method:'post',
  })
}
