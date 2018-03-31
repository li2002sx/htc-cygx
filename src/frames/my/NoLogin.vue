<template>
  <section>
    <div v-title data-title="我的VIP会员"></div>
    <footerMenu tab="1"></footerMenu>
    <!--mybox  -->
    <div class="mybox">
      <!--unlogin  -->
      <div class="loginbox">
        <i class="ico-unlogin"></i>
        <h4>请登录</h4>
      </div>
      <!--unlogin end  -->
      <!--usertool  -->
      <div class="usertool">
        <ul class="layout">
          <li class="td" @click="tipLogin">
            <i class="ico-u-car"></i>
            <p>我的共享车源</p>
          </li>
          <li class="td" @click="tipLogin">
            <i class="ico-u-guest"></i>
            <p>我的成交客户</p>
          </li>
          <li class="td" @click="tipLogin">
            <i class="ico-u-vip"></i>
            <p>我的VIP会员</p>
          </li>
        </ul>
      </div>
      <!--usertool end  -->
      <p class="btnbox">
        <button class="btnred" @click="toUrl('/login')">登录</button>
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
    }
  },
  created () {
  },
  computed: {},
  mounted: function () {
  },
  methods: {
    tipLogin () {
      let that = this
      this.$vux.confirm.show({
        title: '提示',
        content: '只有开通会员才可使用此服务',
        confirmText: '去开通',
        onConfirm () {
          that.toUrl('/login')
        }
      })
    }
  }
}
</script>

<style lang="less">
@import "../../style-router/my.less";
</style>
