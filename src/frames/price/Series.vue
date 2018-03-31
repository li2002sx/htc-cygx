<template>
  <section>
    <div v-title data-title="登录"></div>
    <div id="content">
      <!-- list -->
      <div class="carseries">
          <dl class="seriesinfo">
              <dd>
                  <span>2018款</span>
                  <span>2017款</span>
                  <span>2016款</span>
              </dd>
              <dd class="">
                  <span>
                      <i>
                          <img src="http://img5.mtime.cn/mg/2018/03/01/113816.73903117_30X30X4.jpg" />
                      </i>欧版</span>
                  <span>
                      <i>
                          <img src="http://img5.mtime.cn/mg/2018/03/01/113816.73903117_30X30X4.jpg" />
                      </i>美版</span>
                  <span>
                      <i>
                          <img src="http://img5.mtime.cn/mg/2018/03/01/113816.73903117_30X30X4.jpg" />
                      </i>加版</span>
                  <span>
                      <i>
                          <img src="http://img5.mtime.cn/mg/2018/03/01/113816.73903117_30X30X4.jpg" />
                      </i>中东</span>
                  <span>
                      <i>
                          <img src="http://img5.mtime.cn/mg/2018/03/01/113816.73903117_30X30X4.jpg" />
                      </i>墨西哥版</span>
              </dd>
          </dl>
      </div>
      <div class="carseries">
          <dl class="typeinfo" @click="toUrl('/price/models')">
              <dt>2018款 宝马X5 3.0T M 运动 大豪华包 Nappa座椅包 动力增强包</dt>
              <dd class="layout">
                  <span class="td">
                      <i>
                          <img src="http://img5.mtime.cn/mg/2018/03/01/113816.73903117_30X30X4.jpg" />
                      </i>墨西哥版</span>
                  <span class="td tr">56.6 - 116万</span>
              </dd>
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
