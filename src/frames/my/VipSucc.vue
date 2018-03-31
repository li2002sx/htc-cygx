<template>
  <section>
    <div v-title data-title="我的VIP会员"></div>
    <!-- <footerMenu tab="1"></footerMenu> -->
    <!--vip  -->
    <div class="opensucbox">
        <div class="opensuc">
            <i class="ico-regisuc"></i>
            <h4>恭喜，开通成功</h4>
        </div>
        <p class="note">恭喜您，已经成功开启会员服务，快去体验一下吧~</p>
        <p class="btnbox">
            <button class="btntintgray" @click="toUrl('/index')">去首页看看</button>
            <button class="btnred" @click="toUrl('/car/searchlist/0')">去添加共享车源</button>
        </p>
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
    }
  },
  created () {
  },
  computed: {},
  mounted: function () {
  },
  methods: {
    tipLogin () {
      this.$vux.confirm.show({
        title: '提示',
        content: '只有开通会员才可使用此服务',
        confirmText: '去开通',
        onConfirm () {
          this.toUrl('/my/vip')
        }
      }.bind(this))
    }
  }
}
</script>

<style lang="less">
@import "../../style-router/my.less";
</style>
