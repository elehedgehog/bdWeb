<template>
  <div class="conf-manage">
    <div class="cont clearfix" v-for="(item, key) in resInfo.config.replSet" :key="key">
      <div class="name">
        <div class="text">{{ conf[key].name }}</div>
        <em @mouseover="toggleTips(key, true)" @mouseout="toggleTips(key, false)"></em>
        <div class="pos">
          <div class="tips" v-if="conf[key].tips">{{ conf[key].desc }}</div>
        </div>
      </div>
      <div class="val" v-if="!exclude.includes(key)">{{ item ? (item === true ? '是' : item) : '否' }}</div>
      <div class="val" v-if="key === 'votes'"><input type="text" :value="item"></div>
      <div class="val clearfix" v-if="key === 'tags'">
        <div class="tag" v-for="(opt, subKey) in item" :key="subKey">{{ opt }}<div class="close">×</div></div>
        <div class="add">＋</div>
      </div>
      <div class="modify">修改</div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      conf: {
				priority: {
          name: '选举权重',
          desc: '该元素代表在选举新的服务器时，分配给该服务器的权重。如果主服务器不可用，那么复制集将根据该值从服务器中选举出新的主服务器。任何含有非0值的辅助服务器将被认为是活跃的，也是可用的服务器。因此，将该值设置为0将强制辅助服务器变为被动模式。如果多个辅助服务器的优先级相同，那就需要进行投票，还可以调用仲裁服务器（如果已配置的话）解决任何死锁。该元素的默认值是1.0',
          tips: false
        },
	      votes: {
          name: '可投票数',
          desc: '该元素指定当前实例在选举主服务器时可投的票数；该元素的默认值为1',
          tips: false
        },
	      hidden: {
          name: '是否隐藏',
          desc: '该元素将从db.isMaster()的输出中隐藏该节点，从而阻止在该节点上发生读取操作，即使设置了辅助服务器读取偏好也不可以',
          tips: false
        },
	      tags: {
          name: '标签',
          desc: '通过该选项可以设置服务器标签读取偏好中的标签',
          tips: false
        },
	      slaveDelay: {
          name: '同步延迟',
          desc: '通过该选项可以设置辅助服务器落后于主服务器的延迟时间',
          tips: false
        },
	      arbiterOnly: {
          name: '禁止构建索引',
          desc: '该选项用于禁止索引构建。永远也不应该在可能成为主服务器的节点上设置该选项。该功能对于备份节点，或者在索引不重要并且希望节省空间的情况下非常有用',
          tips: false
        }
      },
      exclude: ['votes','tags'],
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
      this.conf[key].tips = status;
    }
  },
}
</script>

<style lang="sass" scoped>
.conf-manage
  padding-top: .35rem
  font-size: .16rem
  .cont
    line-height: .5rem
    .name
      float: left
      margin-left: 2rem
      min-width: 2rem
      .text
        float: left
      em
        float: left
        display: inline-block
        margin: .18rem 0 0 .1rem
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
          width: 3.5rem
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
      min-width: 2.4rem
      input[type='text']
        width: .6rem
        height: .28rem
        padding: 0 .1rem
        border: .01rem solid #ccc
      .tag
        float: left
        position: relative
        margin: .1rem .1rem 0 0
        padding: 0 .13rem
        line-height: .3rem
        font-size: .14rem
        background: #ebedf1 
        border-radius: .2rem
        .close
          position: absolute
          top: -.06rem
          right: -.06rem
          width: .18rem
          line-height: .18rem
          border-radius: .09rem 
          font-size: .2rem
          text-align: center
          color: #fff
          background: #ff6766
          cursor: pointer
          &:hover
            background: rgba(255, 103, 102, 0.8)
      .add
        float: left
        margin-top: .15rem
        line-height: .2rem
        color: #fff
        font-size: .2rem
        border-radius: .1rem 
        background: #b9c9e3
        cursor: pointer
        &:hover
          background: rgba(185, 201, 227, 0.8)
    .modify
      float: left
      color: #2a659e
      cursor: pointer
</style>
