<template>
  <section class="sectionbg">
    <div v-transfer-dom>
      <previewer :list="showList" ref="previewer" :options="options"></previewer>
    </div>
    <div v-title :data-title="title"></div>
    <div class="sharetip" @click="closeshare">
      <div></div>
    </div>
    <div class="featuremod">
      <!-- <div :style="{backgroundImage:'url('+template.bgPicUrl+')'}"></div> -->
      <!-- <div :style="{backgroundImage:'url('+template.bgPicUrl1+')'}"></div> -->
      <div><img :src="template.bgPicUrl" /></div>
      <div><img :src="template.bgPicUrl1" /></div>
      <!-- <div style="background-image:url(http://img5.mtime.cn/mg/2017/08/03/133509.47434915.jpg)"></div>
          <div style="background-image:url(http://img5.mtime.cn/mg/2017/08/03/135659.23967868.jpg)"></div> -->
    </div>
    <!--颜色  -->
    <div class="colormod">
      <div class="btnboxleft" v-if="userCarInfo!=null&&userId==userCarInfo.userId">
        <button class="btnred" @click="toUrl('/my/editcar/'+carModelId+'/'+userCarInfoId)">去编辑</button>
      </div>
      <div class="btnbox">
        <button class="btnred" v-if="userCarInfoId==null" @click="useTemplate()">使用此模板</button>
        <button class="btnred" v-else-if="userCarInfo!=null&&userId==userCarInfo.userId" @click="share">去分享</button>
        <button class="btnred" v-else @click="toUrl('/my/carinfo/'+carModelId+'/'+userCarInfoId)">联系我</button>
      </div>
      <div class="colorlist" v-if="modules.length>0 && modules[0].carModuleInfos!==null">
        <dl class="layout">
          <dd class="td" v-for="(item, index) in modules[0].carModuleInfos">
            <img :src="item.picUrl" />
            <p style="font-size: 26px;">
              <i :style="{backgroundColor:item.color}"></i>{{item.title}}</p>
          </dd>
        </dl>
      </div>
    </div>
    <!--颜色  -->
    <!--图片  -->
    <div class="imgmod">
      <div v-if="modules.length>1 && modules[1].carModuleInfos!==null">
        <h4 :style="{color:modules[1].color,fontSize:modules[1].fontSize+'px'}">{{modules[1].title}}</h4>
        <div class="imgslider">
          <!-- 图片轮播占位 -->
          <swiper loop height="345px" auto dots-position="center" dots-class="imgdot" :show-dots="true">
            <swiper-item class="swiper-demo-img" v-for="(item, index) in modules[1].carModuleInfos" :key="index">
              <img class="previewer-demo-img" :src="item.picUrl" @click="show(index)">
            </swiper-item>
          </swiper>
          <!-- <p class="imgdot"><i class="on"></i></p> -->
        </div>
      </div>
      <div v-if="modules.length>2 && modules[2].carModuleInfos!==null">
        <h4 :style="{color:modules[2].color,fontSize:modules[2].fontSize+'px'}">{{modules[2].title}}</h4>
        <div class="imglist">
          <dl>
            <dt>
              <img v-if="modules[2].carModuleInfos[0].url!=null && modules[2].carModuleInfos[0].url.length > 5" class="previewer-demo-img" :src="modules[2].carModuleInfos[0].picUrl" @click="link(modules[2].carModuleInfos[0].url)" />
              <img v-else class="previewer-demo-img" :src="modules[2].carModuleInfos[0].picUrl" @click="show(modules[1].carModuleInfos.length + 0)" />
            </dt>
            <dd>
              <span>
                <img class="previewer-demo-img" :src="modules[2].carModuleInfos[1].picUrl" @click="show(modules[1].carModuleInfos.length + 1)" />
              </span>
              <span>
                <img class="previewer-demo-img" :src="modules[2].carModuleInfos[2].picUrl" @click="show(modules[1].carModuleInfos.length + 2)" />
              </span>
            </dd>
            <dt>
              <img class="previewer-demo-img" :src="modules[2].carModuleInfos[3].picUrl" @click="show(modules[1].carModuleInfos.length + 3)" />
            </dt>
            <dd>
              <span>
                <img class="previewer-demo-img" :src="modules[2].carModuleInfos[4].picUrl" @click="show(modules[1].carModuleInfos.length + 4)" />
              </span>
              <span>
                <img class="previewer-demo-img" :src="modules[2].carModuleInfos[5].picUrl" @click="show(modules[1].carModuleInfos.length + 5)" />
              </span>
            </dd>
          </dl>
        </div>
      </div>
    </div>
    <!--图片  end  -->
    <!-- link -->
    <div class="linkmod">
      <div v-if="modules.length>3 && modules[3].carModuleInfos!==null">
        <h4 :style="{color:modules[3].color,fontSize:modules[3].fontSize+'px'}">{{modules[3].title}}</h4>
        <div class="linkbox">
          <p v-for="(item, index) in modules[3].carModuleInfos">
            <img class="previewer-demo-img" :src="item.picUrl" @click="show(modules[1].carModuleInfos.length + modules[2].carModuleInfos.length + index)" />
          </p>
        </div>
      </div>
      <div v-if="modules.length > 4 && modules[4].carModuleInfos!==null">
        <h4 :style="{color:modules[4].color,fontSize:modules[4].fontSize+'px'}">{{modules[4].title}}</h4>
        <div class="linkbox">
          <p v-for="(item, index) in modules[4].carModuleInfos">
            <img v-if="item.url!=null && item.url.length > 5" class="previewer-demo-img" :src="item.picUrl" @click="link(item.url)" />
            <img v-else class="previewer-demo-img" :src="item.picUrl" @click="show(modules[1].carModuleInfos.length + modules[2].carModuleInfos.length + modules[3].carModuleInfos.length + index)" />
            <!-- <img :src="item.picUrl" @click="link(item.url)"> -->
          </p>
        </div>
      </div>
    </div>
    <!--link end  -->
  </section>
