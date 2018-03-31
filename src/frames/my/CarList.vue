<template>
  <section>
    <div v-title data-title="共享车源"></div>

    <!--botbar  -->
    <dl class="mybotbar" v-show="userCarInfos.length > 0">
      <dd>
        <i class="" @click="editInfo" v-if="!edit">编辑</i>
        <i class="" @click="cancelEdit" v-else>取消</i>
      </dd>
      <dd class="tr">
        <i class="false" :class="{del:edit}" @click="deleteInfo">删除</i>
      </dd>
    </dl>
    <!--botbar end  -->

    <!-- <scroller ref="scroller" lock-x scrollbar-y use-pullup :pullup-config="pullupConfig" height="1134px" @on-pullup-loading="getUserCars"> -->
    <div class="list-wrapper" ref="wrapper">
      <!--mybox  -->
      <div class="mysharebox">
        <div class="addbox">
          <!--/my/editcar/0/0-->
          <button class="btnred" @click="addCar">
            <i class="ico-add"></i>添加共享车源</button>
        </div>
        <!--null  -->
        <div class="nullbox" v-if="userCarInfos.length == 0">还没有车源信息~</div>
        <div v-else>

          <div class="sharelist" :class="{edit:edit}">
            <div v-for="(item, index) in userCarInfos">
              <dl @click="select(item)">
                <dd>
                  <img :src="item.carModel.picUrl" />
                </dd>
                <dt class="layout">
                  <h3 class="td">{{item.carModel.modelsName}}</h3>
                  <span class="td tr">{{item.carModel.specName}}</span>
                </dt>
              </dl>
            </div>
          </div>
          <div class="bottom-tip" v-show="hasdata">
            <span class="loading-hook">查看更多</span>
          </div>
        </div>
        <!--null end -->
      </div>
      <!--mybox end  -->
    </div>
    <!-- </scroller> -->
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
      edit: false,
      userCarInfos: [],
      infoIdMap: new Map(),
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
    this.getUserCars()
  },
  computed: {},
  mounted () {
  },
  methods: {
    addCar () {
      let that = this
      this.get('/rest/user/vip', {}, function (result) {
        if (result.status === 1) {
          this.$router.push('/my/editcar/0/0')
        } else {
          this.$vux.confirm.show({
            title: '提示',
            content: result.message,
            confirmText: '去开通',
            onConfirm () {
              that.toUrl('/my/vip')
            }
          })
        }
      }.bind(this))
    },
    select (item) {
      if (!this.edit) {
        // this.$router.push('/car/template/' + item.carModelId + '/' + item.userCarInfoId)
        this.toUrl('/car/template/' + item.carModelId + '/' + item.userCarInfoId)
      } else {
        let userCarInfoId = item.userCarInfoId
        let carModelId = item.carModelId
        if (this.infoIdMap.has(userCarInfoId)) {
          this.infoIdMap.delete(userCarInfoId)
          event.target.className = ''
        } else {
          this.infoIdMap.set(userCarInfoId, carModelId)
          event.target.className = 'on'
        }
      }
    },
    editInfo () {
      this.edit = !this.edit
      // if (this.edit.length === 0) {
      //   this.$router.push('/my/car/eidt')
      // } else {
      //   if (this.infoIdMap.size !== 1) {
      //     this.toastShow('text', '只能选择一个编辑')
      //   } else {
      //     let infoId = [...this.infoIdMap.keys()][0]
      //     this.$router.push('/my/editcar/' + this.infoIdMap.get(infoId) + '/' + infoId)
      //   }
      // }
    },
    cancelEdit () {
      this.edit = !this.edit
    },
    deleteInfo () {
      if (this.infoIdMap.size > 0) {
        let that = this
        this.$vux.confirm.show({
          title: '提示',
          content: '确定要删除吗？',
          confirmText: '删除',
          onConfirm () {
            let param = {
              userCarInfoIds: [...that.infoIdMap.keys()].join(',')
            }
            that.post('/rest/usercar/delete', param, function (result) {
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
                that.edit = !that.edit
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
                that.getUserCars()
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
          // scroll.on('scroll', (pos) => {
          // console.log(pos.x + '~' + pos.y)
          // })
        } else {
          that.scroll.refresh()
        }
      })
    },
    getUserCars () {
      let param = {
        pageIndex: this.pageIndex
      }
      this.get('/rest/usercar/list', param, function (result) {
        if (result.status === 1) {
          for (let item of result.userCarInfos) {
            this.userCarInfos.push(item)
          }
          if (this.pageIndex === 1 && result.userCarInfos.length > 0) {
            this.initScroll()
          }
          this.pageIndex++
          if (result.userCarInfos.length < 25) {
            this.hasdata = false
          } else {
            this.hasdata = true
          }
          // if (result.userCarInfos.length === 0) {
          // this.$nextTick(() => {
          //   this.$refs.scroller.disablePullup()
          // })
          // } else {
          // this.$nextTick(() => {
          //   this.$refs.scroller.donePullup()
          //   this.$refs.scroller.reset()
          // })
          // if (result.userCarInfos.length < 25) {
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
@import "../../style-router/my.less";
</style>
