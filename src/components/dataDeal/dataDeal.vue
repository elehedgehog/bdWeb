<template>
  <div id="dataDeal">
  	<div class="container clearfix">
  		<div class="nav">
  			<div class="title">设备监控</div>
				<div class="menus">
					<div class="menu" v-for="(opt, key) in dataDealMenu"  :key="key">
						<div class="menu-title" @click="toggleDealMenu(key)">
							{{ key }}<em :class="{'select': opt.select}"></em>
						</div>
						<div class="lists" v-if="opt.select">
							<div :class="['list', {'select': item.select}]" v-for="(item, subKey) in opt.list"  :key="subKey"
									@click="toggleDealList(subKey), initDealInfo({ $http, key:subKey })">{{ item.text }}</div>
						</div>
					</div>
				</div>
  		</div>
  		<info-table v-if="dealSelectList"></info-table>
			<server-popup v-if="dealServerPopup"></server-popup>
			<program-popup v-if="dealProgramPopup"></program-popup>
			<task-record></task-record>
	  </div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import infoTable from './infoTable'
import serverPopup from './serverPopup'
import programPopup from './programPopup'
import taskRecord from './taskRecord'

export default {
	components: {
		infoTable,
		serverPopup,
		programPopup,
		taskRecord,
	},

  data() {
    return {
    	a : 123
    }
  },

  computed: {
    ...mapGetters([
    	'dataDealMenu',
    	'dealSelectList',
    	'dealServerPopup',
    	'dealProgramPopup',
		])
	},

  mounted() {
		this.initDealMenu(this.$http);
	},
	
	beforeDestroy() {
		if(window.dealInfo)	{
			window.clearInterval(window.dealInfo);
			delete window.dealInfo;
		}
		/*
		//popup存在不关闭的情况  不能终止此对象
		if(window.getLatestTaskRecor) {
			window.clearInterval(window.getLatestTaskRecor);
			delete window.getLatestTaskRecor;
		}
		*/
		if(window.getTaskRec) {
			window.clearInterval(window.getTaskRec);
			delete window.getTaskRec;
		}
	},

  methods: {
  	...mapActions([
  		'initDealMenu',
      'toggleDealMenu',
      'toggleDealList',
      'initDealInfo',
    ]),
  },
}
</script>

<style lang="sass" scoped>
$borderStyle: 1px solid #eee
#dataDeal
	position: relative
	width: 100%
	height: calc(100% - .5rem)
	min-height: 7rem
	background: #f3f7fd
	.container
		position: absolute
		top: .25rem
		left: 50%
		transform: translateX(-50%)
		width: 12rem
		height: 90%
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