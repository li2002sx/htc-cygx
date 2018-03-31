<template>
  <section>
    <div v-title data-title="选择模板"></div>
    <!--mybox  -->
    <div class="mysharebox">
      <div class="searchtemp">
        <div class="searchmod cur">
          <input type="text" placeholder="搜索车型" v-model="searchKey" />
        </div>
      </div>
      <!--addinfo  -->
      <div class="sharelist">
        <dl v-for="(item, index) in carModels">
          <dd @click="toUrl('/car/template/'+item.carModelId)">
            <img :src="item.picUrl" />
          </dd>
          <dt class="layout">
            <h3 class="td">{{item.modelsName}}</h3>
            <span class="td tr">{{item.specName}}</span>
          </dt>
          <dt class="btnbox">
            <button class="btnred" @click="addCar(item.carModelId)">选用此模板</button>
          </dt>
        </dl>
      </div>
      <!--addinfo end  -->
    </div>
    <!--mybox end  -->
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
      carModels: [],
      searchKey: ''
    }
  },
  created () {
    this.getCarModels()
  },
  computed: {},
  mounted () {
  },
  methods: {
    addCar (carModelId) {
      this.toUrl('/my/editcar/' + carModelId + '/0')
    },
    getCarModels () {
      let param = {
        searchKey: this.searchKey,
        pageIndex: 1
      }
      this.get('/rest/carmodel/list', param, function (result) {
        if (result.status === 1) {
          this.carModels = result.carModelList
        } else {
          this.toastShow('text', result.message)
        }
      }.bind(this))
    }
  }
}
</script>

<style lang="less">
@import "../../style-router/my.less";
</style>
