<template>
  <section>
    <dd>
      <label>手机号</label>
      <input class='inputxt' type='number' placeholder='手机号码' v-model='mobile' @keyup="checkMobile" />
    </dd>
    <dd>
      <label>验证码</label>
      <input class='inputxt' type='number' placeholder='请输入验证码' @blur='codeBlur' v-model='code' />
      <button class='btnpure' disabled="disabled" id='btn_code'>{{codeTip}}</button>
    </dd>
  </section>
</template>

<script>
import gt from '../config/gt'
export default {
  props: ['smsType'],
  components: {
    gt
  },
  data () {
    return {
      mobile: '',
      code: '',
      codeTip: '获取验证码',
      time: 60
    }
  },
  created () {
    this.geetest()
  },
  mounted: function () {

  },
  methods: {
    checkMobile () {
      let btnCode = document.getElementById('btn_code')
      if (this.isMobile(this.mobile)) {
        btnCode.removeAttribute('disabled')
        btnCode.className = 'btnpure focus'
      } else {
        btnCode.setAttribute('disabled', 'disabled')
        btnCode.className = 'btnpure'
      }
    },
    setTime () {
      let settime = setInterval(function () {
        let btnCode = document.getElementById('btn_code')
        if (btnCode === null) {
          clearInterval(settime)
        } else {
          if (this.time <= 0) {
            clearInterval(settime)
            btnCode.removeAttribute('disabled')
            this.codeTip = '获取验证码'
            this.time = 60
            return
          } else {
            btnCode.setAttribute('disabled', 'disabled')
          }
          this.time--
          this.codeTip = this.time + 's'
        }
      }.bind(this), 1000)
    },
    geetest: function () {
      if (typeof initGeetest !== 'undefined') {
        this.get('/rest/sms/register2?t=' + (new Date()).getTime(), {}, function (data) {
          // 调用 initGeetest 初始化参数
          // 参数1：配置参数
          // 参数2：回调，回调的第一个参数验证码对象，之后可以使用它调用相应的接口
          window.initGeetest({
            gt: data.gt,
            challenge: data.challenge,
            new_captcha: data.new_captcha, // 用于宕机时表示是新验证码的宕机
            offline: !data.success, // 表示用户后台检测极验服务器是否宕机，一般不需要关注
            product: 'bind', // 产品形式，包括：float，popup
            width: '100%'
            // 更多配置参数请参见：http://www.geetest.com/install/sections/idx-client-sdk.html#config
          }, function (captchaObj) {
            // 省略其他方法的调用
            document.getElementById('btn_code').addEventListener('click', function () {
              if (this.isMobile(this.mobile)) { // 检查是否可以进行提交
                captchaObj.verify()
                var geetestInterval = window.setInterval(function () {
                  var panelNexts = document.querySelectorAll('div.geetest_panel_next')
                  var panelNext = panelNexts[panelNexts.length - 1]
                  if (panelNext && panelNext.innerHTML.length > 0) {
                    let copyrights = document.querySelectorAll('a.geetest_copyright')
                    copyrights[copyrights.length - 1].style.display = 'none'
                    let geetestPanelBoxs = document.querySelectorAll('div.geetest_panel_box')
                    geetestPanelBoxs[geetestPanelBoxs.length - 1].style.width = '500px'
                    geetestPanelBoxs[geetestPanelBoxs.length - 1].style.height = '500px'
                    clearInterval(geetestInterval)
                  }
                }, 100)
              } else {
                this.toastShow('text', '手机号码格式不正确')
              }
            }.bind(this))
            captchaObj.onSuccess(function () {
              // 用户验证成功后，进行实际的提交行为
              let result = captchaObj.getValidate()
              let param = {
                mobile: this.mobile.trim(),
                smsType: this.smsType,
                geetest_challenge: result.geetest_challenge,
                geetest_validate: result.geetest_validate,
                geetest_seccode: result.geetest_seccode
              }
              this.post('/rest/sms/smscode', param, function (result) {
                if (result.status === 1) {
                  this.toastShow('text', '发送成功')
                  this.setTime()
                } else {
                  this.toastShow('text', result.message)
                }
              }.bind(this))
            }.bind(this))
          }.bind(this))
        }.bind(this))
      }
    },
    codeBlur: function () {
      let data = {
        mobile: this.mobile,
        code: this.code
      }
      this.$emit('smsSendData', data)
    }
  }
}
</script>
