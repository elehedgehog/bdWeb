<template>
  <div class="info-content">
    <div class="head">
      <ul class="clearfix">
        <li :class="{on: opt.select}" v-for="(opt, key) in nav" @click="toggleNav(key)" :key="key">
          {{ opt.text }}
        </li>
      </ul>
      <div class="line" :style="{left: lineLeft}"></div>
    </div>
    <div class="cont">
      <run-status v-if="nav.status.select"></run-status>
      <storage-info v-if="nav.info.select"></storage-info>
      <conf-manage v-if="nav.manage.select"></conf-manage>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import runStatus from './runStatus'
import storageInfo from './storageInfo'
import confManage from './confManage'

export default {
  components: {
    runStatus,
    storageInfo,
    confManage
  },

  data() {
    return {
      nav: {
        status: {
          text: '运行状态',
          select: true,
          left: '.2rem'
        },
        info: {
          text: '存储信息',
          select: false,
          left: '1.4rem'
        },
        manage: {
          text: '配置管理',
          select: false,
          left: '2.6rem'
        }
      },
      lineLeft: '.2rem',
    }
  },

  computed: {
    ...mapGetters([
      'manageSelHostId',
    ])
  },

  mounted() {
    this.initManageHostInfo({ $http: this.$http, hostId: this.manageSelHostId });
  },
      

  methods: {
    ...mapActions([
      'initManageHostInfo',
    ]),
    toggleNav(key) {
      const nav = this.nav;
      for(let i in nav) {
        nav[i].select = i === key;
      }
      this.lineLeft = nav[key].left;
    },
  },
}
</script>

<style lang="sass" scoped>
$borderStyle: 1px solid #eee
.info-content
  float: left
  width: 9.7rem
  height: 100%
  overflow-y: auto
  &::-webkit-scrollbar
    width: .08rem
  &::-webkit-scrollbar-thumb
    background: #c9ccd1
    border-radius: .04rem
  .head
    position: relative
    font-size: .16rem
    border-bottom: .01rem solid #eee
    ul
      li
        float: left
        width: 1.2rem
        text-align: center
        line-height: .5rem
        cursor: pointer
        &.on
          color: #007ae1
    .line
      position: absolute
      bottom: 0
      left: 0
      width: .8rem
      height: .02rem
      background: #007ae1
      transition: left .3s linear
  .cont
    min-height: calc(100% - .51rem)
</style>
