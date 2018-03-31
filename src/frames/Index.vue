<template>
  <section>
    <div v-title data-title="共享车源"></div>
    <footerMenu tab="0"></footerMenu>
    <div class="list-wrapper-index" ref="wrapper">
      <div>
        <!--search  -->
        <div class="searchbox">
          <div class="searchmod" @click="toUrl('/car/search')">
            <input type="text" placeholder="搜索车型" disabled="disabled" />
          </div>
        </div>
        <!--search end  -->
        <!-- list  -->
        <div class="brandlist">
            <dt>热门品牌</dt>
            <dl>
                <dd v-for="(item, index) in brandNames" @click="toUrl('/car/searchlist/0/' + encodeURI(item))">
                    <img :src="index | classIcon" :alt="item" />
                    <h4>{{item}}</h4>
                </dd>
            </dl>
        </div>
        <!-- list end -->
        <!--mybox  -->
        <div class="indexbox">
          <div class="sharelist">
            <dl v-for="(item, index) in carModels" @click="toUrl('/car/template/'+item.carModelId)">
              <dd>
                <img :src="item.picUrl" />
              </dd>
              <dt class="layout">
                <h3 class="td">{{item.modelsName}}</h3>
                <span class="td tr">{{item.specName}}</span>
              </dt>
            </dl>
          </div>
        </div>
        <!--mybox end  -->
        <div class="bottom-tip" v-show="hasdata">
          <span class="loading-hook">加载中...</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { cookie, Spinner, numberPad } from 'vux'
import BScroll from 'better-scroll'
import footerMenu from '../components/Footer.vue'

export default {
  components: {
    cookie,
    footerMenu,
    Spinner
  },
  data () {
    return {
      brandNames: ['奔驰', '宝马', '路虎', '丰田', '日产', '福特', '保时捷', '玛莎拉蒂', '奥迪', 'GMC'],
      carModels: [],
      pageIndex: 1,
      hasdata: false,
      pullupStatus: 'default',
      pullupConfig: {
        content: '上拉加载更多',
        downContent: '松开进行加载',
        upContent: '上拉加载更多',
        loadingContent: '努力加载中...'
      },
      scroll: null
    }
  },
  created () {
    this.wxAuth()
    this.getCarModels()
  },
  filters: {
    classIcon: function (value) {
      return '/static/images/icon/i-car' + numberPad(value + 1) + '.jpg'
    }
  },
  computed: {
  },
  mounted () {

  },
  activated () {
    // this.$refs.scroller.reset()
  },
  methods: {
    loadImage () {
      // this.scroll.refresh()
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
                that.getCarModels()
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
    getCarModels () {
      let that = this
      this.get('/rest/carmodel/list', { pageIndex: this.pageIndex }, function (result) {
        if (result.status === 1) {
          for (let item of result.carModelList) {
            that.carModels.push(item)
          }
          if (that.pageIndex === 1 && result.carModelList.length > 0) {
            that.initScroll()
          }
          that.pageIndex++
          if (result.carModelList.length < 25) {
            that.hasdata = false
          } else {
            that.hasdata = true
          }
        } else {
          that.toastShow('text', result.message)
        }
      })
    }
  }
}
</script>

<style lang="less">
@import "../style-router/index.less";
</style>
