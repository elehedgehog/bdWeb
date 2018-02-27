<template>
	<div id="serverPopup">
		<div class="close" @click="closeTaskPopup">×</div>
		<table cellspacing="0" cellpadding="0">
			<thead><tr><th v-for="th of popupThead" :key="th">{{ th }}</th></tr></thead>
			<tbody>
				<tr class="deal">
					<td>{{ info.name }}</td>
					<td>
						<div :class="['active', {success: info.action === 'STARTED'}]">
							{{ info.action }}
						</div>
					</td>
					<td class="time">
						{{ info.start ? new Date(info.start).Format('yyyy-MM-dd HH:mm:ss') : '' }}<br>－<br>
						{{ info.end ? new Date(info.end).Format('yyyy-MM-dd HH:mm:ss') : '' }}
					</td>
					<td>
						<div :class="['btn', 'open-btn', {off: info.action === 'STARTED'}]" 
								:title="info.action === 'STARTED' ? '已启动' : '启动'"
								@click="changeTask({ 
									status: info.action === 'STARTED', 
									url: url.startTaskUrl,
									hostId: dealSelectList, 
									progId: dealServerKey.key,
									taskId: dealServerKey.subKey, 
									$http })">
						</div>
						<div :class="['btn', 'stop-btn', {off: info.action !== 'STARTED'}]" 
								:title="info.action !== 'STARTED' ? '已暂停' : '暂停'"
								@click="changeTask({ 
									status: info.action !== 'STARTED', 
									url: url.stopTaskUrl,
									hostId: dealSelectList, 
									progId: dealServerKey.key,
									taskId: dealServerKey.subKey, 
									$http })">
						</div>
						<div class="btn restart-btn" title="重启" 
								@click="changeTask({ 
									status: false,
									url: url.resetTaskUrl,
									hostId: dealSelectList, 
									progId: dealServerKey.key,
									taskId: dealServerKey.subKey, 
									$http })">
						</div>
						<div class="btn close-btn" title="关闭"
								@click="delTask({
									hostId: dealSelectList, 
									progId: dealServerKey.key,
									taskId: dealServerKey.subKey, 
									$http })">
						</div>
					</td>
				</tr>
				<tr>
					<td colspan="4">
						<div class="clearfix">
							<div class="cn">运行记录</div>
							<div class="cBtn" @click="openTaskPopup({
									key: dealServerKey.key, 
									subKey: dealServerKey.subKey, 
									hostId: dealSelectList, 
									date: undefined,
									$http})">确定</div>
							<!-- <input type="text" :value="datetime" 
									onClick="WdatePicker({skin:'whyGreen', dateFmt:'yyyy-MM-dd'})"> -->
							<input type="text" id="taskRec" readonly  
									onClick="WdatePicker({skin:'whyGreen', dateFmt:'yyyy-MM-dd'})">
						</div>
						<ul class="record clearfix">
							<li v-for="(record, recordKey) in dealTaskRecord"  :key="recordKey" 
									:class="{success: record.status === 'SUCCESSED', fail: record.status === 'FAILED', on: record.select}" 
									:title="new Date(record.datetime).Format('yyyy-MM-dd HH:mm:ss')"
									@click="showDetailRecord(recordKey)">
							</li>
						</ul>
						<div class="detail" v-if="dealRedReason.select">
							时间：<span>{{ new Date(dealRedReason.datetime).Format('yyyy-MM-dd HH:mm:ss') }}</span>
						</div>
						<div class="detail" v-if="dealRedReason.select">原因：<span>{{ dealRedReason.reason }}</span></div>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import { mapGetters, mapActions} from 'vuex'
import _url from '../../conf/url'

