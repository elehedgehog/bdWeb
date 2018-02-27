<template>
  <div class="banner">
    <div class="top">
      <div class="mongoses conf-mon normal">
        <div class="logo"></div>
        <div class="name">分片控制器</div>
        <div class="host">
          <em :class="{off: !manageMenu.mongoses.list[0].online}"></em>
          [{{ manageMenu.mongoses.list[0].host }}]
        </div>
      </div>
      <div class="configServers conf-mon normal">
        <div class="logo"></div>
        <div class="name">配置服务器</div>
        <div class="host">
          <em :class="{off: !manageMenu.configServers.list[0].online}"></em>
          [{{ manageMenu.configServers.list[0].host }}]
        </div>
      </div>
    </div>
    <div class="conf-mon-line"></div>
    <div class="straight-line"></div>
    <div class="lists">
      <div class="il-lists clearfix">
        <div class="list normal" 
            v-for="(opt, key) in manageMenu" 
            :key="key" 
            v-if="!exclude.includes(key)">
          <div class="wrap-top">
            <div class="logo"></div>
            <div class="name">{{ opt.name }}</div>
            <div class="host">[{{ opt.list[0].host }}]</div>
          </div>
          <div class="wrap-bottom">
            <div class="hosts-info" 
                v-for="(item, subKey) in opt.list"
                :key="subKey">
              <div class="info-name"><em :class="{off: !item.online}"></em>{{ item.name }}</div>
              <div class="info-host">[{{ item.host }}]</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      exclude: ['mongoses','configServers'],
    }
  },

  mounted() {

  },

  computed: {
    ...mapGetters([
      'manageMenu',
    ])
  },

  methods: {
    ...mapActions([
      //'',
    ]),
  },
}
</script>

<style lang="sass" scoped>
$borderStyle: .01rem solid #203d79
@mixin circle 
  content: ''
  position: absolute
  width: .06rem
  height: .06rem
  border-radius: .03rem
  background: #203d79
@mixin emStyle
  margin: .03rem .05rem 0 .05rem
  display: inline-block
  width: .08rem
  height: .08rem
  border-radius: .04rem
  background: #60c1ae
  &.off
    background: #ff6c5c
.banner
  position: absolute
  top: .2rem
  left: 50%
  transform: translateX(-50%)
  width: 12rem
  height: 5rem
  font-size: .12rem
  background: #081a43
  overflow: hidden
  .normal
    .logo
      margin: 0 auto
      width: .8rem
      height: .8rem
      background-repeat: no-repeat
      background-position: center
      background-size: 100% 100%
    .name
      color: #395793
      font-size: .14rem
      line-height: .32rem
      text-align: center
      font-weight: bold
    .host
      color: #203c7b
      text-align: center
      em
        @include emStyle
  .top
    position: relative
    min-height: 1.8rem
    .conf-mon
      position: absolute
      top: .4rem
      width: 1.6rem
    .mongoses
      left: 3.9rem
      .logo
        background-image: url(/static/img/resource/mongoses.png)
    .configServers
      left: 6.5rem
      .logo
        background-image: url(/static/img/resource/configServers.png)
  .conf-mon-line
    position: relative
    top: 0
    left: 50%
    transform: translateX(-50%)
    width: 2.6rem
    height: .1rem
    border-right: $borderStyle
    border-bottom: $borderStyle
    border-left: $borderStyle
    &:before
      @include circle
      top: -.03rem
      left: -.03rem
    &:after
      @include circle
      top: -.03rem
      right: -.03rem
  .straight-line
    position: relative
    left: 50%
    width: .01rem
    height: .25rem
    background: #203d79
  .lists
    text-align: center
    .il-lists
      display: inline-block
    .list
      float: left
      padding: .2rem 0 0
      text-align: left !important
      border-top: $borderStyle
      &:first-child
        border-top: none !important
        .wrap-top
          &:before
            position: absolute
            content: ''
            top: -.2rem
            left: .675rem
            width: 1.7rem
            height: .01rem
            background: #203d79
      &:last-child
        border-top: none !important
        .wrap-top
          &:before
            position: absolute
            content: ''
            top: -.2rem
            left: 0
            width: .685rem
            height: .01rem
            background: #203d79
      .wrap-top
        position: relative
        width: 1.35rem
        .logo
          position: relative
          width: .7rem !important
          background-image: url(/static/img/resource/replset.png)
          &:after
            content: ''
            position: absolute
            width: .01rem
            height: .1rem
            top: -.19rem
            left: .35rem
            background: #203d79
          &:before
            @include circle
            top: -.1rem
            left: .325rem
      .wrap-bottom
        margin-left: .68rem
        .hosts-info
          padding-top: .13rem
          padding-left: .02rem
          height: .47rem
          border-left: $borderStyle
          .info-name
            position: relative
            color: #395793
            font-size: .14rem
            line-height: .18rem
            em
              margin: 0 .06rem !important
              @include emStyle
            &:after
              position: absolute
              content: ''
              top: .09rem
              left: -.02rem
              width: .07rem
              height: .01rem
              background: #203d79
          .info-host
            color: #203c7b
            text-indent: .2rem
            line-height: .16rem
          &:first-child
            margin-top: .1rem
            padding-top: 0 !important
            height: .6rem
            border-left: none !important
            .info-name
              &:before
                position: absolute
                content: ''
                top: .1rem
                left: -.02rem
                height: .51rem
                width: .01rem
                background: #203d79
          &:last-child
            padding-top: .26rem !important
            height: .34rem !important
            border-left: none !important
            .info-name
              &:before
                position: absolute
                content: ''
                top: -.26rem
                left: -.02rem
                height: .35rem
                width: .01rem
                background: #203d79
</style>
