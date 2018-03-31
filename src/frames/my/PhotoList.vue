<template>
  <section>
    <div v-transfer-dom>
      <previewer :list="showList" ref="previewer" :options="options"></previewer>
    </div>
    <div v-title data-title="成交客户"></div>
    <!--header end  -->
    <dl class="toolbar" v-if="userId==0">
      <dd>
        <i class="" @click="editPhoto" v-if="!edit">编辑</i>
        <i class="" @click="cancelEdit" v-else>取消</i>
      </dd>
      <dd class="tc">
        <i class="false" :class="{del:edit}" @click="delPhotos">删除</i>
      </dd>
      <!-- android -->
      <dd v-if="this.device=='android'" class="tr" @click="uploadImage">
        <i>上传</i>
        <!-- <input type="file" accept="image/*" @change="onFileChange" class="allfile" multiple="multiple" />-->
      </dd>
      <dd v-else class="tr">
        <i>上传</i>
        <input type="file" accept="image/*" @change="onFileChange" class="allfile" multiple="multiple" />
      </dd>
    </dl>
    <!--mybox  -->
    <div class="guestbox">
      <div class="guestnull" v-if="userPhotos.length == 0 && addPhotos.length == 0">
        <i class="ico-guestnull"></i>
        <p>暂无成交客户信息</p>
        <p>点击左下角“上传”按钮进行添加</p>
      </div>
      <div v-else>
        <div class="list-wrapper" ref="wrapper">
          <!-- <scroller ref="scroller" lock-x scrollbar-y use-pullup :pullup-config="pullupConfig" height="1234px" @on-pullup-loading="getPhotos"> -->
          <div class="guestlist" :class="{edit:edit}">
            <dl>
              <!-- <dd v-for="(item, index) in addPhotos" @click="selectImage(index)">
                                                                                                                                                                                                        <img :src="item" />
                                                                                                                                                                                                    </dd> -->
              <!--一定要生成正方形的图  -->
              <div v-for="(item, index) in userPhotos">
                <dd @click="select(item.photoId,index)">
                  <img class="previewer-demo-img" :src="item.thumbPicUrl" />
                </dd>
              </div>
            </dl>
            <div class="bottom-tip" v-show="hasdata">
              <span class="loading-hook">查看更多</span>
            </div>
          </div>
          <!-- </scroller> -->
        </div>
      </div>
    </div>

    <!--mybox end  -->
    <div v-transfer-dom>
      <popup v-model="showTip" position="bottom" :show-mask="false">
        <div class="position-vertical-demo">
          <!-- 您有{{addPhotos.length}}张图片未保存，请点击保存按钮 -->
          手机拍照图片较大，加载较慢，请耐心等待
        </div>
      </popup>
    </div>
  </section>
</template>

