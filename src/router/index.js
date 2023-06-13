import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta:{title:"AI Box"}
  },
  {
    path: '/main',
    name:'Main',
    component: () => import('../views/Main.vue'),
    children: [
      {
        path: '/Chat',
        name: 'Chat',
        component: () => import('../views/Chat/Chat.vue'),
        meta:{title:"AI-ChatGPT"}
      },
      {
        path: '/welcome',
        name: 'welcome',
        component: () => import('../views/Welcome.vue'),
        meta:{title:"AI Box——Welcome！"}
      },
      {
        path: '/users',
        name: 'Users',
        component: () => import('../views/user/Users.vue'),
        meta:{title:"AI Box——user management"}
      },
      {
        path: '/roleAdmin',
        name: 'roleAdmin',
        component: () => import('../views/user/RoleAdmin.vue'),
        meta:{title:"SPbPU——role management"}
      },

      {
        path: '/ApiAdmin',
        name: 'ApiAdmin',
        component: () => import('../views/user/ApiAdmin.vue'),
        meta:{title:"AI Box——API management"}
      },
      {
        path: '/Image',
        name: 'Image',
        component: () => import('../views/Image/Image.vue'),
        meta:{title:"AI Box——Describe it!"}
      },
    ],
    meta:{title:"Polytechnic University AI Box"}
  },
]

const router = new VueRouter({
  routes
})

export default router
