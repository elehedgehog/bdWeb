<template>
	<div id="programPopup">
		<div class="close" @click="closeProgramPopup">×</div>
		<table cellspacing="0" cellpadding="0">
			<thead><tr><th v-for="th of popupThead" :key="th">{{ th }}</th></tr></thead>
			<tbody>
				<tr v-for="(server, serverKey) in dealEquipInfo[dealProgramKey].tasks" :key="serverKey">
					<td>{{ server.name }}</td>
					<td>
						<div :class="['active', {success: server.action === 'STARTED'}]">
							{{ server.action }}
						</div>
					</td>
					<td>
						<div :class="['btn', 'open-btn', {off: server.action === 'STARTED'}]" 
								:title="server.action === 'STARTED' ? '已启动' : '启动'"
								@click="changeTask({ 
									status: server.action === 'STARTED', 
									url: url.startTaskUrl,
									hostId: dealSelectList, 
									progId: dealProgramKey,
									taskId: serverKey, 
									$http })">
						</div>
						<div :class="['btn', 'stop-btn', {off: server.action !== 'STARTED'}]" 
								:title="server.action !== 'STARTED' ? '已暂停' : '暂停'"
								@click="changeTask({ 
									status: server.action !== 'STARTED', 
									url: url.stopTaskUrl,
									hostId: dealSelectList, 
									progId: dealProgramKey,
									taskId: serverKey, 
									$http })">
						</div>
						<div class="btn restart-btn" title="重启"
								@click="changeTask({ 
									status: false,
									url: url.resetTaskUrl,
									hostId: dealSelectList, 
									progId: dealProgramKey,
									taskId: serverKey, 
									$http })">
						</div>
						<div class="btn close-btn" title="关闭"
								@click="delTask({
									hostId: dealSelectList, 
									progId: dealProgramKey,
									taskId: serverKey, 
									$http })">
						</div>
					</td>
				</tr>
			</tbody>
		</table>
		<div class="workcn">添加新任务</div>
		<div class="work">
			<div class="name clearfix">
				<div class="work-text">任务名称</div>
				<input type="text" v-model="taskName">
			</div>
			<div class="time clearfix">
				<div class="work-text">选择时间</div>
				<input type="text" v-model="begginTime" 
						onClick="WdatePicker({skin:'whyGreen', dateFmt:'yyyy-MM-dd HH:mm:ss'})">
				<div class="calendar-logo"></div>
				<div class="logo"></div>
				<input type="text" v-model="endTime" 
						onClick="WdatePicker({skin:'whyGreen', dateFmt:'yyyy-MM-dd HH:mm:ss'})">
				<div class="calendar-logo"></div>
			</div>
			<!-- <div class="interval">
				<div class="work-text">时间间隔</div>
				<ul class="clearfix">
					<li :class="{on: int.select}" v-for="(int, intKey) in dealProgramInt"
							@click="toggleDealInt(intKey)">{{ int.text }}</li>
				</ul>
			</div> -->
			<div class="add-btn" 
					@click="addTask({ 
						hostId: dealSelectList,
						progId: dealProgramKey,
						name: taskName, 
						begginTime, 
						endTime, 
						intObj: dealProgramInt, 
						$http })">确认添加
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapActions} from 'vuex'
import _url from '../../conf/url'

export default {
  data() {
    return {
    	popupThead: ['处理程序','行为','操作'],	
    	begginTime: null,
    	endTime: null,
    	taskName: null,
    	url: {
    		startTaskUrl: _url.startTaskUrl,
    		stopTaskUrl: _url.stopTaskUrl,
    		resetTaskUrl: _url.resetTaskUrl
    	},
    }
  },

  computed: {
    ...mapGetters([
    	'dealEquipInfo',
    	'dealSelectList',		//主机id
    	'dealProgramKey',		//程序id
    	'dealProgramInt',
		])
	},

  mounted() {
  	this.begginTime = new Date().Format('yyyy-MM-dd HH:mm:ss');
  	let timeStamp = Date.now();
  	timeStamp += 24 * 60 *60 *1000;
  	this.endTime = new Date(timeStamp).Format('yyyy-MM-dd HH:mm:ss');
  },

  methods: {
  	...mapActions([
      'closeProgramPopup',
      'changeTask',
      'delTask',
      'toggleDealInt',
      'addTask',
    ]),
  },
}
</script>

