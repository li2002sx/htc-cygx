// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import VueRouter from 'vue-router'
import routes from './router/router'
import store from './vuex/store'
import mUtils from './config/mUtils'
import axios from '../node_modules/axios'
import './config/globalUtil'
import Qs from 'qs'
// 引入echarts
// import echarts from 'echarts'

// Vue.use(viewPort)

// plugins
import {
  ToastPlugin,
  AlertPlugin,
  ConfirmPlugin,
  LoadingPlugin,
  WechatPlugin,
  DatetimePlugin,
  AjaxPlugin
} from 'vux'

Vue.use(VueRouter)
Vue.use(mUtils)
Vue.use(ToastPlugin)
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
Vue.use(LoadingPlugin)
Vue.use(WechatPlugin)
Vue.use(DatetimePlugin)
Vue.use(AjaxPlugin)

// Vue.prototype.$echarts = echarts

const router = new VueRouter({
  routes
  // scrollBehavior(to, from, savedPosition) {
  //   return { x: 0, y: 0 }
  // }
})

// 点击延迟
FastClick.attach(document.body)

// 日志输出开关
Vue.config.productionTip = false

// simple history management
// const history = window.sessionStorage
// history.clear()
// let historyCount = history.getItem('count') * 1 || 0
// history.setItem('/', 0)

// router.beforeEach(function (to, from, next) {
// store.commit('updateLoadingStatus', true)
// const toIndex = history.getItem(to.path)
// const fromIndex = history.getItem(from.path)

// if (toIndex) {
//   if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
//     store.commit('updateDirection', 'forward')
//   } else {
//     store.commit('updateDirection', 'reverse')
//   }
// } else {
//   ++historyCount
//   history.setItem('count', historyCount)
//   to.path !== '/' && history.setItem(to.path, historyCount)
//   store.commit('updateDirection', 'forward')
// }

// if (/\/http/.test(to.path)) {
//   let url = to.path.split('http')[1]
//   window.location.href = `http${url}`
// } else {
//   next()
// }
// })

// router.afterEach(function (to) {
// store.commit('updateLoadingStatus', false)
// })

// Vue.prototype.axios = axios
const baseURL = global.apiUrl

Vue.prototype.getFieldByUseInfo = function (field) {
  let userInfo = window.localStorage.getItem(global.userInfo)
  if (userInfo !== null) {
    userInfo = JSON.parse(userInfo)
    if (userInfo !== null) {
      return Reflect.get(userInfo, field) || ''
    }
  }
  return ''
}

Vue.prototype.isLogin = function () {
  if (this.getFieldByUseInfo('token') === '') {
    return false
  } else {
    return true
  }
}

// axiosGet请求
Vue.prototype.get = function (url, params, callback) {
  // 显示
  this.$vux.loading.show({
    text: '加载中...'
  })
  axios({
    url: url,
    method: 'get',
    baseURL: baseURL,
    headers: {
      'token': this.getFieldByUseInfo('token')
    },
    params: params,
    withCredentials: true, // default
    responseType: 'json', // default
    timeout: 10000
  }).then(response => {
    let data = response.data
    if (data === null || data.status === -1) {
      this.toUrl('/login')
    } else {
      callback(data)
    }
    // 隐藏
    this.$vux.loading.hide()
  }).catch(error => {
    // 隐藏
    this.$vux.loading.hide()
    console.log(error)
  })
}

// axiosPost请求
Vue.prototype.post = function (url, data, callback, showLoad) {
  if (showLoad === true) {
    // 显示
    this.$vux.loading.show({
      text: '加载中...'
    })
  }
  axios({
    url: url,
    method: 'post',
    baseURL: baseURL,
    headers: {
      'token': this.getFieldByUseInfo('token'),
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [function (data) {
      // 为了避免qs格式化时对内层对象的格式化先把内层的对象转为
      data.CustData = JSON.stringify(data.CustData)
      // 由于使用的form-data传数据所以要格式化
      data = Qs.stringify(data)
      return data
    }],
    transformResponse: [function (data) {
      return data
    }],
    data: data,
    withCredentials: true, // default
    responseType: 'json', // default
    timeout: 100000,
    // `onUploadProgress`上传进度事件
    onUploadProgress: function (progressEvent) {
    },
    // 下载进度的事件
    onDownloadProgress: function (progressEvent) {
    }
  }).then(response => {
    let data = response.data
    if (data === null || data.status === -1) {
      this.toUrl('/login')
    } else {
      callback(data)
    }
    // 隐藏
    this.$vux.loading.hide()
  }).catch(error => {
    // 隐藏
    this.$vux.loading.hide()
    console.log(error)
  })
}

// axiosPost请求
Vue.prototype.postForm = function (url, data, callback) {
  // 显示
  this.$vux.loading.show({
    text: '加载中...'
  })
  axios({
    url: url,
    method: 'post',
    baseURL: baseURL,
    headers: {
      'token': this.getFieldByUseInfo('token'),
      'Content-Type': 'multipart/form-data'
    },
    transformRequest: [function (data) {
      // 为了避免qs格式化时对内层对象的格式化先把内层的对象转为
      // data.CustData = JSON.stringify(data.CustData)
      // 由于使用的form-data传数据所以要格式化
      // data = Qs.stringify(data)
      return data
    }],
    transformResponse: [function (data) {
      return data
    }],
    data: data,
    withCredentials: true, // default
    responseType: 'json', // default
    timeout: 10000,
    // `onUploadProgress`上传进度事件
    onUploadProgress: function (progressEvent) {
    },
    // 下载进度的事件
    onDownloadProgress: function (progressEvent) {
    }
  }).then(response => {
    let data = response.data
    if (data === null || data.status === -1) {
      this.toUrl('/login')
    } else {
      callback(data)
    }
    // 隐藏
    this.$vux.loading.hide()
  }).catch(error => {
    // 隐藏
    this.$vux.loading.hide()
    console.log(error)
  })
}

Vue.prototype.toUrl = function (url) {
  if (url === '/login') {
    var referrer = document.URL
    if (referrer.indexOf('/user/') === -1 && referrer.indexOf('/my') === -1) {
      this.setStore('referrer', referrer.split('#')[1])
    } else {
      this.removeStore('referrer')
    }
  }
  if (location.href.indexOf('?#') > -1) {
    this.$router.push(url)
  } else {
    location.href = '?#' + url
  }
  // if (url === '/my/vip' || url.indexOf('/car/template') > -1) {

  // } else {
  //   this.$router.push(url)
  // }
  if (url === -1) {
    window.history.go(-1)
  }
}

Vue.prototype.loginToUrl = function () {
  var referrer = this.getStore('referrer')
  if (referrer === null) {
    referrer = '/index'
  }
  // location.href = referrer
  this.$router.push(referrer)
}

Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = el.dataset.title
  }
})

