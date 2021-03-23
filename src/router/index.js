import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta:{title:"Fsn战队队员入口"}
  },
  {
    path: '/main',
    name:'Main',
    component: () => import('../views/Main.vue'),
    children: [
      {
        path: '/TrainingPlanSetting',
        name: 'TrainingPlanSetting',
        component: () => import('../views/training/TrainingPlanSetting.vue'),
        meta:{title:"Fsn战队——训练计划配置"}
      },
      {
        path: '/welcome',
        name: 'welcome',
        component: () => import('../views/Welcome.vue'),
        meta:{title:"Fsn战队——欢迎回来！"}
      },
      {
        path: '/users',
        name: 'Users',
        component: () => import('../views/user/Users.vue'),
        meta:{title:"Fsn战队——队员管理"}
      },
      {
        path: '/DivideGroupContest',
        name: 'DivideGroupContest',
        component: () => import('../views/tool/divideGroup/DivideGroupContest.vue'),
        meta:{title:"Fsn战队——4V4分组"}
      },
      {
        path: '/TopEightDoubleElimination',
        name: 'TopEightDoubleElimination',
        component: () => import('../views/topEightDoubleElimination/TopEightDoubleElimination.vue'),
        meta:{title:"Fsn战队——8强双败流程"}
      },
      {
        path: '/Competitions',
        name: 'Competitions',
        component: () => import('../views/competition/Competitions.vue'),
        meta:{title:"Fsn战队——赛事信息"}
      },
      {
        path: '/roleAdmin',
        name: 'roleAdmin',
        component: () => import('../views/user/RoleAdmin.vue'),
        meta:{title:"Fsn战队——角色管理"}
      },
      {
        path: '/configUndercover',
        name: 'configUndercover',
        component: () => import('../views/game/ConfigUndercover.vue'),
        meta:{title:"Fsn战队——谁是卧底游戏配置"}
      },
      {
        path: '/underCoverGamerUI',
        name: 'underCoverGamerUI',
        component: () => import('../views/game/UnderCoverGamerUI.vue'),
        meta:{title:"Fsn战队——谁是卧底"}
      },
      {
        path: '/CompetitionClassify',
        name: 'CompetitionClassify',
        component: () => import('../views/competition/CompetitionClassify.vue'),
        meta:{title:"Fsn战队——赛事类别管理"}
      },
      {
        path: '/ApiAdmin',
        name: 'ApiAdmin',
        component: () => import('../views/user/ApiAdmin.vue'),
        meta:{title:"Fsn战队——API管理"}
      },
    ],
    meta:{title:"Fsn战队——指尖演绎舞蹈"}
  },
]

const router = new VueRouter({
  routes
})

export default router
