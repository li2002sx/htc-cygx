<template>
  <section>
    <!--menu  -->
    <dl class="menu">
      <dd :class="{on:tab==0}" @click="toUrl('/index')">
        <i class="ico-home"></i>
      </dd>
      <dd :class="{on:tab==1}" @click="toMy">
        <i class="ico-my"></i>
      </dd>
    </dl>
    <!--menu end  -->
  </section>
</template>

<script>
export default {
  props: ['tab'],
  components: {
  },
  methods: {
    toMy () {
      let userInfo = this.getStore(global.userInfo)
      if (userInfo == null || userInfo === '') {
        this.toUrl('/my/nologin')
      } else {
        this.toUrl('/my')
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