Vue.prototype.wxShare = function (title, desc, imgUrl, link) {
  imgUrl = this.getPicUrl(imgUrl)
  this.get('/rest/user/wxshareconf', { url: location.href }, function (result) {
    if (result !== null) {
      this.$wechat.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: result.appId, // 必填，公众号的唯一标识
        timestamp: result.timestamp, // 必填，生成签名的时间戳
        nonceStr: result.nonceStr, // 必填，生成签名的随机串
        signature: result.signature, // 必填，签名，见附录1
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      })
      this.$wechat.ready(function () {
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
        this.$wechat.onMenuShareTimeline({
          title: title, // 分享标题
          link: link, // 分享链接
          imgUrl: imgUrl, // 分享图标
          success: function () {
            // 用户确认分享后执行的回调函数
          },
          cancel: function () {
            // 用户取消分享后执行的回调函数
          }
        })

        this.$wechat.onMenuShareAppMessage({
          title: title, // 分享标题
          desc: desc, // 分享描述
          link: link, // 分享链接
          imgUrl: imgUrl, // 分享图标
          type: '', // 分享类型,music、video或link，不填默认为link
          dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          success: function () {
            // 用户确认分享后执行的回调函数
          },
          cancel: function () {
            // 用户取消分享后执行的回调函数
          }
        })

        this.$wechat.onMenuShareQQ({
          title: title, // 分享标题
          desc: desc, // 分享描述
          link: link, // 分享链接
          imgUrl: imgUrl, // 分享图标
          success: function () {
            // 用户确认分享后执行的回调函数
          },
          cancel: function () {
            // 用户取消分享后执行的回调函数
          }
        })

        this.$wechat.onMenuShareWeibo({
          title: '', // 分享标题
          desc: '', // 分享描述
          link: '', // 分享链接
          imgUrl: '', // 分享图标
          success: function () {
            // 用户确认分享后执行的回调函数
          },
          cancel: function () {
            // 用户取消分享后执行的回调函数
          }
        })

        this.$wechat.onMenuShareQZone({
          title: title, // 分享标题
          desc: desc, // 分享描述
          link: link, // 分享链接
          imgUrl: imgUrl, // 分享图标
          success: function () {
            // 用户确认分享后执行的回调函数
          },
          cancel: function () {
            // 用户取消分享后执行的回调函数
          }
        })
      }.bind(this))

      this.$wechat.error(function (res) {
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
      })
    } else {
      this.toastShow('text', '分享失败')
    }
  }.bind(this))
}

Vue.prototype.wxChooseImage = function (callback) {
  this.get('/rest/user/wxshareconf', { url: location.href }, function (result) {
    if (result !== null) {
      this.$wechat.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: result.appId, // 必填，公众号的唯一标识
        timestamp: result.timestamp, // 必填，生成签名的时间戳
        nonceStr: result.nonceStr, // 必填，生成签名的随机串
        signature: result.signature, // 必填，签名，见附录1
        jsApiList: ['chooseImage', 'getLocalImgData'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      })
      this.$wechat.ready(function () {
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
        this.$wechat.chooseImage({
          count: 9, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
            callback(res.localIds) // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
          }
        })
      }.bind(this))
      this.$wechat.error(function (res) {
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
      })
    } else {
      this.toastShow('text', '初始化失败')
    }
  }.bind(this))
}

Vue.prototype.wxGetLocalImgData = function (localId, callback) {
  this.get('/rest/user/wxshareconf', { url: location.href }, function (result) {
    if (result !== null) {
      this.$wechat.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: result.appId, // 必填，公众号的唯一标识
        timestamp: result.timestamp, // 必填，生成签名的时间戳
        nonceStr: result.nonceStr, // 必填，生成签名的随机串
        signature: result.signature, // 必填，签名，见附录1
        jsApiList: ['chooseImage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      })
      this.$wechat.ready(function () {
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
        this.$wechat.getLocalImgData({
          localId: localId, // 图片的localID
          success: function (res) {
            callback(res.localData) // localData是图片的base64数据，可以用img标签显示
          }
        })
      }.bind(this))

      this.$wechat.error(function (res) {
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
      })
    } else {
      this.toastShow('text', '分享失败')
    }
  }.bind(this))
}

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
