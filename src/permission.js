import router from './router'
import { resetSize, getCookie } from '@/utils/util' 
import baseconfig from '@/config/base.config'

const whiteList = baseconfig.whiteList  // 白名单

router.beforeEach((to, from, next) => {
    /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  
  let userId = getCookie('df_user_id') 
  if (['/login'].includes(to.path)) {
    resetSize(1)
  }
  if (userId) {
    if (to.path === '/login') {
      // 已经登录调整的首页
      next({ path: '/' })
    }else {
      next()
    }
  } else { 
    if (whiteList.indexOf(to.path) !== -1) {
      next() 
    } else {
      // 未登录
      next(`/login?redirect=${to.path}`)
    }
  }
})
