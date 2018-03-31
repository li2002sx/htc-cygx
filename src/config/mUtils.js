/**
 * 自定义常用类
 */
exports.install = function (Vue, options) {
  // 简单的mobile检查
  Vue.prototype.isMobile = value => {
    return /^1[0-9]\d{9}$/.test(value)
  }

  // trim
  Vue.prototype.isNumber = function (value) {
    return value.replace(/(^[\s]*)|([\s]*$)/g, '')
  }

  // toast
  Vue.prototype.toastShow = function (type, text) {
    let width = '8.6em'
    let position = 'middle'
    if (type === 'text') {
      width = '13em'
      position = 'middle'
    }
    this.$vux.toast.show({
      type: type,
      text: text,
      time: 2000,
      width: width,
      position: position
    })
  }

  // 1秒之后跳转
  Vue.prototype.toUrl = function (url) {
    window.setTimeout(function () {
      this.$router.push(url)
    }.bind(this), 1000)
  }

  /**
   * 存储localStorage
   */
  Vue.prototype.setStore = function (name, content) {
    if (!name) return
    window.localStorage.setItem(name, content)
  }

  /**
   * 获取localStorage
   */
  Vue.prototype.getStore = function (name) {
    if (!name) return
    return window.localStorage.getItem(name)
  }

  /**
   * 删除localStorage
   */
  Vue.prototype.removeStore = function (name) {
    if (!name) return
    window.localStorage.removeItem(name)
  }

  Vue.prototype.loadingShow = function () {
    // 显示
    this.$vux.loading.show({
      text: 'Loading'
    })
  }

  Vue.prototype.loadingHide = function () {
    // 隐藏
    this.$vux.loading.hide()
  }

  // 日期加减天数
  Vue.prototype.addDate = function (d, days) {
    if (days === undefined || days === '') {
      days = 1
    }
    var date = new Date(d)
    date.setDate(date.getDate() + days)
    var month = date.getMonth() + 1
    var day = date.getDate()
    return date.getFullYear() + '-' + month + '-' + day
  }

  Vue.prototype.getPicUrl = function (picUrl) {
    if (picUrl === undefined || picUrl.length === 0) {
      // return '/static/images/ico-user.png'
      return ''
    }
    return picUrl
  }

  Vue.prototype.openInWx = function () {
    var ua = navigator.userAgent.toLowerCase()
    if (ua.indexOf('micromessenger') > -1) {
      return true
    }
    return false
  }

  Vue.prototype.getOpenId = function () {
    return this.getStore('openId') || ''
  }

  Vue.prototype.wxAuth = function () {
    if (this.openInWx() === true && this.getOpenId().length === 0) {
      location.href = global.wxAuthorizeUrl
    }
  }

  Vue.prototype.getDevice = function () {
    var ua = navigator.userAgent.toLowerCase()
    if (/iphone|ipad|ipod/.test(ua)) {
      return 'ios'
    } else if (/android/.test(ua)) {
      return 'android'
    }
    return ''
  }

  Vue.prototype.rotateImg = function (img, direction, canvas) {
    // 最小与最大旋转方向，图片旋转4次后回到原方向
    const minStep = 0
    const maxStep = 3
    if (img === null) return
    // img的高度和宽度不能在img元素隐藏后获取，否则会出错
    let height = img.height
    let width = img.width
    let step = 2
    if (step === null) {
      step = minStep
    }
    if (direction === 'right') {
      step++
      // 旋转到原位置，即超过最大值
      step > maxStep && (step = minStep)
    } else {
      step--
      step < minStep && (step = maxStep)
    }
    // 旋转角度以弧度值为参数
    let degree = step * 90 * Math.PI / 180
    let ctx = canvas.getContext('2d')
    switch (step) {
      case 0:
        canvas.width = width
        canvas.height = height
        ctx.drawImage(img, 0, 0)
        break
      case 1:
        canvas.width = height
        canvas.height = width
        ctx.rotate(degree)
        ctx.drawImage(img, 0, -height)
        break
      case 2:
        canvas.width = width
        canvas.height = height
        ctx.rotate(degree)
        ctx.drawImage(img, -width, -height)
        break
      case 3:
        canvas.width = height
        canvas.height = width
        ctx.rotate(degree)
        ctx.drawImage(img, -width, 0)
        break
    }
  }

  Vue.prototype.compress = function (img, Orientation) {
    let canvas = document.createElement('canvas')
    let ctx = canvas.getContext('2d')
    // 瓦片canvas
    let tCanvas = document.createElement('canvas')
    let tctx = tCanvas.getContext('2d')
    // let initSize = img.src.length

    let width = img.width
    let height = img.height
    // if (width > 750) {
    //   let w = 750
    //   width = w
    //   height = w * (img.height / img.width)
    // }

    // 如果图片大于四百万像素，计算压缩比并将大小压至400万以下
    let ratio
    if ((ratio = width * height / 4000000) > 1) {
      // console.log("大于400万像素")
      ratio = Math.sqrt(ratio)
      width /= ratio
      height /= ratio
    } else {
      ratio = 1
    }
    canvas.width = width
    canvas.height = height
    // 铺底色
    ctx.fillStyle = '#fff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    // 如果图片像素大于100万则使用瓦片绘制
    let count
    if ((count = width * height / 1000000) > 1) {
      // console.log("超过100W像素")
      count = ~~(Math.sqrt(count) + 1) // 计算要分成多少块瓦片
      // 计算每块瓦片的宽和高
      let nw = ~~(width / count)
      let nh = ~~(height / count)
      tCanvas.width = nw
      tCanvas.height = nh
      for (let i = 0; i < count; i++) {
        for (let j = 0; j < count; j++) {
          tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh)
          ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh)
        }
      }
    } else {
      ctx.drawImage(img, 0, 0, width, height)
    }
    // 修复ios上传图片的时候 被旋转的问题
    if (Orientation !== '' && Orientation !== 1) {
      switch (Orientation) {
        case 6: // 需要顺时针（向左）90度旋转
          this.rotateImg(img, 'left', canvas)
          break
        case 8: // 需要逆时针（向右）90度旋转
          this.rotateImg(img, 'right', canvas)
          break
        case 3: // 需要180度旋转
          this.rotateImg(img, 'right', canvas) // 转两次
          this.rotateImg(img, 'right', canvas)
          break
      }
    }
    // 进行最小压缩
    let ndata = canvas.toDataURL('image/jpeg', 0.1)
    // console.log('压缩前：' + initSize)
    // console.log('压缩后：' + ndata.length)
    // console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + "%")
    tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0
    return ndata
  }

  // JS控制图片按比例缩放并不超过一定宽度和高度
  // 图片按比例缩放
  Vue.prototype.drawImage = function (ImgD, iwidth, iheight) {
    // var flag = false
    var image = new Image()
    // var iwidth = 620            // 定义允许图片宽度，当宽度大于这个值时等比例缩小
    // var iheight = 360            // 定义允许图片高度，当宽度大于这个值时等比例缩小
    var minwidth = iwidth  // 图片最小宽度小于定义百分比；
    var minheight = iheight // 图片最小高度小于定义百分比
    image.src = ImgD.src
    if (image.width > 0 && image.height > 0) {         // 假如图片长宽都不为零
      // flag = true
      if (image.height / image.width >= iheight / iwidth) {       // 通过正弦值判断图片缩放后是否偏高
        if (image.height > iheight) {        // 如果图片比设定的要高
          ImgD.height = iheight
          ImgD.width = (image.width * iheight) / image.height
        } else {
          // 假如图片width<70%(设定)&&heitht<70%(设定)
          if (image.height < minheight) {
            ImgD.height = minheight
            ImgD.width = (image.width * minheight) / image.height
          } else {
            ImgD.width = image.width
            ImgD.height = image.height
          }
        }
        // mgD.alt = image.width + "×" + image.height
      } else { // 如果图片比例 小于 设定的比例
        if (image.width > iwidth) {
          ImgD.width = iwidth
          ImgD.height = (image.height * iwidth) / image.width
        } else {
          // 假如图片width<70%(设定)&&heitht<70%(设定)
          if (image.width <= minwidth) {
            ImgD.width = minwidth
            ImgD.height = (image.height * minwidth) / image.width
          } else {
            ImgD.width = image.width
            ImgD.height = image.height
          }
        }
        // ImgD.alt = image.width + "×" + image.height
      }
    }
  }
}
