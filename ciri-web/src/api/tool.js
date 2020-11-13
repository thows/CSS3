import {Toast, MessageBox, Indicator} from 'mint-ui'
import moment from 'moment'

export default {
  domind: function () {
    // return 'http://127.0.0.1:8080'
    // return 'http://test.api.bjciri.com'  //测试
       return 'http://api.bjciri.com'       //线上

  },
  path: function () {
    return '/gateway'
  },

  oos: function () {
    return 'http://ciri-prod-pb.oss-cn-beijing.aliyuncs.com/'
  },

  generatorUrl: function (url) {
    if (url.indexOf('/img') !== -1 || url.indexOf('com') !== -1) {
      return url
    } else {
      return this.oos() + url
    }
  },

  checkEmail: function (email) {
    let re = /^.*\@.*\.com/
    return re.test(email)
  },
  checkMobile: function (mobile) {
    let re = /^1\d{10}$/
    return re.test(mobile)
  },
  checkPhone: function (phone) {
    let re = /^0\d{2,3}-?\d{7,8}$/
    return re.test(phone)
  },

  buildForm: function (arr) {
    if (!(arr instanceof Array)) {
      console.log('from Is not an array')
      return null
    }

    let param = new URLSearchParams()

    arr.forEach(function (v) {
      param.append(v.key, v.v)
    })
    return param
  },
  getuser: function () {
    let username = localStorage.getItem('username')
    if (typeof username === 'undefined' || username === '') { return null } else { return username }
  },
  isBank: function (str) {
    return typeof str === 'undefined' || str === '' || str === null
  },
  isBankArr: function (arr) {
    alert(1)
    return arr === null || arr.length != 0
  },
  islogin: function () {
    return localStorage.getItem('islogin')
  },
  gettoken: function () {
    return localStorage.getItem('token') === null ? '' : localStorage.getItem('token')
  },
  substr: function (string, count) {
    return string.length > count ? string.substr(0, count) + '...' : string
  },
  toast: function (msg) {
    Toast({
      message: msg,
      position: 'bottom',
      duration: 2000
    })
  },
  MessageBox: function (msg) {
    return MessageBox({
      title: '提示',
      message: msg,
      showCancelButton: true
    })
  },
  replaceAll: function (target, s1, s2) {
    if (this.isBank(target)) {
      return null
    }
    return target.replace(new RegExp(s1, 'gm'), s2)
  },
  time (time) {
    return moment(time).format('YYYY-MM-DD')
  },
  pxKey: function (str) {
    let num = str.replace('px', '')
    num = parseInt(num)
    return num
  },
  /* 隐藏用户名 中间加**  */
  hiddenName: function (username) {
    if (this.checkEmail(username)) {
      let a = username.indexOf('@')
      let b
      if (a >= 4) {
        b = username.substr(0, 4) + '**'
      } else {
        b = '**'
      }
      return b + username.substr(a, username.length)
    } else if (this.checkMobile(username)) {
      return username.substr(0, 3) + '****' + username.substr(7, 4)
    } else {
      if (username > 4) {
        return username.substr(0, 2) + '****' + username.substr(username.length - 2, 2)
      } else {
        return username
      }
    }
  },

  // 正在加载进度条
  IndicatorOpen (msg) {
    Indicator.open({
      text: msg,
      spinnerType: 'fading-circle'
    })
    // document.body.style.overflow='hidden';
  },
  // 关闭加载进度条
  IndicatorClose () {
    Indicator.close()
    // document.body.style.overflow='auto';
  }

}
