<template>
  <section>
    <div v-title data-title="个人信息"></div>
    <!-- <footerMenu tab="1"></footerMenu> -->
    <!--userimg  -->
    <div class=" usermod">
      <dl class="layout_vh_c">
        <dd class="td">我的头像</dd>
        <dd class="td">
          <i class="ico-unlogin">
            <img :src="userPic" />
            <input type="file" accept="image/*" @click="selectFile" @change="onFileChange" class="allfile" />
          </i>
        </dd>
      </dl>
    </div>
    <!--userimg end  -->
    <group>
      <popup-picker :show="showPopupPicker" :show-cell="false" title="picker" :columns="2" :data="popupPickerData" @on-hide="hidePopupPicker" @on-change="changePopupPicker"></popup-picker>
    </group>
    <!--name sale  -->
    <div class=" usermod">
      <dl class="layout_vh_c" @click="modiAttr('真实姓名','realName')">
        <dd class="td">真实姓名</dd>
        <dd class="td">
          <template v-if="realName!==''">
            {{realName}}
          </template>
          <template v-else>
            <i>请输入</i>
          </template>
        </dd>
      </dl>
      <dl class="layout_vh_c" @click="modiAttrPopupPicker('sex')">
        <dd class="td">性别</dd>
        <dd class="td">
          <template v-if="sex.name!==undefined">
            {{sex.name}}
          </template>
          <template v-else>
            <i>请选择</i>
          </template>
        </dd>
      </dl>
    </div>
    <!--name sale end  -->
    <!--*  -->
    <div class=" usermod">
      <dl class="layout_vh_c" @click="modiAttrPopupPicker('industry')">
        <dd class="td">行业</dd>
        <dd class="td">
          <template v-if="industry.name!==undefined">
            {{industry.name}}
          </template>
          <template v-else>
            <i>请选择</i>
          </template>
        </dd>
      </dl>
      <dl class="layout_vh_c" @click="modiAttr('公司','company')">
        <dd class="td">公司</dd>
        <dd class="td">
          <template v-if="company!==''">
            {{company}}
          </template>
          <template v-else>
            <i>请输入</i>
          </template>
        </dd>
      </dl>
      <dl class="layout_vh_c" @click="modiAttr('职位','position')">
        <dd class="td">职位</dd>
        <dd class="td">
          <template v-if="position!==''">
            {{position}}
          </template>
          <template v-else>
            <i>请输入</i>
          </template>
        </dd>
      </dl>
    </div>
    <!--* end  -->
    <!--*  -->
    <div class=" usermod">
      <dl class="layout_vh_c" @click="modiAttrPopupPicker('region')">
        <dd class="td">城市</dd>
        <dd class="td">
          <template v-if="province.name!==undefined">
            {{province.name}} {{city.name}}
          </template>
          <template v-else>
            <i>请选择</i>
          </template>
        </dd>
      </dl>
      <dl class="layout_vh_c" @click="modiAttr('详细地址','address')">
        <dd class="td">详细地址</dd>
        <dd class="td">
          <template v-if="address!==''">
            {{address}}
          </template>
          <template v-else>
            <i>请输入</i>
          </template>
        </dd>
      </dl>
    </div>
    <!--* end  -->
    <!--*  -->
    <div class=" usermod">
      <dl class="layout_vh_c">
        <dd class="td">手机号</dd>
        <dd class="td">
          {{mobile}}
        </dd>
      </dl>
      <dl class="layout_vh_c" @click="modiAttr('微信号','wxCode')">
        <dd class="td">微信号</dd>
        <dd class="td">
          <template v-if="wxCode!==''">
            {{wxCode}}
          </template>
          <template v-else>
            <i>请输入</i>
          </template>
        </dd>
      </dl>
    </div>
    <!--* end  -->
    <div class=" usermod">
      <div class="btnbox">
        <button class="btnred" @click="save">保存</button>
        <button class="btnred btncropper" @click="saveCropper" id="btn_cropper" style="display:none">确定</button>
      </div>
    </div>
    <vueCropper ref="cropper" :img="userPic" :outputSize="1" outputType="jpeg" :autoCrop="true" :fixed="true" :canScale="true"></vueCropper>
    <!--mybox end  -->
    <div v-transfer-dom>
      <popup v-model="showTip" position="bottom" :show-mask="false">
        <div class="position-vertical-demo">
          手机拍照图片较大，加载较慢，请耐心等待
        </div>
      </popup>
    </div>
  </section>
</template>

