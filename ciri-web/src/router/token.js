import axios from "axios"
import tool from '../api/tool'
import router from './index'

router.beforeEach((to, from, next) => {
  // 切换页面时滚动条自动滚动到顶部的方法
  // window.scrollTo(0,0);
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    if (tool.gettoken()) {  // 通过vuex state获取当前的token是否存在
      next();
    }
    else {
      next({
        path: '/login',
        query: {redirect: from.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
    // console.log(this.query.redirect);
  }
  else {
    next();
  }
})

axios.defaults.headers.token = tool.gettoken()

export default {

}
