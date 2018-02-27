<template>
	<div id="taskRecord">
		<div class="tip" @click="toggleRecordPopup(true)"></div>
		<div class="tip-bar clearfix" v-if="Object.keys(latestFailTask).length">
			<div class="logo"></div>
			<div class="disc">{{ latestFailTask.host }} 主机 {{ latestFailTask.program }} 程序 {{ latestFailTask.task }}&nbsp任务失败！</div> 
			<div class="more" @click="toggleRecordPopup(true)">查看更多</div>
			<div class="close" @click="clearFailTask">×</div>
		</div>
		<div class="popup" v-if="dealRecordPopup">
			<div class="title">历史记录</div>
			<div class="close" @click="toggleRecordPopup(false)">×</div>
			<div class="info">
				<div v-for="(opt, key) in globalTaskRecord" :key="key">
					<div class="head" @click="toggleRecordDay(key)">
						<span>{{ key }}</span>
						<em :class="{off: !opt.select}"></em>
					</div>
					<ul class="cont" v-if="opt.select">
						<li class="clearfix" v-for="item of opt.list" :key="item">
							<div class="time">{{ item.datetime }}</div>
							<div class="detail">
								<em :class="{fail: item.status === 'FAILED'}"></em>
								{{ item.host }} 主机 {{ item.program }} 程序 {{ item.task }} 任务
								<span :class="{fail: item.status === 'FAILED'}">
									{{ item.status === 'SUCCESSED' ? '成功' : '失败'}}
								</span>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapActions} from 'vuex'

export default {
  data() {
    return {

    }
  },

  computed: {
    ...mapGetters([
    	'dealEquipInfo',
    	'dealSelectList',
    	'dealRecordPopup',
    	'latestFailTask',
    	'globalTaskRecord',
		])
	},

  mounted() {
  	this.getTaskRecord(this.$http);
  	this.getTaskRecBefore(this.$http);
  },

  methods: {
  	...mapActions([
      'getTaskRecord',
      'getTaskRecBefore',
      'toggleRecordPopup',
      'clearFailTask',
      'toggleRecordDay',
    ]),
  },

  watch: {
  	
  }
}
</script>

<style lang="sass" scoped>
$borderStyle: 1px solid #eee
#taskRecord
	z-index: 1
	font-size: .12rem
	.tip
		position: absolute
		right: -.5rem
		bottom: .2rem
		width: .4rem
		height: .4rem
		background: #fff url(/static/img/dataDeal/shuju_prompt_un.png) no-repeat center
		box-shadow: 0 0 .1rem -.02rem #999
		cursor: pointer
	.tip-bar
		z-index: 2
		position: absolute
		right: -.5rem
		bottom: .2rem
		min-width: 2.4rem
		height: .4rem
		line-height: .4rem
		color: #a8a8a8
		background: #fff
		box-shadow: 0 0 .1rem -.02rem #999
		.logo
			float: left
			margin: .08rem .1rem 0 .15rem
			width: .24rem
			height: .22rem
			background: url(/static/img/dataDeal/shuju_prompt.png) no-repeat center / cover
		.disc
			float: left
		.more
			float: left
			margin-left: .05rem
			color: #0379d0
			cursor: pointer
			font-weight: bold
		.close
			float: right
			margin: 0 .1rem
			font-size: .30rem
			cursor: pointer
	.popup
		position: absolute
		top: 50%
		left: 50%
		transform: translate(-50%, -50%)
		width: 6rem
		min-height: 2rem
		background: #fff
		box-shadow: 0 0 .05rem -.02rem #000
		.title
			line-height: .4rem
			text-align: center
		.close
			position: absolute
			top: .05rem
			right: 0
			width: .3rem
			height: .3rem
			color: #e4e9f2
			font-size: .30rem
			line-height: .3rem
			text-align: center
			cursor: pointer
			&:hover
				color: #d3d6db
		.info
			padding: 0 .2rem .2rem
			.head
				position: relative
				height: .2rem
				width: 1.15rem
				cursor: pointer
				span
					position: absolute
					top: .03rem
					left: 0
					text-indent: .1rem
					border-left: .02rem solid #2a659e
				em
					position: absolute
					top: .06rem
					left: .9rem
					display: inline-block
					width: .13rem
					height: .07rem
					background: url(/static/img/dataDeal/shuju_jiantou.png) no-repeat center / cover
					&.off
						transform: rotate(180deg)
		.cont
			height: .75rem
			overflow: auto
			&::-webkit-scrollbar
				width: .08rem
			&::-webkit-scrollbar-thumb
				background: #c9ccd1
				border-radius: .04rem
			li
				height: .25rem
				.time
					float: left
					width: .5rem
					text-align: center
					line-height: .25rem
					border-right: .01rem solid #eee
				.detail
					position: relative
					margin-left: .52rem
					height: .25rem
					line-height: .25rem
					text-indent: .4rem
					cursor: pointer
					//&:hover
						//box-shadow: 0 0 .05rem -.02rem #000
					em
						position: absolute
						top: .07rem
						left: .2rem
						display: inline-block
						width: .1rem
						height: .1rem
						border-radius: .05rem
						background: #5dc2ae
						&.fail
							background: #ff6c60
					span
						color: #5dc2ae
						&.fail
							color: #ff6c60
</style>