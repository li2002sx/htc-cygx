<template>
  <section>
    <div v-title data-title="登录"></div>
    <div class="loginbox">
      <dl>
        <dd>
          <label>手机号</label>
          <input class="inputxt" type="number" placeholder="手机号码" v-model="mobile" />
        </dd>
        <dd>
          <label>密码</label>
          <input class="inputxt" type="password" placeholder="请输入密码" v-model="password" />
        </dd>
        <dt>
          <button class="btnred" @click="login">登录</button>
        </dt>
      </dl>
      <ul class="layout note">
        <li class="tl td">
          <router-link to='/findpass'>忘记密码？</router-link>
        </li>
        <li class="tr td">
          <router-link to='/reg'>新用户，立即注册</router-link>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import { cookie } from 'vux'

export default {
  components: {
    cookie
  },
  data () {
    return {
      mobile: '',
      password: ''
    }
  },
  created () {

  },
  computed: {},
  mounted: function () {
  },
  methods: {
    login: function () {
      let param = {
        mobile: this.mobile.trim(),
        password: this.password.trim()
      }
      if (param.mobile.length === 0 || !this.isMobile(param.mobile)) {
        this.toastShow('text', '手机号码格式不正确')
        return
      }
      if (param.password.length === 0) {
        this.toastShow('text', '密码不能为空')
        return
      }
      this.post('/rest/user/login', param, function (result) {
        if (result.status === 1) {
          let user = result.user
          let userInfo = {
            userId: user.userId,
            token: user.token
          }
          this.setStore(global.userInfo, JSON.stringify(userInfo))
          window.setTimeout(() => {
            this.toastShow('success', '登陆成功')
            this.loginToUrl()
          }, 500)
        } else {
          this.toastShow('text', result.message)
        }
      }.bind(this))
    }
  }
}
</script>

<style lang="less">
@import "../../style-router/login.less";
</style>
