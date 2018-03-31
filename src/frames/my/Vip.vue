<template>
  <section>
    <div v-title data-title="我的VIP会员"></div>
    <!-- <footerMenu tab="1"></footerMenu> -->
    <!--vip  -->
    <div class="vipbox">
      <div class="headbg">
        <p v-if="expireTime.length === 0">暂未开通会员服务</p>
        <p v-else>到期时间：{{expireTime}}</p>
      </div>
      <dl class="combolist">
        <dt>
          <h4>套餐选择</h4>
        </dt>
        <dd v-for="(item, index) in products">
          <ul class="layout_vh_c">
            <li class="td">
              <b>{{item.price | amount}}</b>元</li>
            <li class="td">{{item.name}}</li>
            <li class="td">
              <button class="btnred" @click="recharge(item)">立即开通</button>
            </li>
          </ul>
        </dd>
      </dl>
    </div>
    <!--vip end  -->
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
      products: [],
      expireTime: ''
    }
  },
  created () {
    this.getRechargeProduct()
  },
  filters: {
    amount: function (value) {
      return (value / 100).toFixed(0)
    }
  },
  computed: {},
  mounted: function () {
  },
  methods: {
    getRechargeProduct () {
      this.get('/rest/userrecharge/products', {}, function (result) {
        if (result.status === 1) {
          this.products = result.rechargeProductList
          this.expireTime = result.expireTime || ''
        } else {
          this.toastShow('text', result.message)
        }
      }.bind(this))
    },
    recharge (item) {
      if (this.openInWx() === true) {
        let openId = this.getOpenId()
        if (openId.length > 0) {
          let param = {
            productId: item.productId,
            openId: openId
          }
          let that = this
          this.post('/rest/userrecharge/recharge', param, function (result) {
            if (result.status === 1) {
              var rest = result.unifiedOrderResult
              if (rest != null) {
                if (typeof WeixinJSBridge !== 'undefined') {
                  window.WeixinJSBridge.invoke(
                    'getBrandWCPayRequest', {
                      'appId': rest.appId,     // 公众号名称，由商户传入
                      'timeStamp': rest.timeStamp,         // 时间戳，自1970年以来的秒数
                      'nonceStr': rest.nonceStr, // 随机串
                      'package': 'prepay_id=' + rest.prepayId,
                      'signType': rest.signType,         // 微信签名方式：
                      'paySign': rest.sign // 微信签名
                    },
                    function (res) {
                      if (res.err_msg === 'get_brand_wcpay_request:ok') {
                        var pam = {
                          prepayId: rest.prepayId
                        }
                        that.get('/rest/userrecharge/wxorderquery', pam, function (rel) {
                          if (rel != null && rel.status === 1) {
                            that.toUrl('/my/vipsucc')
                          } else {
                            that.toastShow('text', rel.message)
                          }
                        })
                      }// 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                    }
                  )
                }
              }
            } else {
              this.toastShow('text', result.message)
            }
          }.bind(this))
        } else {
          this.toastShow('text', '微信标示为空无法充值')
        }
      } else {
        this.toastShow('text', '充值只能在微信中使用')
      }
    }
  }
}
</script>

<style lang="less">
@import "../../style-router/my.less";
</style>
