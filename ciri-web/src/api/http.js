'use strict'

import axios from 'axios'
import qs from 'qs'
import router from "../router/index";
import tool from './tool';

axios.interceptors.request.use(config => {
  // loading
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  if (response.data.code == 401) {
    localStorage.clear()
    console.log(router.path);
    if(router.currentRoute.fullPath.indexOf("redirect")==-1){
      router.replace({
        path: '/login',
        query: {redirect: router.currentRoute.fullPath}
      });
    }
    console.log(this.$route);
    console.log(router.currentRoute.fullPath);
  }
  return response
}, error => {
  return Promise.resolve(error.response)
})

function checkStatus(response) {
  // loading
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    return response.data
  }
  // 异常状态下，把错误信息返回去
  return {
    status: -404,
    msg: '网络异常'
  }
}

function checkCode(res) {
  if (res.status === -404) {
    console.log(res.msg)
  }
  if (res && (res.code != 200)) {
    console.log(res.message)
  }
  return res
}

export default {
  post(url, data, reject) {
    return axios({
      method: 'post',
      baseURL: tool.domind() + tool.path(),
      url,
      data: qs.stringify(data),
      timeout: 20000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  },
  get(url, params, reject) {
    return axios({
      method: 'get',
      baseURL: tool.domind() + tool.path(),
      url,
      params, // get 参数
      timeout: 20000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  }
}