export default {
  data() {
    return {
    	popupThead: ['处理程序','行为','时间','操作'],
    	info: {},
    	url: {
    		startTaskUrl: _url.startTaskUrl,
    		stopTaskUrl: _url.stopTaskUrl,
    		resetTaskUrl: _url.resetTaskUrl
    	},
    	//datetime: null,
    }
  },

  computed: {
    ...mapGetters([
    	'dealEquipInfo',
    	'dealSelectList',
    	'dealServerKey',
    	'dealTaskRecord',
    	'dealRedReason',
		])
	},

  mounted() {
  	const dealServerKey = this.dealServerKey,
  		key = dealServerKey.key,
  		subKey = dealServerKey.subKey;
  	this.info = Object.assign({}, this.dealEquipInfo[key].tasks[subKey]);
  	//this.datetime = new Date().Format('yyyy-MM-dd');
  	this.$nextTick(() => {
  		document.getElementById('taskRec').value = new Date().Format('yyyy-MM-dd');
  	});
  },

  methods: {
  	...mapActions([
  		'openTaskPopup',
      'closeTaskPopup',
      'showDetailRecord',
      'changeTask',
      'delTask',
    ]),
  },

  watch: {
  	dealEquipInfo: {
  		deep: true,
  		handler: function(val, oldVal) {
  			this.info = val[this.dealServerKey.key].tasks[this.dealServerKey.subKey];
  		}
  	},
  }
}
</script>

<style lang="sass" scoped>
$borderStyle: .01rem solid #eee
#serverPopup
	position: absolute
	top: 50%
	left: 50%
	transform: translate(-50%, -50%)
	width: 7rem
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
		margin: .35rem 4% .2rem
		width: 92%
		font-size: .14rem
		thead
			th
				line-height: .35rem
				background: #e4e9f2
				border: $borderStyle
				&:nth-child(2),&:last-child
					border-left: none
				&:first-child
					width: 20%
				&:nth-child(2)
					width: 20%
				&:nth-child(3)
					width: 26%
				&:last-child
					width: 34%
		tbody
			tr
				&.deal
					td
						line-height: .45rem
						text-align: center
				td
					border-right: $borderStyle
					border-bottom: $borderStyle
					&:first-child
						border-left: $borderStyle
					&.time
						padding: .1rem 0
						font-size: .12rem
						line-height: .12rem
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
						margin-left: .25rem !important
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
					.cn
						float: left
						line-height: .4rem
						text-indent: .3rem
					.cBtn
						float: right
						margin: .1rem .5rem 0 0 
						width: .6rem
						color: #fff
						line-height: .26rem
						text-align: center
						background: #5dc2ae
						border-radius: .02rem
						cursor: pointer
						&:hover
							background: rgba(93, 194, 174, 0.8)
					input[type="text"]
						float: right
						margin: .1rem .1rem 0 0 
						padding: 0 .2rem
						width: .7rem
						height: .24rem
						border: $borderStyle
					.record
						margin: 0 .335rem .1rem
						max-height: 2.5rem
						overflow-y: auto
						&::-webkit-scrollbar
							width: .08rem
						&::-webkit-scrollbar-thumb
							background: #c9ccd1
							border-radius: .04rem
						&:last-child
							padding: .1rem .3rem .25rem
						li
							float: left
							margin: .01rem .01rem 0 0
							width: .2rem
							height: .2rem
							background-color: #ebedf1
							cursor: pointer
							&.on
								background-image: url(/static/img/dataDeal/shuju_xuanzhong2.png)
								background-size: 60% 60%
								background-repeat: no-repeat
								background-position: center
								box-shadow: 0 0 10px -1px #dbdde1
							&.success
								background-color: #5dc2ae
							&.success.on
								box-shadow: 0 0 10px -1px #5dc2ae
								background-image: url(/static/img/dataDeal/shuju_xuanzhong.png)
							&.fail
								background-color: #ff6c60
							&.fail.on
								box-shadow: 0 0 10px -1px #ff6c60
								background-image: url(/static/img/dataDeal/shuju_xuanzhong.png)
					.detail
						padding: 0 .4rem
						line-height: .2rem
						font-size: .12rem
						span
							color: #a3a3a1
						&:last-child
							margin-bottom: .2rem
</style>