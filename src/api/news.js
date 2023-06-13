import request from '../util/request'

export const commitNews =(title,content,type)=>{
  return request({
    url:'/news/addNews',
    method:'post',
    data:{
      title:title,
      content:content,
      type:type
    }
  })
}

export const getNewsList =(title,current,size)=>{
  return request({
    url:'/news/getNewsList',
    method:'post',
    data:{
      title:title,
      current:current,
      size:size
    }
  })
}

export const deleteNewsById =(id)=>{
  return request({
    url:'/news/deleteNewsById',
    method:'post',
    data:{
      id:id,
    }
  })
}

export const getNewsContentById =(id)=>{
  return request({
    url:'/news/getNewsContentById',
    method:'post',
    data:{
      id:id,
    }
  })
}

export const updateNews =(id,title,content)=>{
  return request({
    url:'/news/updateNews',
    method:'post',
    data:{
      id:id,
      title:title,
      content:content
    }
  })
}

export const getActivityRulesList =(title,current,size)=>{
  return request({
    url:'/news/getActivityRulesList',
    method:'post',
    data:{
      title:title,
      current:current,
      size:size
    }
  })
}

export const getNewestMessageList =(size)=>{
  return request({
    url:'/news/getNewestMessageList',
    method:'post',
    data:{
      size:size
    }
  })
}
