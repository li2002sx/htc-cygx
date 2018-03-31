// 懒加载
const Index = r => require.ensure([], () => r(require('../frames/Index.vue')), 'Index')
const Reg = r => require.ensure([], () => r(require('../frames/user/Reg.vue')), 'Reg')
const RegSucc = r => require.ensure([], () => r(require('../frames/user/RegSucc.vue')), 'RegSucc')
const FindPass = r => require.ensure([], () => r(require('../frames/user/FindPass')), 'FindPass')
const Login = r => require.ensure([], () => r(require('../frames/user/Login')), 'Login')
const NoLogin = r => require.ensure([], () => r(require('../frames/my/NoLogin')), 'NoLogin')
const MyIndex = r => require.ensure([], () => r(require('../frames/my/Index')), 'MyIndex')
const Vip = r => require.ensure([], () => r(require('../frames/my/Vip')), 'Vip')
const VipSucc = r => require.ensure([], () => r(require('../frames/my/VipSucc')), 'VipSucc')
const MyInfo = r => require.ensure([], () => r(require('../frames/my/Info')), 'MyInfo')
const Search = r => require.ensure([], () => r(require('../frames/car/Search')), 'Search')
const SearchList = r => require.ensure([], () => r(require('../frames/car/SearchList')), 'SearchList')
const CarList = r => require.ensure([], () => r(require('../frames/my/CarList')), 'CarList')
const CarTemplateList = r => require.ensure([], () => r(require('../frames/my/CarTemplateList')), 'CarTemplateList')
const EditUserCar = r => require.ensure([], () => r(require('../frames/my/EditUserCar')), 'EditUserCar')
const PhotoList = r => require.ensure([], () => r(require('../frames/my/PhotoList')), 'PhotoList')
const CarInfo = r => require.ensure([], () => r(require('../frames/my/CarInfo')), 'CarInfo')
const Template = r => require.ensure([], () => r(require('../frames/car/Template')), 'Template')
const AuthNotify = r => require.ensure([], () => r(require('../frames/wx/AuthNotify.vue')), 'AuthNotify')
const TransIndex = r => require.ensure([], () => r(require('../frames/trans/Index.vue')), 'TransIndex')
const TransResult = r => require.ensure([], () => r(require('../frames/trans/Result.vue')), 'TransResult')
const TransTip = r => require.ensure([], () => r(require('../frames/trans/Tip.vue')), 'TransTip')

const PriceIndex = r => require.ensure([], () => r(require('../frames/price/Index.vue')), 'PriceIndex')
const PriceSeries = r => require.ensure([], () => r(require('../frames/price/Series.vue')), 'PriceSeries')
const PriceModels = r => require.ensure([], () => r(require('../frames/price/Models.vue')), 'PriceModels')
const PriceModels = r => require.ensure([], () => r(require('../frames/price/Models.vue')), 'PriceModels')
export default [{
  path: '',
  redirect: '/index'
}, {
  path: '/index',
  component: Index
}, {
  path: '/login',
  component: Login
}, {
  path: '/reg',
  component: Reg
}, {
  path: '/regsucc',
  component: RegSucc
}, {
  path: '/findpass',
  component: FindPass
}, {
  path: '/my',
  component: MyIndex
}, {
  path: '/my/nologin',
  component: NoLogin
}, {
  path: '/my/vip',
  component: Vip
}, {
  path: '/my/vipsucc',
  component: VipSucc
}, {
  path: '/my/info',
  component: MyInfo
}, {
  path: '/my/car',
  component: CarList
}, {
  path: '/my/car/:edit',
  component: CarList
}, {
  path: '/my/templist',
  component: CarTemplateList
}, {
  path: '/my/editcar/:carModelId/:infoId',
  component: EditUserCar
}, {
  path: '/my/carinfo/:carModelId/:infoId',
  component: CarInfo
}, {
  path: '/my/photo',
  component: PhotoList
}, {
  path: '/my/photo/:userId',
  component: PhotoList
}, {
  path: '/car/search',
  component: Search
}, {
  path: '/car/searchlist/:modelsId/:modelsName',
  component: SearchList
}, {
  path: '/car/searchlist/:modelsId',
  component: SearchList
}, {
  path: '/car/template/:carModelId',
  component: Template
}, {
  path: '/car/template/:carModelId/:infoId',
  component: Template
}, {
  path: '/wx/authnotify',
  component: AuthNotify
}, {
  path: '/trans',
  component: TransIndex
}, {
  path: '/trans/result/:fromCityId/:toCityId/:carType/:transportType',
  component: TransResult
}, {
  path: '/trans/tip',
  component: TransTip
}, {
  path: '/price',
  component: PriceIndex
}, {
  path: '/price/series',
  component: PriceSeries
}, {
  path: '/price/models',
  component: PriceModels
}]
