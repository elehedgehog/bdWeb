<template>
  <div class="run-status">
    <div class="cont clearfix" v-for="(item, key) in resInfo" :key="key" v-if="baseInfo.includes(key)">
      <div class="name"><div class="text">{{ name[key] }}</div></div>
      <div class="val">{{ item }}</div>
      <div class="set" v-if="key === 'name'">设为辅助服务器</div>
    </div>
    <div class="cont clearfix" v-for="(item, key) in resInfo.runtime" :key="key" v-if="progress.includes(key)">
      <div class="name"><div class="text">{{ name[key] }}</div></div>
      <div class="progress">
        <div class="inner">
          <div :class="['bar', key]" :style="{width: item + '%'}"></div>
        </div>
        <span :class="key">{{ item }}%</span>
      </div>
    </div>
    <div class="cont clearfix" v-for="(item, key) in resInfo.runtime.replSet" :key="key" v-if="detInfo.includes(key)">
      <div class="name">
        <div class="text">{{ name[key] }}</div>
        <em @mouseover="toggleTips(key, true)" @mouseout="toggleTips(key, false)" v-if="tips[key]"></em>
        <div class="pos" v-if="tips[key]">
          <div class="tips" v-if="tips[key].show">{{ tips[key].text }}</div>
        </div>
      </div>
      <div class="val">
        {{ time.includes(key) ? new Date(item).Format('yyyy年MM月dd日 HH时mm分ss秒') : item }}
        <span v-if="key === 'uptime'">秒</span>
        <span v-if="key === 'pingMs'">ms</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      tips: {
        health: {
          text: 'replSet的健康值',
          show: false
        },
        optime: {
          text: '最后一个被应用操作的日期',
          show: false
        },
        lastHeartbeat: {
          text: '最后一次发送心跳的日期',
          show: false
        },
        lastHeartbeatRecv: {
          text: '最后一次收到心跳的日期',
          show: false
        }
      },
      name: {
        name: '服务器名',
        host: 'IP地址',
        id: 'ID',
        set: '复制集',
        cpu: 'CPU',
        mem: '内存',
        disk: '磁盘',
        health: '健康值',
        uptime: '运行时间',
        optime: '最后操作时间',
        lastHeartbeat: '发送心跳时间',
        lastHeartbeatRecv: '接收心跳时间',
        pingMs: '延迟',
        syncingTo: '数据源'
      },
      baseInfo: ['id','name','host'],
      progress: ['cpu','mem','disk'],
      detInfo: ['set','health','uptime','optime','lastHeartbeat','lastHeartbeatRecv','pingMs','syncingTo'],
      time: ['optime','lastHeartbeat','lastHeartbeatRecv'],
    }
  },

  mounted() {
    
  },

  computed: {
    ...mapGetters([
      'resInfo',
    ])
  },

  methods: {
    ...mapActions([
      //'',
    ]),
    toggleTips(key, status) {
      this.tips[key].show = status;
    }
  },
}
</script>

<style lang="sass" scoped>
.run-status
  padding-top: .3rem
  font-size: .16rem
  .cont
    line-height: .4rem
    .name
      float: left
      margin-left: 2rem
      min-width: 2rem
      .text
        float: left
      em
        float: left
        display: inline-block
        margin: .13rem 0 0 .1rem
        width: .15rem
        height: .15rem
        background: url(/static/img/resource/ziyuan_wenhao.png)
        cursor: pointer
      .pos
        float: left
        position: relative
        margin-left: .2rem
        .tips
          z-index: 1
          position: absolute
          top: .2rem
          left: 0
          transform: translateY(-50%)
          padding: .1rem
          width: 2rem
          color: #b1b1b1
          line-height: .2rem
          background: #fff
          box-shadow: 0 0 .1rem .04rem #d9d6d6
          &:before
            content: ''
            position: absolute
            top: 50%
            left: -.05rem
            transform: translateY(-50%)
            width: 0
            height: 0
            border-top: .05rem solid transparent
            border-right: .05rem solid #fff
            border-bottom: .05rem solid transparent
    .val
      float: left
      min-width: 3rem
    .progress
      float: left
      min-width: 3rem
      .inner
        float: left
        position: relative
        margin: .15rem .15rem 0 0
        width: 1.6rem
        height: .1rem
        border-radius: .05rem
        background: #e9eef5
        .bar
          position: absolute
          top: 0
          left: 0
          height: 100%
          width: 50%
          border-radius: .05rem
          &.cpu
            background: #f9d21a
          &.mem
            background: #2a659e
          &.disk
            background: #9f86ff
      .cpu
        color: #f9d21a
      .mem
        color: #2a659e
      .disk
        color: #9f86ff
    .set
      float: left
      color: #2a659e
      cursor: pointer
</style>
