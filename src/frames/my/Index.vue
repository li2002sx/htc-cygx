<template>
  <section>
    <div v-title data-title="我的VIP会员"></div>
    <footerMenu tab="1"></footerMenu>
    <!--mybox  -->
    <div class="mybox">
      <router-link to="/my/info" class="ico-modify" title="修改资料"></router-link>
      <!--login  -->
      <div class="loginbox" @click="toUrl('/my/info')">
        <i class="ico-unlogin">
          <img :src="userPic" />
        </i>
        <h4>{{realName}}
          <i class="ico-gold" v-if="vip"></i>
          <i class="ico-silver" v-else></i>
        </h4>
        <p>{{mobile}}</p>
      </div>
      <!--login end  -->
      <!--usertool  -->
      <div class="usertool">
        <ul class="layout">
          <li class="td" @click="toUrl('/my/car')">
            <i class="ico-u-car"></i>
            <p>我的共享车源</p>
          </li>
          <li class="td" @click="toUrl('/my/photo')">
            <i class="ico-u-guest"></i>
            <p>我的成交客户</p>
          </li>
          <li class="td" @click="toUrl('/my/vip')">
            <i class="ico-u-vip"></i>
            <p>我的VIP会员</p>
          </li>
        </ul>
      </div>
      <!--usertool end  -->
      <p class="btnbox">
        <button class="btntintgray" @click="logout">退出登录</button>
      </p>
    </div>
    <!--mybox end  -->
  </section>
</template>

<script>
import { cookie } from 'vux'
import footerMenu from '../../components/Footer.vue'
export default {
  components: {
    cookie,
    footerMenu
  },
  data () {
    return {
      userPic: '',
      realName: '',
      mobile: '',
      vip: false
    }
  },
  created () {
    this.getUserInfo()
  },
  computed: {},
  mounted: function () {
  },
  methods: {
    getUserInfo () {
      this.get('/rest/user/info', {}, function (result) {
        if (result.status === 1) {
          let user = result.user
          this.userPic = this.getPicUrl(user.userPic)
          this.realName = user.realName
          this.mobile = user.mobile
          this.vip = user.vip
        } else {
          this.toastShow('text', result.message)
        }
      }.bind(this))
    },
    logout () {
      this.removeStore(global.userInfo)
      this.toUrl('/index')
    }
  }
}
</script>

<style lang="less">
@import "../../style-router/my.less";
</style>
