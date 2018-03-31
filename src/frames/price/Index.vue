<template>
  <section>
    <div v-title data-title="登录"></div>
    <div id="content">
      <!-- list -->
      <div class="carconfiglist">
          <dl @click="toUrl('/price/series')">
              <dt>标准配置</dt>
              <dd>多功能方向盘</dd>
              <dd>真皮座椅</dd>
              <dd>抬头显示</dd>
              <dd>雷达检测</dd>
              <dd>座椅调节带电动腿托</dd>
              <dd>后排舒适座椅</dd>
          </dl>
      </div>
      <div class="carconfiglist">
          <dl>
              <dt>标准配置</dt>
              <dd>多功能方向盘</dd>
              <dd>真皮座椅</dd>
              <dd>抬头显示</dd>
              <dd>雷达检测</dd>
              <dd>座椅调节带电动腿托</dd>
              <dd>后排舒适座椅</dd>
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
