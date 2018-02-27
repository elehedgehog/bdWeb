<template>
  <div class="storage-info">
    <div class="title">集合</div>
    <table cellspacing="0" cellpadding="0">
      <thead><tr><th v-for="th of thead" :key="th">{{ th }}</th></tr></thead>
      <tbody>
        <tr v-for="(opt, key) in resInfo.storage.collections" :key="key">
          <td v-for="(item, subKey) in opt" :key="subKey">
            {{ item ? (item === true ? '是' : item) : '否' }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      thead: ['集合名称','文档个数','文档平均大小','总大小','索引总大小','数据总大小','存储总大小','是否分片'],
      calulate: ['avgObjectSize','indexSize','dataSize','storageSize','size'],    //需要计算单位
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
  },
}
</script>

<style lang="sass" scoped>
$borderStyle: .01rem solid #eee
.storage-info
  font-size: .16rem
  .title
    padding: .3rem 0 .2rem 15%
  table
    margin-left: 10%
    padding-bottom: .3rem
    width: 80%
    font-size: .14rem
    thead
      th
        line-height: .35rem
        background: #e4e9f2
        border: $borderStyle
        border-left: none
        &:first-child
          border-left: $borderStyle
    tbody
      tr
        td
          text-align: center
          line-height: .35rem
          border-bottom: $borderStyle
          border-left: $borderStyle
          &:last-child
            border-right: $borderStyle
</style>