<script>
import { cookie, Group, PopupPicker, TransferDom, Popup } from 'vux'
import footerMenu from '../../components/Footer.vue'
import vueCropper from 'vue-cropper'
import Exif from 'exif-js'
export default {
  directives: {
    TransferDom
  },
  components: {
    cookie,
    Group,
    PopupPicker,
    footerMenu,
    vueCropper,
    Popup
  },
  data () {
    return {
      showPopupPicker: false,
      popupPickerData: [],
      attr: '',
      userPic: '',
      realName: '',
      mobile: '',
      sex: {},
      industry: {},
      company: '',
      position: '',
      province: {},
      city: {},
      address: '',
      wxCode: '',
      sexData: [{ name: '请选择', value: -1 }, { name: '女', value: 0 }, { name: '男', value: 1 }],
      showTip: false
    }
  },
  created () {
    this.getUserInfo()
  },
  computed: {},
  mounted: function () {
    document.querySelector('.vue-cropper').style.display = 'none'
  },
  methods: {
    getUserInfo () {
      this.get('/rest/user/info', {}, function (result) {
        if (result.status === 1) {
          let user = result.user
          this.userPic = this.getPicUrl(user.userPic)
          this.realName = user.realName
          this.mobile = user.mobile

          for (var item of this.sexData) {
            if (item.value === user.sex) {
              this.sex = item
              break
            }
          }
          this.industry = {
            name: user.industryName,
            value: user.industryId
          }

          this.company = user.company
          this.position = user.position
          this.address = user.address
          this.wxCode = user.wxCode
          this.province = {
            name: user.provinceName,
            value: user.provinceId
          }

          this.city = {
            name: user.cityName,
            value: user.cityId
          }
        } else {
          this.toastShow('text', result.message)
        }
      }.bind(this))
    },
    modiAttr (attrName, attr) {
      let that = this
      this.$vux.confirm.prompt('请输入' + attrName, {
        title: attrName,
        onConfirm (msg) {
          Reflect.set(that, attr, msg)
        }
      })
      window.setTimeout(function () {
        document.querySelector('.vux-prompt-msgbox').value = Reflect.get(that, attr)
      }, 100)
    },
    modiAttrPopupPicker (attr) {
      this.popupPickerData = []
      this.attr = attr
      if (this.attr === 'sex') {
        this.popupPickerData.push(this.sexData)
      } else if (this.attr === 'industry') {
        let items = [{ name: '请选择', value: 0 }]
        this.get('/rest/common/categories', { type: 5 }, function (result) {
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
      } else if (this.attr === 'region') {
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
      if (this.attr === 'sex') {
        for (var item of this.sexData) {
          if (item.value.toString() === val[0]) {
            this.sex = item
            break
          }
        }
      } else if (this.attr === 'industry') {
        for (item of this.popupPickerData[0]) {
          if (item.value.toString() === val[0]) {
            this.industry = item
            break
          }
        }
      } else if (this.attr === 'region') {
        this.province = {}
        this.city = {}
        let provinceId = val[0]
        let cityId = val[1]
        for (item of this.popupPickerData) {
          if (item.value.toString() === provinceId) {
            this.province = item
          } else if (item.value.toString() === cityId) {
            this.city = item
          }
          if (this.province.name !== undefined && this.city.name !== undefined) {
            break
          }
        }
      }
      this.showPopupPicker = false
    },
    hidePopupPicker () {
      this.showPopupPicker = false
    },
    save () {
      let param = {
        userPic: this.userPic,
        realName: this.realName,
        sex: this.sex.value,
        industryId: this.industry.value,
        company: this.company,
        position: this.position,
        provinceId: this.province.value,
        cityId: this.city.value,
        address: this.address,
        wxCode: this.wxCode
      }
      this.post('/rest/user/save', param, function (result) {
        if (result.status === 1) {
          this.toastShow('success', '修改成功')
          this.toUrl('/my')
        } else {
          this.toastShow('text', result.message)
        }
      }.bind(this))
    },
    selectFile () {

    },
    onFileChange (e) {
      this.showTip = true
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.createImage(files)
    },
    createImage (file) {
      if (typeof FileReader === 'undefined') {
        this.toastShow('text', '您的浏览器不支持图片上传，请升级您的浏览器')
        return false
      }
      var that = this
      var leng = file.length
      // that.$vux.toast.show({
      //   type: 'text',
      //   text: '请耐心等待图片加载',
      //   time: 1000000,
      //   position: 'middle'
      // })
      let Orientation
      for (var i = 0; i < leng; i++) {
        // 去获取拍照时的信息，解决拍出来的照片旋转问题
        Exif.getData(file[i], function () {
          Orientation = Exif.getTag(this, 'Orientation')
        })

        var reader = new FileReader()
        reader.readAsDataURL(file[i])
        reader.onload = function (e) {
          let result = e.target.result

          // 判断图片是否大于100K,是就直接上传，反之压缩图片
          if (result.length <= (100 * 1024)) {
            that.userPic = result
            that.startCrop()
          } else {
            var img = new Image()
            img.src = result
            img.onload = function () {
              let data = that.compress(img, Orientation)
              that.userPic = data
              that.startCrop()
              // that.$vux.toast.hide()
            }
          }
          // that.userPic = e.target.result
          // that.startCrop()
        }
      }
    },
    startCrop () {
      this.showTip = false
      document.querySelector('.vue-cropper').style.display = ''
      this.$refs.cropper.startCrop()
      document.getElementById('btn_cropper').style.display = ''
    },
    saveCropper () {
      document.querySelector('.vue-cropper').style.display = 'none'
      document.getElementById('btn_cropper').style.display = 'none'
      let that = this
      this.$refs.cropper.getCropData((data) => {
        that.userPic = data
      })
    }
  }
}
</script>

<style lang="less">
@import "../../style-router/userinfo.less";
.btncropper {
  position: fixed;
  left: 20%;
  bottom: 1%;
  z-index: 1;
}

.position-vertical-demo {
  background-color: #ffe26d;
  color: #000;
  text-align: center;
  padding: 15px;
}

.vux-popup-dialog {
  bottom: 100px;
}
</style>
