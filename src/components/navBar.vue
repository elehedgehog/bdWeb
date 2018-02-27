<template>
	<div id="headNav" class="ns clearfix">
		<div class="head-center">
			<div class="logo"><em></em><span>大数据服务平台</span></div>
			<div class="nav">
				<ul class="clearfix">
					<li v-for="(opt, key) in nav" @click="togglePage(opt)" :key="key" 
							@mouseenter="moveLine(opt)" @mouseleave="restoreLine">{{ opt.text }}</li>
				</ul>
				<div class="line" :style="{ left: lineLeft }"></div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  data() {
    return {
    	nav: {
    		index: {
    			text: '首页',
    			left: '.2rem',
    			path: '/'
    		},
    		dataDeal: {
    			text: '数据处理',
    			left: '1.4rem',
    			path: '/dataDeal'
    		},
    		resource: {
    			text: '资源管理',
    			left: '2.6rem',
    			path: '/resourceManage'
    		},
    		dataServ: {
    			text: '数据服务',
    			left: '3.8rem',
    			path: '/dataServer'
    		},
    	},
    	lineLeft: null,
    	lineLeftOri: null,
    }
  },

  mounted() {
		this.lineLeft = this.nav[this.$route.name].left;
  },

  methods: {
  	togglePage(opt) {
  		this.lineLeft = this.lineLeftOri = opt.left;
  		this.$router.push(opt.path);
  	},
  	moveLine(opt) {
  		this.lineLeftOri = this.lineLeft;
  		this.lineLeft = opt.left;
  	},
  	restoreLine() {
  		this.lineLeft = this.lineLeftOri;
		},
		routeChange() {
			this.lineLeft = this.lineLeftOri = this.nav[this.$route.name].left;
		}
	},
	
	watch: {
		'$route': 'routeChange'
	}
}
</script>

<style lang="sass" scoped>
#headNav
	width: 100%
	height: .5rem
	background: #010028
	.head-center
		position: relative
		margin: 0 auto
		width: 12rem
		height: 100%
		.logo
			margin-left: .1rem
			float: left
			position: relative
			width: 1.7rem
			height: 100%
			em
				position: absolute
				top: .12rem
				left: 0
				display: inline-block
				width: .25rem
				height: .25rem
				background: url(/static/img/home/home_logo.png) no-repeat center / cover
			span
				position: absolute
				top: .15rem
				left: .35rem
				color: #fff
				font-size: .18rem
				line-height: .2rem
		.nav
			float: left
			position: relative
			margin-left: .4rem
			ul
				li
					float: left
					width: 1.2rem
					line-height: .5rem
					text-align: center
					color: #fff
					font-size: .14rem
					cursor: pointer
			.line
				position: absolute
				bottom: 0
				left: .2rem
				width: .8rem
				height: .03rem
				background: #007ae1
				transition: left .3s linear
</style>
