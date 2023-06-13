import request from '../util/request'

export const uploadImage =(formData)=>{
  return request({
    url:'/Image/describeImage',
    method:'post',
    data:formData,
  })
}

export const getImageHistory =(current,size)=>{
  return request({
    url:'/imageData/getHistory',
    method:'post',
    data:{
      current:current,
      size:size
    }
  })
}

export const getHistoryList =(current,size,history)=>{
  return request({
    url:'/imageData/getHistoryList',
    method:'post',
    data:{
      current:current,
      size:size,
    }
  })
}

export const getImage =(url)=>{
  return request({
    url:'/imageData/getImageByUrl',
    method:'post',
    data:{
      url:url
    }
  })
}
