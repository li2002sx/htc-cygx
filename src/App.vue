<template>
  <div id="app">
    <!--<loading v-model="isLoading"></loading>-->
    <transition name="router-fade" mode="out-in">
      <!-- <transition :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')"> -->
       <router-view></router-view>
      <!-- <keep-alive>
        <router-view></router-view>
      </keep-alive> -->
    </transition>
  </div>
</template>

<script>
import { Loading, TransferDom } from 'vux'
import { mapState } from 'vuex'
export default {
  name: 'app',
  directives: {
    TransferDom
  },
  components: {
    Loading
  },
  computed: {
    ...mapState({
      route: state => state.route,
      path: state => state.route.path,
      isLoading: state => state.isLoading,
      direction: state => state.direction
    })
  }
  // 接着在父组件内
  // watch $route 决定使用哪种过渡
  //    watch: {
  //      '$route' (to, from) {
  //        const toDepth = to.path.split('/').length
  //        const fromDepth = from.path.split('/').length
  //        this.transitionName = toDepth < fromDepth ? 'vux-pop-out' : 'vux-pop-in'
  //      }
  //    }
}

</script>

<style lang="less">
/*@import '~vux/src/styles/reset.less';*/

@import './style-router/public.less';




/*@import './style/style.css';*/


/*body {*/


/*background-color: #fbf9fe;*/


/*}*/


/* .vux-pop-out-enter-active,
.vux-pop-out-leave-active,
.vux-pop-in-enter-active,
.vux-pop-in-leave-active {
  will-change: transform;
  transition: all 500ms;
  height: 100%;
  top: 0px;
  width: 100%;
  position: absolute;
  backface-visibility: hidden;
  perspective: 1000;
}

.vux-pop-out-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

.vux-pop-out-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.vux-pop-in-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.vux-pop-in-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}*/

.router-fade-enter-active,
.router-fade-leave-active {
  transition: opacity .2s;
}

.router-fade-enter,
.router-fade-leave-active {
  opacity: 0;
}
</style>
