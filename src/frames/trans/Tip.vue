<template>
  <section>
    <div class="carstype">
      <dl>
        <dd>
          <h4>标准轿车</h4>
          <p>包括大众和通用系列，奔驰E级C级，宝马系列，本田系列，丰田系列，现代和起亚系列等轿车车型。长*宽*高<=5.0*1.85*1.6,重量不超过1.8吨</p>
        </dd>
        <dd>
          <h4>标准SUV</h4>
          <p>包括奥迪Q5,本田CRV,本田缤智，丰田RV4，丰田汉兰达，大众途观，福特翼虎，Jeep指南者，长城H6，沃尔沃XC60等SUV车型。长*宽*高<=4.9*1.9*1.7,重量不超过2吨</p>
        </dd>
        <dd>
          <h4>大型SUV</h4>
          <p>包括宝马X5和X6，奥迪Q7，普拉多，酷路泽，卡宴，奔驰GL系列、ML系列和R系列，别克GL8,奥德赛，塞纳，奔驰威霆，奔驰唯雅诺，捷豹等车型。长*宽*高<=5.6*2.2*2.0,重量不超过2.5吨</p>
        </dd>
      </dl>
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
      searchKey: '',
      hotKeys: [],
      carModels: []
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
@import "../../style-router/search.less";
</style>
