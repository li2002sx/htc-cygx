<template>
  <section>
    <div class="list-wrapper" ref="wrapper">
      <div class="transportlist">
        <dl>
          <dd v-for="(item, index) in transports">
            <div class="layout">
              <h4 class="td">{{item.fromCityName}} - {{item.toCityName}}</h4>
              <span class="td" @click="toUrl('/trans/tip')">{{item.carTypeName}}</span>
              <span class="td"> 1台</span>
            </div>
            <p>
              <strong>{{item.price}}</strong>
              <i>元</i> （含保险+验车费）</p>
            <a href="javascript:void(0)" @click="tel(item.phone)">拨打电话</a>
          </dd>
        </dl>
      </div>
    </div>
    <div v-transfer-dom>
      <x-dialog v-model="showHideOnBlur" class="dialog-demo" hide-on-blur>
        <div class="img-box">
          <!-- <img src="../assets/demo/dialog/01.jpg" style="max-width:100%"> -->
        </div>
        <div @click="showHideOnBlur=false">
          <span class="vux-close"></span>
        </div>
      </x-dialog>
    </div>
  </section>
</template>

<script>
import { cookie, XDialog, TransferDomDirective as TransferDom } from 'vux'
import BScroll from 'better-scroll'
export default {
  directives: {
    TransferDom
  },
  components: {
    cookie,
    XDialog
  },
  data () {
    return {
      fromCityId: parseInt(this.$route.params.fromCityId) || 0,
      toCityId: parseInt(this.$route.params.toCityId) || 0,
      carType: parseInt(this.$route.params.carType) || 0,
      transportType: parseInt(this.$route.params.transportType) || 0,
      transports: [],
      pageIndex: 1,
      hasdata: false,
      showHideOnBlur: false,
      scroll: null
    }
  },
  created () {
    this.getTransports()
  },
  computed: {},
  mounted: function () {
  },
  methods: {
    tel (phone) {
      window.location.href = 'tel:' + phone
    },
    initScroll () {
      let that = this
      this.$nextTick(() => {
        if (!that.scroll) {
          that.scroll = new BScroll(this.$refs.wrapper, {})
          // 滑动结束
          var bottomTip = document.querySelector('.loading-hook')
          that.scroll.on('touchend', function (position) {
            if (position.y < this.maxScrollY) {
              bottomTip.innerText = '加载中...'
              // 向列表添加数据
              if (that.hasdata) {
                that.getTransports()
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
    getTransports () {
      let param = {
        fromCityId: this.fromCityId,
        toCityId: this.toCityId,
        carType: this.carType,
        transportType: this.transportType,
        pageIndex: this.pageIndex
      }
      this.get('/rest/transport/list', param, function (result) {
        if (result.status === 1) {
          for (let item of result.transportList) {
            this.transports.push(item)
          }
          if (this.pageIndex === 1) {
            if (result.transportList.length > 0) {
              this.initScroll()
            } else {
              this.toastShow('text', '没有找到记录')
            }
          }
          this.pageIndex++
          if (result.transportList.length < 25) {
            this.hasdata = false
          } else {
            this.hasdata = true
          }
        } else {
          this.toastShow('text', result.message)
        }
      }.bind(this))
    }
  }
}
</script>

<style lang="less">
@import "../../style-router/search.less";
</style>
