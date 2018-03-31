<template>
  <section>
    <!--search  -->
    <div class="searchtop">
      <div class="searchmod layout">
        <div class="td">
          <input type="text" placeholder="输入车型名称" @keyup="searchByKey" v-model="searchKey" @focus="cursor(1)" @blur="cursor(0)"/>
        </div>
        <div class="td">
          <button @click="search">搜索</button>
        </div>
      </div>
    </div>
    <!--搜索历史  -->
    <div class="kwbox">
      <dl>
        <dt>
          <h4>热门搜索</h4>
          <!-- <i class="ref">换一批</i> -->
        </dt>
        <dd>
          <em class="kwtag" v-for="(item, index) in hotKeys" @click="toUrl('/car/searchlist/0/' + encodeURI(item))">{{item}}</em>
        </dd>
      </dl>
    </div>
    <!--搜索历史 end  -->
    <!--search end  -->
    <!--kw list  -->
    <dl class="kwlist" v-for="(item, index) in carModels">
      <dd @click="searchList(item.modelsId,item.modelsName)">{{item.modelsName}}</dd>
    </dl>
    <!--kw list end  -->
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
    this.getHotKeys()
  },
  computed: {},
  mounted: function () {
  },
  methods: {
    cursor (value) {
      let target = event.target.parentNode.parentNode
      if (value === 1) {
        target.className = 'searchmod layout cur'
      } else {
        target.className = 'searchmod layout'
      }
    },
    search () {
      if (this.searchKey.length > 0) {
        this.toUrl('/car/searchlist/0/' + encodeURI(this.searchKey))
      } else {
        this.toastShow('text', '关键字不能为空')
      }
    },
    getHotKeys () {
      this.get('/rest/common/categories', { type: 6 }, function (result) {
        if (result.status === 1) {
          for (var key in result.categoryMap) {
            this.hotKeys.push(result.categoryMap[key])
          }
        } else {
          this.toastShow('text', result.message)
        }
      }.bind(this))
    },
    searchList (value, name) {
      this.toUrl('/car/searchlist/' + value + '/' + encodeURI(name))
    },
    searchByKey () {
      document.querySelector('.kwbox').style.display = 'none'
      this.getCarModels()
    },
    getCarModels () {
      let param = {
        searchKey: this.searchKey,
        pageIndex: 1
      }
      if (param.searchKey.length > 0) {
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
}
</script>

<style lang="less">
@import "../../style-router/search.less";
</style>
