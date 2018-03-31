<template>
  <section>
    <div v-title data-title="找回密码"></div>
    <!--register  -->
    <div class='registerbox'>
      <dl>
        <smsSend smsType="10002" @smsSendData="getSmsSendData"></smsSend>
        <dd>
          <label>密码</label>
          <input class='inputxt' type='password' placeholder='请输入密码' v-model='password' />
        </dd>
        <dt>
          <button class='btnred' @click='findPass'>确认</button>
        </dt>
      </dl>
    </div>
    <!--register end  -->
  </section>
</template>

<script>
import { cookie } from 'vux'
import smsSend from '../../components/SmsSend'
export default {
  components: {
    cookie,
    smsSend
  },
  data () {
    return {
      mobile: '',
      code: '',
      password: ''
    }
  },
  computed: {},
  mounted: function () {
  },
  methods: {
    getSmsSendData: function (data) {
      if (data != null) {
        this.mobile = data.mobile
        this.code = data.code
      }
    },
    findPass: function () {
      let param = {
        mobile: this.mobile.trim(),
        code: this.code.trim(),
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
      this.post('/rest/user/findpass', param, function (result) {
        if (result.status === 1) {
          let user = result.user
          let userInfo = {
            userId: user.userId,
            token: user.token
          }
          this.setStore(global.userInfo, JSON.stringify(userInfo))
          window.setTimeout(() => {
            this.toastShow('success', '设置成功')
            this.toUrl('/index')
          }, 500)
        } else {
          this.toastShow('text', result.msg)
        }
      }.bind(this))
    }
  }
}
</script>

<style lang="less">
@import '../../style-router/login.less';
</style>
