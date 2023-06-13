import request from '../util/request'

export const getCurrentRoundPlayers =(ID)=>{
  return request({
    url:'/selectMemberModelRecord/getCurrentRoundPlayers',
    method:'post',
    data:{
      ID:ID,
    }
  })
}
//删除点将模式历史记录
export const resultPageDeleteCurrentRecord =(ID)=>{
  return request({
    url:'/selectMemberModelRecord/resultPageDeleteCurrentRecord',
    method:'post',
    data:{
      ID:ID,
    }
  })
}
export const getFourVsFourSelectMemberModelHistory =(current,size)=>{
  return request({
    url:'/selectMemberModelRecord/getFourVsFourSelectMemberModelHistory',
    method:'post',
    data:{
      current:current,
      size:size,
    }
  })
}
export const getCurrentAccountID =()=>{
  return request({
    url:'/selectMemberModelRecord/getCurrentAccountID',
    method:'post',
    data:{
    }
  })
}
//查看当前登录账号是否有队长权限
export const ifHasCaptainAuthority =()=>{
  return request({
    url:'/selectMemberModelRecord/ifHasCaptainAuthority',
    method:'post',
    data:{
    }
  })
}
export const deleteCurrentSelectMemberModelRecord =(ID)=>{
  return request({
    url:'/selectMemberModelRecord/deleteCurrentSelectMemberModelRecord',
    method:'post',
    data:{
      ID:ID,
    }
  })
}
export const getRecordBillInfo =(competitionID)=>{
  return request({
    url:'/selectMemberModelRecord/getRecordBillInfo',
    method:'post',
    data:{
      competitionID:competitionID,
    }
  })
}
export const getOnGoingCompetition =(current,size)=>{
  return request({
    url:'/selectMemberModelRecord/getOnGoingCompetition',
    method:'post',
    data:{
      size:size,
      current:current
    }
  })
}

export const submitConfigNewSelectMemberModel =(formData)=>{
  return request({
    url:'/selectMemberModelRecord/insertSelectMemberModelRecord',
    method:'post',
    data:{
      formData:formData,
    }
  })
}

export const selectMemberModelCheckScore =(formData,selectMemberModelRecordId)=>{
  return request({
    url:'/selectMemberModelRecord/selectMemberModelCheckScore',
    method:'post',
    data:{
      formData:formData,
      selectMemberModelRecordId:selectMemberModelRecordId
    }
  })
}
