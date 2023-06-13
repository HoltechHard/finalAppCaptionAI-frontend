import request from '../util/request'

export const getAllCompetitionClassifyList =(competitionClassify,size,current)=>{
  return request({
    url:'/competitionClassify/getAllCompetitionClassifyList',
    method:'post',
    data:{
      competitionClassify:competitionClassify,
      size:size,
      current:current
    }
  })
}

export const deleteCompetitionClassifyById =(id)=>{
  return request({
    url:'/competitionClassify/deleteCompetitionClassifyById',
    method:'post',
    data:{
      id:id
    }
  })
}

export const addCompetitionClassify =(competitionClassify)=>{
  return request({
    url:'/competitionClassify/addCompetitionClassify',
    method:'post',
    data:{
      competitionClassify:competitionClassify
    }
  })
}

export const getAllCompetitions =(competitionName,current,size)=>{
  return request({
    url:'/competitions/getAllCompetitions',
    method:'post',
    data:{
      competitionName:competitionName,
      current:current,
      size:size
    }
  })
}

export const updateSignUpStateById =(id,state)=>{
  return request({
    url:'/competitions/updateSignUpStateById',
    method:'post',
    data:{
      id:id,
      state:state,
    }
  })
}

export const ifHasAuthority =()=>{
  return request({
    url:'/competitions/ifHasAuthority',
    method:'post',
  })
}

export const commitResult =(id,result)=>{
  return request({
    url:'/competitions/commitResult',
    method:'post',
    data:{
      id:id,
      result:result
    }
  })
}

export const getAllCompetitionClassify =()=>{
  return request({
    url:'/competitionClassify/getAllCompetitionClassify',
    method:'post',
  })
}

export const insertCompetition =(competitionInfo)=>{
  return request({
    url:'/competitions/insertCompetition',
    method:'post',
    data:{
      competitionInfo:competitionInfo
    }
  })
}

export const deleteCompetitionById =(competitionId)=>{
  return request({
    url:'/competitions/deleteCompetitionById',
    method:'post',
    data:{
      competitionId:competitionId
    }
  })
}