<style lang="sass" scoped>
$borderStyle: 1px solid #eee
#programPopup
	position: absolute
	top: 50%
	left: 50%
	transform: translate(-50%, -50%)
	width: 6rem
	background: #fff
	box-shadow: 0 0 5px -2px #000
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
	table
		margin: .35rem 4% 0
		width: 92%
		font-size: .14rem
		thead
			th
				line-height: .35rem
				background: #e4e9f2
				border: $borderStyle
				&:nth-child(2),&:last-child
					border-left: none
		tbody
			tr	
				td
					line-height: .45rem
					text-align: center
					border-right: $borderStyle
					border-bottom: $borderStyle
					&:first-child
						width: 30%
						border-left: $borderStyle
					&:nth-child(2)
						width: 30%
					&:last-child
						width: 40%
					.active
						margin: 0 auto
						width: 1rem
						height: .28rem
						line-height: .28rem
						background: #ebedf1
						border-radius: .15rem
						&.success
							color: #fff
							background: #5dc2ae
						&.fail
							color: #fff
							background: #ff6c60
					.btn
						margin-left: .2rem
						float: left
						width: .25rem
						height: .25rem
						border-radius: .125rem
						cursor: pointer
						background-repeat: no-repeat
						background-size: cover
						background-position: center
					.open-btn
						margin-left: .3rem !important
						background-color: #5dc2ae
						background-image: url(/static/img/dataDeal/shuju_qidong.png)
						&:hover
							background-color: rgba(93, 194, 174, 0.8)
						&.off
							background-color: #a3a3a3 !important
					.close-btn
						background-color: #ff6c60
						background-image: url(/static/img/dataDeal/shuju_guanbi.png)
						&:hover
							background-color: rgba(255, 108, 96, 0.8)
					.restart-btn
						background-color: #f9d21a
						background-image: url(/static/img/dataDeal/shuju_chongqi.png)
						&:hover
							background-color: rgba(249, 210, 26, 0.8)
					.stop-btn
						position: relative
						background-color: #ea914f
						&:before
							z-index: 1
							content: ''
							position: absolute
							top: .08rem
							left: .08rem
							width: .09rem
							height: .09rem
							background-color: #fff
						&:hover
							background-color: rgba(234, 145, 79, 0.8)
						&.off
							background-color: #a3a3a3 !important
	.workcn
		font-size: .14rem
		line-height: .4rem
		text-indent: .7rem
	.work
		font-size: .14rem
		margin: 0 4% .2rem
		border: $borderStyle
		.name
			margin-top: .07rem
		.work-text
			float: left
			padding: 0 .2rem 0 .3rem
			line-height: .36rem
		input[type="text"]
			float: left
			margin-top: .05rem
			padding: 0 .1rem
			width: 1.5rem
			height: .24rem
			border: $borderStyle
		.time
			.calendar-logo
				margin: .1rem 0 0 -.2rem
				float: left
				width: .16rem
				height: .16rem
				background: url(/static/img/dataDeal/shuju_time.png) no-repeat center / cover
				cursor: pointer
			.logo
				margin: .135rem .1rem 0
				float: left
				width: .26rem
				height: .09rem
				background: url(/static/img/dataDeal/shuju_zhi.png) no-repeat center / cover
		.interval
			margin: .05rem 0 .1rem
			ul
				padding-top: .02rem
				li
					float: left
					width: .6rem
					color: #a3a3a3
					line-height: .3rem
					text-align: center
					cursor: pointer
					border: $borderStyle
					&:nth-child(2)
						border-left: none
						border-right: none
					&.on
						color: #fff
						background: #2a659e
		.add-btn
			margin: .1rem auto .15rem
			width: .9rem
			color: #fff
			line-height: .32rem
			text-align: center
			cursor: pointer
			background: #2a659e 
			&:hover
				background: rgba(42, 101, 158, 0.8)
</style>