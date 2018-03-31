<template>
  <section>
    <div v-title data-title="完成注册"></div>
    <!--register  -->
    <div class="regsucbox">
      <div class="regsuc">
        <i class="ico-regisuc"></i>
        <h4>恭喜，注册成功</h4>
      </div>
      <p class="note">完善个人信息，能帮助您提升个人信誉</p>
      <p class="btnbox">
        <button class="btntintgray" @click="toUrl('/index')">去首页看看</button>
        <button class="btnred" @click="toUrl('/my/info')">去完善信息</button>
      </p>
    </div>
    <!--register end  -->
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
@import "../../style-router/login.less";
</style>
