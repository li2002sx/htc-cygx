<template>
  <section>
    <div v-title data-title="联系我"></div>
    <!--userinfo  -->
    <div class="userinfobox">
      <dl class="userinfo">
        <dd class="layout">
          <div class="td">
            <i class="ico-unlogin">
              <img :src="user.userPic" />
            </i>
          </div>
          <div class="td">
            <h4>{{user.realName}}
              <i class="ico-gold" v-if="user.vip"></i>
              <i class="ico-silver" v-else></i>
            </h4>
            <p>{{user.company}}-{{user.position}}</p>
            <p>
              <em class="tag">{{user.industryName}}</em>
            </p>
          </div>
        </dd>
        <dd class="layout">
          <label class="td">电话：</label>
          <div>{{user.mobile}}</div>
        </dd>
        <dd class="layout">
          <label class="td">微信：</label>
          <div>{{user.wxCode}}</div>
        </dd>
        <dd class="layout">
          <label class="td">地址：</label>
          <div>{{user.provinceName}} {{user.cityName}} {{user.address}}</div>
        </dd>
      </dl>
    </div>
    <!--userinfo end  -->
    <!--car info  -->
    <div class="userinfobox">
      <dl class="carinfo">
        <dd>
          <label>车型</label>
          <p>{{carModel.modelsName}}</p>
        </dd>
        <dd>
          <ul class="layout">
            <li class="td">
              <label>价格（万元）</label>
              <p>{{userCarInfo.price}}</p>
            </li>
            <li class="td">
              <label>规格</label>
              <p>{{carModel.specName}}</p>
            </li>
            <li class="td">
              <label>车架号</label>
              <p>{{userCarInfo.frame}}</p>
            </li>
          </ul>
        </dd>
        <dd>
          <label>配置</label>
          <p>{{userCarInfo.configure}}</p>
        </dd>
        <dd>
          <label>备注</label>
          <p>{{userCarInfo.remark}}</p>
        </dd>

      </dl>
    </div>
    <!--car info  -->
    <!--car info  -->
    <div class="userinfobox" @click="toUrl('/my/photo/'+user.userId)">
      <h4 class="guesttitle">成交客户</h4>
      <dl class="layout guestinfo">
        <dd class="td" v-for="(item, index) in userPhotos">
          <img :src="item.thumbPicUrl" />
        </dd>
      </dl>
    </div>
    <!--car info  -->
    <div class=" usermod">
      <div class="btnbox">
        <a href="javascript:void(0)" @click="tel" class="btnred">拨打电话</a>
      </div>
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
      carModelId: this.$route.params.carModelId,
      userCarInfoId: this.$route.params.infoId,
      carModel: {},
      userCarInfo: {},
      user: {},
      userPhotos: []
    }
  },
  created () {
    this.getUserCarInfo()
  },
  computed: {},
  mounted: function () {
  },
  methods: {
    tel () {
      window.location.href = 'tel:' + this.user.mobile
    },
    getUserCarInfo () {
      let param = {
        carModelId: this.carModelId,
        userCarInfoId: this.userCarInfoId
      }
      this.get('/rest/usercar/info', param, function (result) {
        if (result.status === 1) {
          this.carModel = result.carModel
          this.userCarInfo = result.userCarInfo
          this.user = result.user
          this.userPhotos = result.userPhotos
        } else {
          this.toastShow('text', result.message)
        }
      }.bind(this))
    }
  }
}
</script>

<style lang="less">
@import "../../style-router/userinfo.less";
</style>
