import request from '../util/request'
import pl from 'element-ui/src/locale/lang/pl'

export const getWeekPlan =()=>{
  return request({
    url:'/weekPlan/getWeekPlan',
    method:'post',
  })
}

export const getPlans =()=>{
  return request({
    url:'/trainingPlanList/getPlans',
    method:'post',
  })
}

export const updatePlanById =(id,plan)=>{
  return request({
    url:'/weekPlan/updatePlanById',
    method:'post',
    data:{
      id:id,
      plan:plan
    }
  })
}
