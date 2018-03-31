<template>
  <section>
    <div v-title data-title="登录"></div>
    <div id="content">
      <!-- list -->
      <div class="cartypeinfo">
          <dl class="typeinfo">
              <dt>2018款 宝马X5 3.0T M 运动 大豪华包 Nappa座椅包 动力增强包</dt>
              <dd class="layout">
                  <span class="td">
                      <i>
                          <img src="http://img5.mtime.cn/mg/2018/03/01/113816.73903117_30X30X4.jpg" />
                      </i>墨西哥版</span>
                  <span class="td tr">56.6 - 116万</span>
              </dd>
          </dl>
      </div>
      <div class="cartypeinfo">
          <dl class="typeconfig">
              <dd>
                  <i class="ico-config"></i>
                  车型配置
              </dd>
          </dl>

      </div>
      <div class="cartypeinfo">
          <div class="typetit">
              <span>更多</span>
              <h4>找销售</h4>
          </div>
          <dl class="typeseller">
              <dd>
                  <div class="saller">
                      <img src="http://img5.mtime.cn/mg/2018/03/01/113816.73903117_112X112X4.jpg" />
                      <h3>付永帅</h3>
                      <p class="company">车多多(天津)网络科技有限公司-总经理
                          <i class="ico-vip"></i>
                          <i class="ico-crown"></i>
                      </p>
                      <p class="target">
                          <i>平行进口车</i>
                      </p>
                  </div>
              </dd>
              <dd>
                  <div class="saller">
                      <img src="http://img5.mtime.cn/mg/2018/03/01/113816.73903117_112X112X4.jpg" />
                      <h3>付永帅</h3>
                      <p class="company">车多多(天津)网络科技有限公司-总经理
                          <i class="ico-vip"></i>
                          <i class="ico-crown"></i>
                      </p>
                      <p class="target">
                          <i>平行进口车</i>
                      </p>
                  </div>
              </dd>
          </dl>
      </div>
      <p class="addcartypeseller">+&nbsp;&nbsp;我要加入</p>
      <!-- list end -->
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
  }
}
</script>

<style lang="less">
@import "../../style-router/userinfo.less";
</style>