<script>
import { cookie, TransferDom, Popup, Previewer, Scroller, Spinner } from 'vux'
import BScroll from 'better-scroll'
import Exif from 'exif-js'
export default {
  directives: {
    TransferDom
  },
  components: {
    cookie,
    Popup,
    Previewer,
    Scroller,
    Spinner
  },
  data () {
    return {
      userId: parseInt(this.$route.params.userId) || 0,
      edit: false,
      showTip: false,
      userPhotos: [],
      addPhotos: [],
      photoIdSet: new Set(),
      imageSet: new Set(),
      showList: [],
      options: {
        getThumbBoundsFn (index) {
          let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
          let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
          let rect = thumbnail.getBoundingClientRect()
          return { x: rect.left, y: rect.top + pageYScroll, w: rect.width }
        }
      },
      pageIndex: 1,
      hasdata: false,
      pullupStatus: 'default',
      pullupConfig: {
        content: '上拉加载更多',
        downContent: '松开进行加载',
        upContent: '上拉加载更多',
        loadingContent: '努力加载中...'
      },
      fileCount: 0,
      continueUpload: true,
      uploadingCount: 1,
      ready: false,
      device: this.getDevice(),
      images: [],
      logs: [],
      scroll: null
    }
  },
  created () {
    this.getPhotos()
    this.wxShareConf()
  },
  computed: {},
  mounted: function () {
  },
  methods: {
    wxShareConf () {
      var url = location.href.split('#')[0]
      this.get('/rest/user/wxshareconf', { url: url }, function (result) {
        if (result !== null) {
          this.$wechat.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: result.appId, // 必填，公众号的唯一标识
            timestamp: result.timestamp, // 必填，生成签名的时间戳
            nonceStr: result.nonceStr, // 必填，生成签名的随机串
            signature: result.signature, // 必填，签名，见附录1
            jsApiList: ['chooseImage', 'uploadImage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          })
          this.ready = true
        } else {
          this.toastShow('text', '失败')
        }
      }.bind(this))
    },
    loadImage () {
      // let target = event.target
      // this.drawImage(target, 190, 190)
    },
    show (index) {
      this.$refs.previewer.show(index)
    },
    select (photoId, index) {
      if (this.userId === 0) {
        if (this.edit) {
          let target = event.target
          if (this.photoIdSet.has(photoId)) {
            this.photoIdSet.delete(photoId)
            target.className = ''
          } else {
            this.photoIdSet.add(photoId)
            target.className = 'on'
          }
        } else {
          this.show(index)
        }
      } else {
        this.show(index)
      }
    },
    selectImage (index) {
      if (this.imageSet.has(index)) {
        this.imageSet.delete(index)
        event.target.className = ''
      } else {
        this.imageSet.add(index)
        event.target.parentNode.className = 'on'
      }
    },
    editPhoto () {
      this.edit = !this.edit
    },
    cancelEdit () {
      this.edit = !this.edit
    },
    delPhotos () {
      if (this.imageSet.size > 0) {
        for (let index of this.imageSet) {
          this.addPhotos.shift(index)
        }
        if (this.addPhotos.length === 0) {
          this.showTip = false
        }
      }
      if (this.photoIdSet.size > 0) {
        let that = this
        this.$vux.confirm.show({
          title: '提示',
          content: '确定要删除吗？',
          confirmText: '删除',
          onConfirm () {
            let param = {
              photoIds: [...that.photoIdSet].join(',')
            }
            that.post('/rest/userphoto/delete', param, function (result) {
              if (result.status === 1) {
                that.toastShow('success', '删除成功')
                var childs = document.querySelectorAll('.on')
                for (var i = childs.length - 1; i >= 0; i--) {
                  var item = childs[i]
                  item.parentNode.removeChild(item)
                }
                // document.querySelectorAll('.on').forEach(function (item) {
                //   item.parentNode.removeChild(item)
                // })
                that.photoIdSet = new Set()
                that.cancelEdit()
              } else {
                that.toastShow('text', result.message)
              }
            })
          }
        })
      } else {
        this.toastShow('text', '至少选择一个删除')
      }
    },
    initScroll () {
      let that = this
      this.$nextTick(() => {
        if (!that.scroll) {
          that.scroll = new BScroll(this.$refs.wrapper, {
            click: true
          })
          // 滑动结束
          var bottomTip = document.querySelector('.loading-hook')
          that.scroll.on('touchend', function (position) {
            if (position.y < this.maxScrollY) {
              bottomTip.innerText = '加载中...'
              // 向列表添加数据
              if (that.hasdata) {
                that.getPhotos()
              }
              // 恢复文本值
              // bottomTip.innerText = '查看更多'
              // reloadData()
              // 加载更多后,重新计算滚动区域高度
              window.setTimeout(function () {
                that.scroll.refresh()
              }, 500)
            }
          })
        } else {
          that.scroll.refresh()
        }
      })
    },
    getPhotos (uuid) {
      let param = {
        userId: this.userId,
        pageIndex: this.pageIndex
      }
      this.get('/rest/userphoto/list', param, function (result) {
        if (result.status === 1) {
          for (let item of result.userPhotos) {
            this.userPhotos.push(item)
            param = {
              src: item.picUrl
            }
            this.showList.push(param)
          }
          if (this.pageIndex === 1 && result.userPhotos.length > 0) {
            this.initScroll()
          }
          this.pageIndex++
          if (result.userPhotos.length < 40) {
            this.hasdata = false
          } else {
            this.hasdata = true
          }
          // if (result.userPhotos.length === 0) {
          //   this.$nextTick(() => {
          //     this.$refs.scroller.disablePullup()
          //   })
          // } else {
          // this.$nextTick(() => {
          //   this.$refs.scroller.donePullup()
          //   this.$refs.scroller.reset()
          // })
          // if (result.userPhotos.length < 40) {
          //   let pullUpTime = setTimeout(function () {
          //     let pullUpDisplay = document.querySelector('.xs-plugin-pullup-container')
          //     if (pullUpDisplay !== undefined && pullUpDisplay.style.display === '') {
          //       pullUpDisplay.style.display = 'none'
          //       clearTimeout(pullUpTime)
          //     }
          //   }, 100)
          // }
          // }
        } else {
          this.toastShow('text', result.message)
        }
      }.bind(this))
    },
    onFileChange (e) {
      // this.$vux.toast.show({
      //   type: 'text',
      //   text: '等待图片加载中',
      //   time: 1000000,
      //   position: 'middle'
      // })
      this.showTip = true
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      // this.$vux.toast.hide()
      // this.showTip = false
      let that = this
      this.$vux.confirm.show({
        title: '提示',
        content: '照片上传中...',
        // content: this.uploadingCount + '/' + files.length + '照片上传中...',
        confirmText: '取消',
        onConfirm () {
          that.continueUpload = false
        }
      })
      let confirmTime = setTimeout(function () {
        let cancelDisplay = document.querySelector('.weui-dialog__btn_default')
        if (cancelDisplay !== undefined && cancelDisplay.style.display === '') {
          cancelDisplay.style.display = 'none'
          clearTimeout(confirmTime)
        }
      }, 100)
      this.createImage(files)
    },
    createImage (file) {
      if (typeof FileReader === 'undefined') {
        this.toastShow('text', '您的浏览器不支持图片上传，请升级您的浏览器')
        return false
      }
      var that = this
      this.fileCount = file.length
      let Orientation
      for (var i = 0; i < this.fileCount; i++) {
        // 去获取拍照时的信息，解决拍出来的照片旋转问题
        Exif.getData(file[i], function () {
          Orientation = Exif.getTag(this, 'Orientation')
        })

        var reader = new FileReader()
        reader.readAsDataURL(file[i])
        reader.onload = function (e) {
          var img = new Image()
          let result = e.target.result
          img.src = result

          // 判断图片是否大于100K,是就直接上传，反之压缩图片
          if (result.length <= (100 * 1024)) {
            that.uploadData(result)
            // that.addPhotos.push(result)
          } else {
            img.onload = function () {
              let data = that.compress(img, Orientation)
              that.uploadData(data)
              // that.addPhotos.push(data)
            }
          }
        }
      }
      // this.showTip = true
    },
    uploadImage () {
      if (this.ready) {
        let that = this
        that.images = []
        let currentSize = that.images.length
        that.$wechat.chooseImage({
          count: 9, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
            that.$vux.confirm.show({
              title: '提示',
              content: '照片上传中...',
              // content: this.uploadingCount + '/' + files.length + '照片上传中...',
              confirmText: '取消',
              onConfirm () {
                that.continueUpload = false
              }
            })
            let confirmTime = setTimeout(function () {
              let cancelDisplay = document.querySelector('.weui-dialog__btn_default')
              if (cancelDisplay !== undefined && cancelDisplay.style.display === '') {
                cancelDisplay.style.display = 'none'
                clearTimeout(confirmTime)
              }
            }, 100)

            var localIds = res.localIds
            localIds.forEach(li => {
              that.images.push(li)
            })
            that.fileCount = that.images.length
            that.readImages(currentSize)
          }
        })
      }
    },
    readImages (xIndex) {
      let that = this
      that.$wechat.uploadImage({
        localId: that.images[xIndex], // 需要上传的图片的本地ID，由chooseImage接口获得
        isShowProgressTips: 1, // 默认为1，显示进度提示
        success: function (res) {
          var serverId = res.serverId // 返回图片的服务器端ID
          that.uploadDataWx(serverId)
          that.readImages(xIndex + 1)
        }
      })
    },
    uploadDataWx (mediaId) {
      this.post('/rest/userphoto/uploadwx', { mediaId: mediaId }, function (result) {
        if (result.status === 1) {
          if (this.uploadingCount === this.fileCount) {
            location.reload()
          }
          this.uploadingCount++
        } else {
          this.toastShow('text', result.message)
        }
      }.bind(this), false)
    },
    uploadData (data) {
      this.post('/rest/userphoto/upload', { image: data }, function (result) {
        if (result.status === 1) {
          if (this.uploadingCount === this.fileCount) {
            location.reload()
          }
          this.uploadingCount++
        } else {
          this.toastShow('text', result.message)
        }
      }.bind(this), false)
    },
    savePhoto () {
      if (this.addPhotos.length > 0) {
        // this.$vux.toast.show({
        //   type: 'text',
        //   text: '1/' + this.addPhotos.length,
        //   time: 10000000,
        //   position: 'middle'
        // })
        let that = this
        this.$vux.confirm.show({
          title: '提示',
          content: this.uploadingCount + '/' + this.addPhotos.length + '照片上传中...',
          confirmText: '取消',
          onConfirm () {
            that.continueUpload = false
          }
        })
        let confirmTime = setTimeout(function () {
          let cancelDisplay = document.querySelector('.weui-dialog__btn_default')
          if (cancelDisplay !== undefined && cancelDisplay.style.display === '') {
            cancelDisplay.style.display = 'none'
            clearTimeout(confirmTime)
          }
        }, 100)
        let i = 0
        for (var image of this.addPhotos) {
          if (this.continueUpload) {
            this.post('/rest/userphoto/upload', { image: image }, function (result) {
              if (result.status === 1) {
                i++
                this.uploadingCount = i
                // document.querySelector('.weui-toast__content').innerHTML = i + '/' + this.addPhotos.length
                if (i === this.addPhotos.length) {
                  location.reload()
                }
              } else {
                this.toastShow('text', result.message)
              }
            }.bind(this))
          } else {
            break
          }
        }
      } else {
        this.toastShow('text', '请选择需要上传的图片')
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../style-router/guest.less";
@import "~vux/src/styles/close.less";
.position-vertical-demo {
  background-color: #ffe26d;
  color: #000;
  text-align: center;
  padding: 15px;
}

.vux-popup-dialog {
  bottom: 100px;
}
</style>
