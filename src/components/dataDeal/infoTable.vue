<template>
<div class="cont">
	<div class="title">监控结果</div>
	<table cellspacing="0" cellpadding="0">
		<thead>
			<tr>
				<th>#</th>
				<th colspan="3">处理程序</th>
				<th v-for="th of theadText" :key="th">{{ th }}</th>
			</tr>
		</thead>
		<tbody v-for="(info, infoKey) in dealEquipInfo" :key="infoKey">
			<tr v-for="(server, serverKey) in info.tasks" :key="serverKey">
				<td :rowspan="info.taskNum" v-if="serverKey == info.firstTaskKey">{{ infoKey }}</td>
				<td :rowspan="info.taskNum" class="desc" v-if="serverKey == info.firstTaskKey">
					<div class="text">{{ info.name }}</div>
					<em @mouseover="toggleProgTips({key: infoKey, status: true})" 
							@mouseout="toggleProgTips({key: infoKey, status: false})"></em>
					<div class="pos">
	          <div class="tips" v-if="info.descShow">{{ info.desc }}</div>
	        </div>
				</td>
				<td :rowspan="info.taskNum" class="pd" v-if="serverKey == info.firstTaskKey">{{ info.cname }}</td>
				<td :class="['server', 'pd', {notbl: serverKey != info.firstTaskKey}]" 
						@click="openTaskPopup({
							key: infoKey, 
							subKey: serverKey, 
							hostId: dealSelectList, 
							date: new Date().Format('yyyy-MM-dd'),
							$http})">
					{{ server.name.replace(/(^\s*)|(\s*$)/g, "") }}
				</td>
				<td :class="{active: server.status === 'ACTIVE',inactive: server.status === 'INACTIVE',killed: server.status === 'KILLED',finished: server.status === 'FINISHED'}">
					<div>{{ server.status }}</div>
				</td>
				<td>{{ server.lastExecuted ? new Date(server.lastExecuted).Format('yyyy/MM/dd HH:mm:ss') : '' }}</td>
				<td class="opera" :rowspan="info.taskNum" v-if="serverKey == info.firstTaskKey">
					<img src="/static/img/dataDeal/shuju_edit.png" width="16" height="16"
							@click="openProgramPopup({key: infoKey, $http})">
				</td>
				<td>
					<div class="pr clearfix">
						<span>CPU：</span>
						<div class="progress">
							<div class="inline inline-cpu" :style="{width: server.cpu + '%'}"></div>
						</div>
						<span class="cpu-cn">{{ server.cpu }}%</span>
					</div>
					<div class="pr clearfix">
						<span>内存：</span>
						<div class="progress">
							<div class="inline inline-memory" :style="{width: server.memory + '%'}"></div>
						</div>
						<span class="memory-cn">{{ server.mem }}%</span>
					</div>
				</td>
			</tr>
		</tbody>
	</table>
</div>
</template>

<script>
import { mapGetters, mapActions} from 'vuex'

export default {
  data() {
    return {
    	theadText: ['状态','最后执行时间','操作','占用资源'],
    }
  },

  computed: {
    ...mapGetters([
    	'dealEquipInfo',
    	'dealSelectList',
		])
	},

  mounted() {
  	window.dealInfo = setInterval(() => {
  		this.initDealInfo({ $http: this.$http, key: this.dealSelectList });
  	} ,1000);
  	
  	/*		//未测试
  	this.initDealInfo({ $http: this.$http, key: this.dealSelectList });
  	setTimeout(() => {
  		window.dealInfo = setInterval(() => {
  			this.initDealReal({ $http: this.$http, key: this.dealSelectList });
  		} ,1000);
  	}, 1000);
  	*/
  	
  },

  methods: {
  	...mapActions([
  		'initDealInfo',
  		'initDealReal',
  		'toggleProgTips',
      'openTaskPopup',
      'openProgramPopup',
    ]),
  },
}
</script>

<style lang="sass" scoped>
$borderStyle: 1px solid #eee
.title
	color: #6d6c6c
	font-size: .16rem
	line-height: .6rem
	text-indent: .3rem
.cont
	float: left
	width: 9.7rem
	height: 100%
	overflow-y: auto
	&::-webkit-scrollbar
		width: .08rem
	&::-webkit-scrollbar-thumb
		background: #c9ccd1
		border-radius: .04rem
	table
		margin-left: .3rem
		padding-bottom: .3rem
		width: 9.1rem
		font-size: .12rem
		text-align: center
		thead
			th
				line-height: .4rem
				border-top: $borderStyle
				border-right: $borderStyle
				border-bottom: $borderStyle
				&:first-child
					width: 5%
					border-left: $borderStyle
				&:nth-child(2)
					width: 36%
				&:nth-child(3)
					width: 9%
				&:nth-child(4)
					width: 15%
				&:nth-child(5)
					width: 5%
				&:last-child
					width: 30%
		tbody
			tr
				td
					line-height: .4rem
					border-right: $borderStyle
					border-bottom: $borderStyle
					&:first-child
						border-left: $borderStyle
					&.desc
						.text
							float: left
							margin-left: .1rem
						em
							float: left
							display: inline-block
							margin: .125rem 0 0 .05rem
							width: .15rem
							height: .15rem
							background: url(/static/img/resource/ziyuan_wenhao.png)
							cursor: pointer
						.pos
			        float: left
			        position: relative
			        margin-left: .15rem
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
					&.pd
						padding: 0 .1rem
					&.server
						color: #007ae1
						cursor: pointer
						text-decoration: underline
					&.notbl
						border-left: none !important
					&.active
						color: #5dc2ae
					&.inactive
						color: rgb(183, 183, 183)
					&.killed
						color: #ff6c60
					&.finished
						color: #f9d21a
					&.opera
						img
							margin-top: .15rem
							cursor: pointer
					.pr
						line-height: .25rem
						padding-left: .1rem
						span
							float: left
							&.memory-cn
								color: #2a659e
							&.cpu-cn
								color: #f9d21a
						.progress
							margin: .075rem .2rem 0
							position: relative
							float: left
							width: 1.2rem
							height: .1rem
							border-radius: .05rem
							background: #e9eef5
							.inline
								position: absolute
								top: 0
								left: 0
								height: .1rem
								border-radius: .05rem
							.inline-memory
								background: #2a659e
							.inline-cpu
								background: #f9d21a
</style>