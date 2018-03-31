<template>
  <section>
    <div class="findtransport">
      <div class="transport">
        <dl>
          <dt class="layout">
            <p class="td" @click="modiAttrPopupPicker('fromCity')">
              <label>始发地</label>
              <span>{{fromCity.name}}</span>
            </p>
            <div class="td">
              <i class="ico-return"></i>
            </div>
            <p class="td" @click="modiAttrPopupPicker('toCity')">
              <label>目的地</label>
              <span>{{toCity.name}}</span>
            </p>
          </dt>
          <dd class="layout" @click="modiAttrPopupPicker('carType')">
            <p class="td">
              <span>车辆类型</span>
            </p>
            <p class="td">
              <span>{{carType.name}}</span>
            </p>
          </dd>
          <dd class="layout" @click="modiAttrPopupPicker('transportType')">
            <p class="td">
              <span>运输型类</span>
            </p>
            <p class="td">
              <span>{{transportType.name}}</span>
            </p>
          </dd>
        </dl>
        <div class="btnbox">
          <button @click="search">
            <i class="ico-zoom"></i>搜索</button>
        </div>
        <ul class="history">
          <li @click="quickSearch(5034,2750)">天津 - 长沙</li>
          <li @click="quickSearch(5034,2958)">天津 - 广州</li>
          <li @click="quickSearch(5034,2959)">天津 - 深圳</li>
        </ul>
      </div>
    </div>
    <group>
      <popup-picker :show="showPopupPicker" :show-cell="false" title="picker" :columns="2" :data="popupPickerData" @on-hide="hidePopupPicker" @on-change="changePopupPicker"></popup-picker>
    </group>
  </section>
</template>

<script>
const selectInit = { name: '请选择', value: 0 }
import { cookie, PopupPicker, Group } from 'vux'
export default {
  components: {
    cookie,
    PopupPicker,
    Group
  },
  data () {
    return {
      showPopupPicker: false,
      popupPickerData: [],
      attr: '',
      fromCity: selectInit,
      toCity: selectInit,
      carType: selectInit,
      transportType: selectInit
    }
  },
  created () {
  },
  computed: {},
  mounted: function () {
  },
  methods: {
    modiAttrPopupPicker (attr) {
      this.popupPickerData = []
      this.attr = attr
      if (this.attr === 'carType' || this.attr === 'transportType') {
        let items = [{ name: '请选择', value: 0 }]
        let param = {
          type: 7
        }
        if (this.attr === 'transportType') {
          param.type = 8
        }
        this.get('/rest/common/categories', param, function (result) {
          if (result.status === 1) {
            for (var key in result.categoryMap) {
              let item = {
                name: result.categoryMap[key],
                value: key
              }
              items.push(item)
            }
            this.popupPickerData.push(items)
          } else {
            this.toastShow('text', result.message)
          }
        }.bind(this))
      } else if (this.attr === 'fromCity' || this.attr === 'toCity') {
        this.get('/rest/common/regions', {}, function (result) {
          if (result.status === 1) {
            this.popupPickerData = result.regions
          } else {
            this.toastShow('text', result.message)
          }
        }.bind(this))
      }
      this.showPopupPicker = true
    },
    changePopupPicker (val) {
      if (this.attr === 'carType' || this.attr === 'transportType') {
        for (var item of this.popupPickerData[0]) {
          if (item.value.toString() === val[0]) {
            if (this.attr === 'carType') {
              this.carType = item
            } else if (this.attr === 'transportType') {
              this.transportType = item
            }
            break
          }
        }
      } else if (this.attr === 'fromCity' || this.attr === 'toCity') {
        // this.province = {}
        this.city = {}
        // let provinceId = val[0]
        let cityId = val[1]
        for (item of this.popupPickerData) {
          if (item.value.toString() === cityId) {
            if (this.attr === 'fromCity') {
              this.fromCity = item
              break
            } else if (this.attr === 'toCity') {
              this.toCity = item
              break
            }
          }
        }
      }
      this.showPopupPicker = false
    },
    hidePopupPicker () {
      this.showPopupPicker = false
    },
    search () {
      let param = {
        fromCityId: this.fromCity.value,
        toCityId: this.toCity.value,
        carType: this.carType.value,
        transportType: this.transportType.value
      }
      if (param.fromCityId === 0 || param.toCityId === 0) {
        this.toastShow('text', '请选择出发城市和到达城市')
        return
      }
      this.toUrl('/trans/result/' + param.fromCityId + '/' + param.toCityId + '/' + param.carType + '/' + param.transportType)
    },
    quickSearch (fromCityId, toCityId) {
      this.toUrl('/trans/result/' + fromCityId + '/' + toCityId + '/0/0')
    }
  }
}
</script>

<style lang="less">
@import "../../style-router/search.less";
</style>