</template>

<script>
import { cookie, Swiper, SwiperItem, Previewer, TransferDom } from 'vux'
export default {
  directives: {
    TransferDom
  },
  components: {
    cookie,
    Swiper,
    SwiperItem,
    Previewer
  },
  data () {
    return {
      title: '',
      carModelId: this.$route.params.carModelId,
      userCarInfoId: this.$route.params.infoId,
      userId: this.getFieldByUseInfo('userId') || '',
      carModel: {},
      template: {},
      modules: [],
      userCarInfo: {},
      showList: [],
      options: {
        getThumbBoundsFn (index) {
          let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
          let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
          let rect = thumbnail.getBoundingClientRect()
          return { x: rect.left, y: rect.top + pageYScroll, w: rect.width }
        }
      }
    }
  },
  created () {
    this.getTemplateInfo()
  },
  computed: {},
  mounted () {

  },
  methods: {
    show (index) {
      this.$refs.previewer.show(index)
    },
    share () {
      // this.toastShow('text', '请点击右上角去分享')
      document.querySelector('.sharetip').style.display = 'block'
    },
    closeshare () {
      document.querySelector('.sharetip').style.display = 'none'
    },
    shareInfo () {
      let title = this.carModel.modelsName
      let desc = this.userCarInfo === null || this.userCarInfo.configure === null ? title : this.userCarInfo.configure
      let imgUrl = this.carModel.picUrl
      document.title = title
      this.wxShare(title, desc, imgUrl, location.href)
    },
    useTemplate () {
      let that = this
      if (this.isLogin() === true) {
        this.get('/rest/user/vip', {}, function (result) {
          if (result.status === 1) {
            this.$router.push('/my/editcar/' + this.carModelId + '/0')
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
      } else {
        this.$vux.confirm.show({
          title: '提示',
          content: '请您先登录',
          confirmText: '去登陆',
          onConfirm () {
            that.toUrl('/login')
          }
        })
      }
    },
    getTemplateInfo () {
      let param = {
        carModelId: this.carModelId,
        userCarInfoId: this.userCarInfoId
      }
      this.get('/rest/carmodel/info', param, function (result) {
        if (result.status === 1) {
          this.carModel = result.carModel
          this.template = result.carModelTemplate
          this.modules = result.carModelModules
          this.userCarInfo = result.userCarInfo
          this.title = this.carModel.modelsName
          // 分享
          this.shareInfo()
          let param
          for (var i = 1; i < this.modules.length; i++) {
            if (this.modules[i].carModuleInfos !== null) {
              for (let info of this.modules[i].carModuleInfos) {
                param = {
                  src: info.picUrl1.length === 0 ? info.picUrl : info.picUrl1
                }
                this.showList.push(param)
              }
            }
          }
        } else {
          this.toastShow('text', result.message)
        }
      }.bind(this))
    },
    link (url) {
      if (url.indexOf('http') > -1) {
        location.href = url
      } else if (url.length > 0) {
        this.$router.push(url)
      }
    }
  }
}
</script>

<style lang="less">
@import "../../style-router/feature.less";
body {
  background-color: #000;
}

.sectionbg {
  /* background: no-repeat center 0; */
  /* background-size: 100% auto; */
  /* :style="{backgroundImage:'url('+template.bgPicUrl+')'}" */
}
</style>
