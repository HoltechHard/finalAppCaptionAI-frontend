import request from '../util/request'



export const getMyPointsChartCurrentMonthData =()=>{
  return request({
    url:'/pointsRecord/getMyPointsChartCurrentMonthData',
    method:'post',
  })
}
