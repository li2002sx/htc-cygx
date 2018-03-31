<template>
  <section>
    <div v-title data-title="共享车源"></div>
    <div class="list-wrapper" ref="wrapper">
      <div class="mysharebox">
        <!--search  -->
        <div :class="[modelsName.length===0?'searchtemp':'searchtop']">
          <div class="searchmod layout" :class="{cur:modelsName.length>0}">
            <div class="td" @click="toUrl('/car/search')">
              <input type="text" placeholder="输入车型名称" v-model="modelsName" disabled="disabled" />
            </div>
            <div class="td">
              <button @click="toUrl('/index')">取消</button>
            </div>
          </div>
        </div>
        <!--search end  -->
        <!--mybox  -->
        <!-- <scroller ref="scroller" lock-x scrollbar-y use-pullup :pullup-config="pullupConfig" height="1234px" @on-pullup-loading="getCarModels"> -->
        <div class="sharelist">
          <dl v-for="(item, index) in carModels">
            <dd @click="toUrl('/car/template/'+item.carModelId)">
              <img :src="item.picUrl" />
            </dd>
            <dt class="layout">
              <h3 class="td">{{item.modelsName}}</h3>
              <span class="td tr">{{item.specName}}</span>
            </dt>
            <dt class="btnbox" v-if="isLogin()">
              <button class="btnred" @click="addCar(item.carModelId)">选用此模板</button>
            </dt>
          </dl>
        </div>
        <!-- </scroller> -->
        <!--mybox end  -->
      </div>
      <div class="bottom-tip" v-show="hasdata">
        <span class="loading-hook">查看更多</span>
      </div>
    </div>
  </section>
</template>

<script>
import { cookie, Scroller, Spinner } from 'vux'
import BScroll from 'better-scroll'

export default {
  components: {
    cookie,
    Scroller,
    Spinner
  },
  data () {
    return {
      carModels: [],
      modelsId: this.$route.params.modelsId || 0,
      modelsName: this.$route.params.modelsName || '',
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
    this.getCarModels()
  },
  computed: {},
  mounted () {
  },
  methods: {
    addCar (carModelId) {
      this.toUrl('/my/editcar/' + carModelId + '/0')
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
    getCarModels (uuid) {
      let param = {
        modelsId: this.modelsId,
        searchKey: this.modelsName,
        pageIndex: this.pageIndex
      }
      this.get('/rest/carmodel/list', param, function (result) {
        if (result.status === 1) {
          if (this.pageIndex === 1 && result.carModelList.length === 0) {
            this.toastShow('text', '未搜索到车型')
          } else {
            for (let item of result.carModelList) {
              this.carModels.push(item)
            }
            if (this.pageIndex === 1 && result.carModelList.length > 0) {
              this.initScroll()
            }
            this.pageIndex++
            if (result.carModelList.length < 25) {
              this.hasdata = false
            } else {
              this.hasdata = true
            }
          }
          // if (result.carModelList.length === 0) {
          // this.$nextTick(() => {
          //   this.$refs.scroller.disablePullup()
          // })
          // if (this.pageIndex === 1) {
          //   this.toastShow('text', '未搜索到车型')
          // }
          // } else {
          // this.$nextTick(() => {
          //   this.$refs.scroller.donePullup()
          //   this.$refs.scroller.reset()
          // })
          // if (result.carModelList.length < 25) {
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
    }
  }
}
</script>

<style lang="less">
@import "../../style-router/search.less";
</style>
