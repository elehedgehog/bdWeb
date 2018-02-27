<template>
  <div id="resourceMoni">
    <div class="bg-top"></div>
    <div class="bg-bottom"></div>
    <host-banner v-if="manageMenu"></host-banner>
    <div class="container clearfix">
      <div class="nav">
        <div class="title">设备监控</div>
        <div class="menus">
          <div class="menu" v-for="(opt, key) in manageMenu" :key="key">
            <div class="menu-title" @click="toggleManageMenu(key)">
              {{ menuCn[key] ? menuCn[key] : opt.name }}<em :class="{'select': opt.select}"></em>
            </div>
            <div class="lists" v-if="opt.select">
              <div :class="['list', {'select': item.select}]" 
                  v-for="(item, subKey) in opt.list" :key="subKey"
                  @click="toggleManageList({key, subKey}),initManageHostInfo({ $http, hostId: subKey })">
                {{ item.name }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <info-content v-if="manageSelHostId"></info-content>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import hostBanner from './hostBanner'
import infoContent from './infoContent'

export default {
  components: {
    hostBanner,
    infoContent,
  },

  data() {
    return {
      menuCn: {
        configServers: '配置服务器',
        mongoses: '分片控制器',
        replicaSets: '复制集'
      },
    }
  },

  computed: {
    ...mapGetters([
      'manageMenu',
      'manageSelHostId',
      'bannerNum',
    ])
  },

  mounted() {
    this.initManageMenu(this.$http);
  },

  beforeDestroy() {
    if(window.manageHost) {
      clearInterval(window.manageHost);
      delete window.manageHost;
    }
  },

  methods: {
    ...mapActions([
      'initManageMenu',
      'toggleManageMenu',
      'toggleManageList',
      'initManageHostInfo',
      'toggleBanner',
      'changeBanner',
    ]),
  },
}
</script>

<style lang="sass" scoped>
$borderStyle: .01rem solid #eee
#resourceMoni
  position: relative
  width: 100%
  height: calc(100% - .5rem)
  min-height: 7rem
  background: #f3f7fd
  .bg-top
    width: 100%
    height: 7rem
    background: #03153d
  .bg-bottom
    width: 100%
    height: 7rem
    background: #f3f7fd
  .banner
    position: absolute
    top: .2rem
    left: 50%
    transform: translateX(-50%)
    width: 12rem
    height: 6rem
    background: #081a43
    overflow: hidden
    .ban
      position: absolute
      top: 0
      width: 100%
      height: 100%
      transition: left .3s linear
      &.on
        left: 0
    .fir
      left: -12rem
      background: url(/static/img/resource/banner1.jpg) no-repeat center / 100% 100%
    .sec
      left: 12rem
      background: url(/static/img/resource/banner2.jpg) no-repeat center / 100% 100%
  .banner-btn
    position: absolute
    top: 5.32rem
    width: 1rem
    height: .06rem
    background: #062d63
    cursor: pointer
    &.on
      background: #007ae1
    &.fir
      left: calc(50% - 1.05rem)
    &.sec
      left: calc(50% + .05rem)
  .ban-btn
    position: absolute
    top: 2.4rem
    left: calc(50% - 5.8rem)
    width: .5rem
    height: .5rem
    background: url(/static/img/resource/ziyuan_left.png) no-repeat center / cover
    cursor: pointer
  .ban-next-btn
    left: calc(50% + 5.2rem)
    transform: rotate(180deg)
  .container
    position: absolute
    top: 6.5rem
    left: 50%
    transform: translateX(-50%)
    width: 12rem
    height: 7rem
    min-height: 6.52rem
    background: #fff
    .title
      color: #6d6c6c
      font-size: .16rem
      line-height: .6rem
      text-indent: .3rem
    .nav
      float: left
      width: 2.29rem
      height: 100%
      border-right: $borderStyle
      .menus
        font-size: .16rem
        cursor: pointer
        .menu
          .menu-title
            position: relative
            color: #6c6c6c
            text-indent: .3rem
            line-height: .35rem
            em
              position: absolute
              top: .14rem
              right: .18rem
              display: inline-block
              width: .13rem
              height: .07rem
              background: url(/static/img/dataDeal/shuju_jiantou.png) no-repeat center / cover
              transform: rotate(180deg)
              &.select
                transform: none
          .lists
            .list
              color: #a3a3a3
              text-indent: .3rem
              line-height: .35rem
              &.select,&:hover
                color: #fff
                background: #2a659e
</style>
