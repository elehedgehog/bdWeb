<template>
  <div id="dataServer">
  	<div class="todayData">
			<div class="todayDataIn">
				<div class="twentyInter">
					<p class="twentyTitle">当日24小时接口缓存命中率</p>
					<div id="ringCharts"></div>
					<p class="readData">读取数据<span>{{ readData }}%</span></p>
					<div class="borderColor">
						<p><span></span><span>缓存命中</span></p>
						<p><span></span><span>读取数据</span></p>
					</div>
				</div>
		 		<div class="nowInter">
		 			<p>实时接口数据</p>
		 			<div class="interTypeList">
	 					<ul>
	 						<li v-for="(type, typeKey) in interfaceType" :key="typeKey"
	 								@click="toggleInt(type, typeKey)" 
	 								:class="{'on': type.select}">{{ type.text }}</li>
	 						<div class="interSlider" :style="{left: interfaceLeft}">					 							
	 						</div>
	 					</ul>
		 			</div>
		 			<div id="nowDataCharts"></div>
					<div class="message"></div>
		 		</div>
		 		<!-- <div class="msgPrompt">
					<div class="hornIcon"><span></span></div>
					<div class="titleList">
							<ul>
									<li><p>数据变更-台风路径36KM升级为18KM,新增9KM台风路径数据</p></li>
									<li><p>紧急通知-7月8号数据库异常通知</p></li>
									<li><p>IDEA-V3.0即将发布,各位用户注意相关变动</p></li>
							</ul>
					</div>
					<div class="nextIcon"><span></span></div>
				</div> -->
			</div>
		</div>
		<div class="dataDetails">
			<div class="visitDmy">
				<div class="interDataLine">
					<ul>
						<li v-for="(visitDmy, visitDmyKey) in  visitDmyQua" :key="visitDmyKey"
								@click="toggleDmy(visitDmy, visitDmyKey)"
								:class="{'on': visitDmy.select}">{{ visitDmy.text }}</li>
						<div class="visitSlider" :style="{left: visitDmyLeft}"></div>
					</ul>
					<div id="visitCharts"></div>
				</div>
			</div>
			<div class="visitQuan">
				<div class="interDataLine">
					<ul>
						<li v-for="(quantity, quantityKey) in  visiQuantity" :key="quantityKey"
						@click="toggleQuan(quantity, quantityKey)"
						:class="{'on': quantity.select}">{{ quantity.text }}</li>
						<div class="quanSlider" :style="{left: quantityLeft}"></div>
					</ul>
					<div id="quanCharts"></div>
				</div>
				<!-- <div class="pages">
						<span v-for="(pages, pagesKey) in allPages"
						@click="togglePages(pages, pagesKey)"
						:class="{'on': pages.select}">{{ pages.text }}</span>
				</div> -->
			</div>
			<div class="dataInter">
				<div class="commonInter">
					<div class="commonInterLef">
				 		<div class="interListDet">
					 		<ul>
					 			<li v-for="(inter, interKey) in interfaceList" :key="interKey"
					 					@click="toggleIntList(inter,interKey)"
					 					:class="{'on': inter.select}">{{ inter.text }}</li>
					 		</ul>
						</div>
				 		<div class="severIntList"><a href="#">服务接口列表</a></div>
					</div>
					 <div class="commonInterRig">
					 		<ul>
					 			<li v-for="list of allInterfaceList" :key="list">
					 				<span>{{ list.title }}</span>
					 				<span>{{ list.requested }}次</span>
					 			</li>
					 		</ul>
					 </div>
				</div>
				<div class="downArticle">
					<div class="downArticleIn">
						<p>系统样例</p>
						<ul>
							<li><a><img src="/static/img/dataServ/fuwu_pic1.png"></a></li>
							<li><a><img src="/static/img/dataServ/fuwu_pic2.png"></a></li>
							<li><a><img src="/static/img/dataServ/fuwu_pic3.png"></a></li>
							<li><a><img src="/static/img/dataServ/fuwu_pic4.png"></a></li>
							<li><a><img src="/static/img/dataServ/fuwu_pic5.png"></a></li>
							<li><a><img src="/static/img/dataServ/fuwu_pic6.png"></a></li>
							<li><a><img src="/static/img/dataServ/fuwu_pic7.png"></a></li>
							<li><a><img src="/static/img/dataServ/fuwu_pic8.png"></a></li>
						</ul>
					</div>
				</div>
			</div>
		</div>
  </div>
</template>

<script>
import _url from '../../conf/url'

export default {
  data() {
    return {
      interfaceType: {
      	all: {
      		text: '所有接口',
      		select: true,
      		left: '0',
      		url: _url.listInterfaceStatUrl,
      		newUrl: _url.latestInterfaceStatUrl,
      	},
      	normal: {
      		text: '通用接口',
      		select: false,
      		left: '1rem',
      		url: _url.listCommInterfaceStaUrl,
      		newUrl: _url.latestCommInterfaceStatUrl,
      	},
      	point: {
      		text: '格点接口',
      		select: false,
      		left: '2rem',
      		url: _url.listGridInterfaceStatUrl,
      		newUrl: _url.latestGridInterfaceStatUrl,
      	},
      	circle: {
      		text: '圆形接口',
      		select: false,
      		left: '3rem',
      		url: _url.listGraphInterfaceStatUrl,
      		newUrl: _url.latestGraphInterfaceStatUrl,
      	},
      	apply: {
      		text: '应用接口',
      		select: false,
      		left: '4rem',
      		url: _url.listAlgorithmInterfaceStatUrl,
      		newUrl: _url.latestAlgorithmInterfaceStatUrl,
      	}
      },
      interfaceLeft: 0,

	    visitDmyQua: {
	     	todayHour: {
	     		text: '本日各小时访问量',
	     		select: true,
	     		left: '.65rem',
	      	url: _url.listHourStatUrl,
	      	newUrl: _url.latestHourStatUrl,
	      	categories: ['0','1','2'],
	     	},
	     	monthEve: {
	     		text: '本月每日访问量',
	     		select: false,
	     		left: '2.1rem',
	      	url: _url.listDayStatUrl,
	      	newUrl: _url.latestDayStatUrl,
	      	categories: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31'],
	     	},
	     	yearMonth: {
	     		text: '本年每月访问量',
	     		select: false,
	     		left: '3.6rem',
	      	url: _url.listMonthStatUrl,
	      	newUrl: _url.latestMonthStatUrl,
	      	categories: ['1','2','3','4','5','6','7','8','9','10','11','12'],
	     	},
	     	lastYear: {
	     		text: '近年访问量',
	     		select: false,
	     		left: '5.1rem',
	      	url: _url.listYearStatUrl,
	      	newUrl: _url.latestYearStatUrl,
	      	categories: '',
	      	// categories: ['2014-1-1','2015-1-1','2016-1-1'],
	     	}
	    },
	    visitDmyLeft: .65,

	    visiQuantity: {
	     	todayUser: {
	     		text: '本日各用户访问量',
	     		select: true,
	     		left: '.65rem',
	     		url: _url.listHourStatOfUserUrl
	     	},
	     	todayIp: {
	     		text: '本日各IP访问量',
	     		select: false,
	     		left: '2.1rem',
	     		url: _url.listHourStatOfIPUrl
	     	},
	     	monthUser: {
	     		text: '本月各用户访问量',
	     		select: false,
	     		left: '3.6rem',
	     		url: _url.listDayStatOfUserUrl
	     	},
	     	monthIp: {
	     		text: '本月各IP访问量',
	     		select: false,
	     		left: '5.1rem',
	     		url: _url.listDayStatOfIPUrl
	     	}
	    },
	    quantityLeft: .65,
	    readData: 0,

    	interfaceList: {
      	normal: {
      		text: '常用通用接口',
      		select: true,
      		url: _url.listMostusedCommInterfacesUrl,
      	},
      	newestCom: {
      		text: '最新通用接口',
      		select: false,
      		url: _url.listNewestCommInterfacesUrl,
      	},
      	images: {
      		text: '常用图形接口',
      		select: false,
      		url: _url.listMostusedGraphInterfacesUrl,
      	},
      	imagesCom: {
      		text: '最新图形接口',
      		select :false,
      		url: _url.listNewestGraphInterfacesUrl,
      	},
      	comLattice: {
      		text: '常用格点接口',
      		select: false,
      		url: _url.listMostusedGridInterfacesUrl,
      	},
      	newestLat: {
      		text: '最新格点接口',
      		select: false,
      		url: _url.listNewestGridInterfacesUrl,
      	},
      	comAppli: {
      		text: '常用应用接口',
      		select: false,
      		url: _url.listMostusedAlgorithmicInterfacesUrl,
      	},
      	newestAppli: {
      		text: '最新应用接口',
      		select: false,
      		url: _url.listNewestAlgorithmicInterfacesUrl,
				},
      },
      allInterfaceList: [],	
      nowChart: null,
      ymdChart: null,
    	allPages: {
    		onePage: { text: '1-10', select: true },
	    	twoPage: { text: '11-20', select: false },
	    	threePage: { text: '21-30', select: false },
			},
			hourInterval: null,
			listInterval: null,
    }
  },

  mounted() {
		this.$nextTick(function () {
	    this.cacheData();   // 缓存命中率
	    this.listInterfaceStat(_url.listInterfaceStatUrl, _url.latestInterfaceStatUrl);
	    this.listHourStat(_url.listHourStatUrl, _url.latestHourStatUrl, ['0','1','2']);
	    this.listHourStatOfUser(_url.listHourStatOfUserUrl);
	    this.listMostuseCommInterfaces(_url.listMostusedCommInterfacesUrl);
	  })
	},

	beforeDestroy() {
		this.clearListInterval();
		this.clearHourInterval();
	},

	methods: {
		//实时接口数据
		toggleInt(type, typeKey) {
			this.interfaceLeft = type.left;
			const interfaceType = this.interfaceType;
			for(let i in interfaceType) {
				interfaceType[i].select = i === typeKey; 
			}
			// this.listInterfaceStat(this.interfaceType[type.url]);
			this.listInterfaceStat(type.url, type.newUrl);
		},

		//年月日访问量
		toggleDmy(visitDmy, visitDmyKey) {
			this.visitDmyLeft = visitDmy.left;
			const visitDmyQua = this.visitDmyQua;
			for(let i in visitDmyQua) {
				visitDmyQua[i].select = i === visitDmyKey;
			}
			this.listHourStat(visitDmy.url, visitDmy.newUrl, visitDmy.categories);
		},

		//用户IP访问量
		toggleQuan(quantity, quantityKey) {
			this.quantityLeft = quantity.left;
			const visiQuantity = this.visiQuantity;
			for(let i in visiQuantity) {
				visiQuantity[i].select = i === quantityKey;
			}
			this.listHourStatOfUser(quantity.url);
		},

		// 接口列表
		toggleIntList(inter, interKey) {
			const interfaceList = this.interfaceList;
			for(let i in interfaceList) {
				interfaceList[i].select = i === interKey;
			}
			this.listMostuseCommInterfaces(inter.url);
		},
		togglePages(pages, pagesKey) {
			const allPages = this.allPages;
			for(let i in allPages) {
				allPages[i].select = i === pagesKey;
			}
		},
		
		// 24小时接口命中率
		initHC(cache, readData) {
			var chart = null;
	    $('#ringCharts').highcharts({
	    	colors: ['#9f86ff', '#244E9B'],
	    	credits: {
          enabled: false
        },
        chart: {
        	style: { fontFamily: 'Avenir' },
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          spacing : [0, 0 , 0, 0],
          backgroundColor: 'rgba(0,0,0,0)',
          height: 300,
          width: 260
        },
        title: {
          floating:true,
          text: '缓存命中率',
          style: { color: '#395793' }
        },
        subtitle: {
          style: { color: '#395793' }
        }, 
        // 数据提示框
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            borderWidth: 0,
            dataLabels: {
              enabled: false,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %',
              color: '#395793',
              distance: 0,
              style: {
              	fontSize: ".12rem",
              	color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
              }
            },
            point: {
              events: {
                mouseOver: function(e) {
                  chart.setTitle({ text: e.target.name+ '\t'+ e.target.y + ' %' });
                },
              }
            },
          }
        },
        series: [{
          type: 'pie',
          innerSize: '75%',
          name: '缓存命中率',
          data: [
          	{
            	name:'缓存命中',   
            	y: cache,
            },{
              name: '调取数据',
              y: readData,
              sliced: true,
              selected: true,
            }
          ],
          dataLabels: {},
        }]
	    }, function(c) {
        // 环形图圆心
        var centerY = c.series[0].center[1],
          titleHeight = parseInt(c.title.styles.fontSize);
        c.setTitle({
          y:centerY + titleHeight/2
        });
        chart = c;
	    });
		},

  	// 实时接口数据
		nowHC(arrPV, arrData) {
			this.nowChart = new Highcharts.Chart({
        chart: {
        	renderTo:'nowDataCharts' ,  
        	width: 800,
        	height: 350,
          type: 'area',
          backgroundColor: 'rgba(0,0,0,0)',
        },
        title: {text:false},
        colors: ['#5B55AA', '#2A56AA'],
        credits: { enabled: false },
        xAxis: {
          allowDecimals: false,
          type: 'datetime',
          labels: {
            formatter: function () {
              return new Date(this.value).Format('HH:mm:ss');
            },
            style: { color: '#203c7b' },
          },
          tickColor: '#122858',
      		tickWidth: 2,
      		lineColor: '#122858',
        },
        yAxis: [{
          id: 'dataForPv',
          title: {
            text: 'PV',
            style: { color: '#203c7b' },
          },
          gridLineColor: '#122858',
          lineColor: '#122858',
          lineWidth: 1,
          //tickPositions: [0,400,800],
          //tickAmount: 3,
          //tickLength: 200,
          labels: {
            // formatter: function () {
            //     return this.value;
            // },
            style: { color: '#203c7b' },
          }
        },{
          id: 'dataForQu',
          title: {
            text: '数据量',
            style: { color: '#203c7b' },
          },
          gridLineColor: '#122858',
          lineColor: '#122858',
      		lineWidth: 1,
          //tickPositions: [0,38.1,76.3],
          opposite: true,
          //tickAmount: 3,
          //tickLength: 200,
          labels: {
            formatter: function () {
            	let unit = 'B';
            	if(this.value > 1024) {
            		this.value = this.value / 1024;
            		unit = 'KB';
            	}
            	if(this.value > 1024) {
            		this.value = this.value / 1024;
            		unit = 'MB';
            	}
            	if(this.value > 1024) {
            		this.value = this.value / 1024;
            		unit = 'GB';
            	}
            	if(this.value > 1024) {
            		this.value = this.value / 1024;
            		unit = 'TB';
            	}
            	this.value = Math.round(this.value * 100) / 100;
              return this.value + unit;
            },
            style: { color: '#203c7b' },
          }
        }],
        tooltip: {
        	xDateFormat: '%Y/%m/%d %H:%M:%S',
        	shared: true,
        },
        plotOptions: {
          area: {
            marker: {
              enabled: false,
              symbol: 'circle',
              radius: 2,
              states: {
                hover: {
                  enabled: true
                }
              }
            }
          }
        },
        series: [{
          name: '数据量',
          yAxis: 'dataForQu',
          data: arrData,
          tooltip: {
          	valueSuffix: ' B',
          	// pointFormatter: function() {
          	// 	let unit = 'B';
           //    	if(this.y > 1024) {
           //    		this.y = this.y / 1024;
           //    		unit = 'KB';
           //    	}
           //    	if(this.y > 1024) {
           //    		this.y = this.y / 1024;
           //    		unit = 'MB';
           //    	}
           //    	if(this.y > 1024) {
           //    		this.y = this.y / 1024;
           //    		unit = 'GB';
           //    	}
           //    	if(this.y > 1024) {
           //    		this.y = this.y / 1024;
           //    		unit = 'TB';
           //    	}
           //    	this.y = Math.round(this.y * 100) / 100;
          	// 	return this.y + unit;
          	// }
          }
        },{
          name: '访问量',
          yAxis: 'dataForPv',
          data: arrPV,
        }]
	    });
		},

		// 日月年访问量
		visitHC(arrYmdPV, arrYmdData, itemYmdTime,arrYmdTime,categories){
			this.ymdChart = new Highcharts.Chart({
        chart: {
        	renderTo:'visitCharts' , 
          type: 'line',
          backgroundColor: 'rgba(0,0,0,0)',
          height: 400,
          width: 1000,
        },
        title: {text:false},
		 	  credits: { enabled: false },
        colors: ['#2a659e', '#9F86FF'],
        xAxis: {
        	type: 'datetime',
          labels: {
              // formatter: function () {
              //     return new Date(this.value).Format('yyyy/mm/dd HH:MM:ss');
              // },
          },
          // categories: categories || arrYmdTime,
          categories: categories,
          // categories: arrYmdTime,
          labels: {
          	style: { color: '#6d6c6c' },
          },
          lineColor: '#E2E6E7',
          tickColor: '#E2E6E7',
        },
        yAxis: [{
        	id: 'dataPV',
        	title: {
            text: 'PV',
            style: { color: '#9f86ff' },
          },
          // tickAmount: 3,
      		// tickPositions: [0,1000,2000,3000],
          labels: {
            formatter: function () {
            	if(this.value >10000) {
            		this.value = this.value /1000 +'万';
            	}
              return this.value;
            },
            style: { color: '#9f86ff' },
          },
        },{
        	id: 'dataQua',
        	title: {
              text: '数据量',
              style: { color: '#2a659e' },
          },
        	// tickAmount: 3,
        	opposite: true,
        	// tickPositions: [0,465.7,931.4,1400],
        	labels: {
            formatter: function () {
            	let unit = 'B';
            	if(this.value > 1024) {
            		this.value = this.value / 1024;
            		unit = 'KB';
            	}
            	if(this.value > 1024) {
            		this.value = this.value / 1024;
            		unit = 'MB';
            	}
            	if(this.value > 1024) {
            		this.value = this.value / 1024;
            		unit = 'GB';
            	}
            	if(this.value > 1024) {
            		this.value = this.value / 1024;
            		unit = 'TB';
            	}
            	this.value = Math.round(this.value * 100) / 100;
                return this.value + unit;
            },
            style: { color: '#2a659e' },
          }
        }],
         tooltip: {
         	xDateFormat: '%Y/%m/%d %H:%M:%S',
	        headerFormat: '<span style="color:#6d6c6c">今日用户{series.name}</span><br/>',
	        pointFormat: '<span style="color:{series.color}">{point.y}</span><br/>',
	        // footerFormat: '<span style="color:#6d6c6c">'+new Date(itemYmdTime).Format("yyyy/mm/dd HH:MM:ss")+'</span>',
	        enabled: true,
        	shared: false,
        },
        plotOptions: {
          line: {
            dataLabels: {
              // enabled: false         // 开启数据标签
            },
            enableMouseTracking: true // 关闭鼠标跟踪，对应的提示框、点击事件会失效
          }
        },
        series: [{
            name: '数据量',
            yAxis: 'dataQua',
            data: arrYmdData,
            color: '#29659e',
	          tooltip: {
		          valueSuffix: 'B'
		        },
	        }, {
            name: '请求方',
            yAxis: 'dataPV',
            data: arrYmdPV,
            color: '#9f86ff',
            tooltip: {
		            valueSuffix: '次'
		        },
       		}]
	    });
		},

		// 用户访问量ip访问量
		quanHC(arrUserPV, arrUserData, arrUserName){
			var chart = new Highcharts.Chart({
        chart: {
        	renderTo:'quanCharts',
          type: 'bar',
          width: 1000,
          height: 400,
        },
        colors: ['#2a659e', '#5B55AA'],
        title: { text: false },
        xAxis: {
          title: { text: null },
          categories: arrUserName,
          labels: {
          	style: { color:  '#6d6c6c' },
          }
        },
        yAxis: [{
          id: 'dataNum',
          // min: 0,
          title: {
            text: 'PV',
            x: -955,
            align: 'high',
            style: { color: '#9f86ff' },
          },
          labels: {
            formatter: function () {
              return this.value +'W';
            },
            style: { color: '#9f86ff' },
          },
        },{
          id: 'dataPV',
          // min: 0,
          title: {
              text: '数据量',
              x: -950,
              align: 'high',
              style: {
              	color: '#2a659e',
              },

          },
          opposite: true,
          labels: {
            formatter: function () {
            	let unit = 'B';
            	if(this.value > 1024) {
            		this.value = this.value / 1024;
            		unit = 'KB';
            	}
            	if(this.value > 1024) {
            		this.value = this.value / 1024;
            		unit = 'MB';
            	}
            	if(this.value > 1024) {
            		this.value = this.value / 1024;
            		unit = 'GB';
            	}
            	if(this.value > 1024) {
            		this.value = this.value / 1024;
            		unit = 'TB';
            	}
            	this.value = Math.round(this.value * 100) / 100;
              return this.value + unit;
            },
            style: { color: '#2a659e' }
          },
        }],
        plotOptions: {
          bar: {
            dataLabels: { enabled: false },
            pointPadding: 0,
          },
        },
        legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'top',
          x: -40,
          y: 100,
          floating: true,
          borderWidth: 1,
          backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
          shadow: true
        },
        credits: { enabled: false },
        series: [{
          name: '按数据量',
          yAxis: "dataPV",
          data: arrUserData,
        }, {
          name: '按请求量',
          yAxis: "dataNum",
          data: arrUserPV,
        }]
	    });	
	  },    
		
		// 缓存命中率
		cacheData() {
			const url = _url.getCacheStatUrl;
			this.$http.get(url).then(msg => {
				const data = msg.data;
				if(/null/.test(data)) return;
				this.readData = 100 - data.hitPercent;
				this.initHC(data.hitPercent, this.readData);
			});
		},

		//所有请求量曲线
		listInterfaceStat(url,newUrl) {
			this.$http.get(url).then((msg) => {
				const data = msg.data;
				if(/null/.test(data)) return;
				let arrPV = [], arrData = [];
				for(let info of data) {
					const itemData = { x: info.datetime, y: info.dataSize },
						  itemPV = {x: info.datetime, y: info.requestd };
					arrPV.push(itemPV);
					arrData.push(itemData);
				}
				this.nowHC(arrPV, arrData);

				// 更新的数据
				this.clearListInterval();
				this.listInterval = setInterval(() => {
					let theNewUrl = newUrl.replace('{random}', Math.random());
					this.$http.get(theNewUrl).then((newMsg) => {
						const newData = newMsg.data;
						const itemNewData = { x: newData.datetime, y: newData.dataSize },
							  itemNewPV = { x: newData.datetime, y: newData.requestd };
						this.nowChart.series[0].addPoint(itemNewData, true, true);
						this.nowChart.series[1].addPoint(itemNewPV, true, true);
					});
				}, 1000);
			})
		},

		// 本日小时访问量 本月每日访问量
		listHourStat(url,newUrl,categories) {
			this.$http.get(url).then((msg) => {
				const data = msg.data;
				if(/null/.test(data)) return;
				let arrYmdPV = [], arrYmdData = [],itemYmdTime, arrYmdTime=[];
				if( categories === '') {
					for(let info of data) {
						const itemYmdData = { x: info.datetime, y: info.dataSize },
							  itemYmdPV = { x: info.datetime, y: info.requestd },
							  itemYmdTime = info.datetime;
					
						arrYmdData.push(itemYmdData);
						arrYmdPV.push(itemYmdPV);
					    arrYmdTime.push(itemYmdTime);
					    this.categories = arrYmdTime
					}
				} else {
					for(let info of data) {
						// itemYmdTime = info.datetime;
						const itemYmdData = info.dataSize,
							  itemYmdPV = info.requestd,
							  itemYmdTime = info.datetime;
					
						arrYmdData.push(itemYmdData);
						arrYmdPV.push(itemYmdPV);
					    arrYmdTime.push(itemYmdTime);
					}
				}
				
				this.visitHC(arrYmdPV, arrYmdData, itemYmdTime,arrYmdTime,categories);
				// 更新的数据
				// this.clearHourInterval();
				// this.hourInterval = setInterval(() => {
					let theNewUrl = newUrl.replace('{random}', Math.random());
					this.$http.get(newUrl).then((newMsg) => {
						const newData = newMsg.data;
								itemYmdTime= newData.datetime;
						const itemYmdNewData = newData.dataSize,
							  itemYmdNewPV = newData.requestd;
						this.ymdChart.series[0].addPoint(itemYmdNewData, true, true);
						this.ymdChart.series[1].addPoint(itemYmdNewPV, true, true);
					});
				// }, 1000);

			});
		},

		//本日各用户IP访问量
		listHourStatOfUser(url) {
			this.$http.get(url).then((msg) => {
				const data = msg.data;
				if(/null/.test(data)) return;
				let arrUserData = [], arrUserPV = [], arrUserName = [], arrUserIp = [];
				let itemUserName;
				for(let info of data) {
						const itemUserData =  info.dataSize,
						 	  itemUserPV = info.requested,
						 	  itemUserName = info.username || info.ip;
						 arrUserData.push(itemUserData);
						 arrUserPV.push(itemUserPV);
						 arrUserName.push(itemUserName);
				}
				this.quanHC(arrUserPV, arrUserData, arrUserName);
			})
		},

		// 接口列表
		listMostuseCommInterfaces(url) {
			this.$http.get(url).then(msg => {
				const data = msg.data;
				if(/null/.test(data)) return;
				this.allInterfaceList = data;
			});
		},

		clearListInterval () {
			if(this.listInterval) {
				clearInterval(this.listInterval);
				this.listInterval = null;
			}
		},
		clearHourInterval() {
			if(this.hourInterval) {
				clearInterval(this.hourInterval);
				this.hourInterval = null;
			}
		},
		

	},					
}
</script>

<style lang="sass" scoped>
#dataServer
	width: 100%
	height: 100%
	font-size: .18rem
.todayData
	width: 100%
	height: 6rem
	margin: 0 auto
	border: 1px solid transparent
	background-color: #03153d
.todayDataIn
	width: 12rem
	height: .5rem
	position: relative
	margin: .5rem auto
	.twentyInter
		width: 30%
		height: 5rem
		position: relative
		background-color: #081a43
		float: left
		.twentyTitle,
			width: 100%
			height: .8rem
			font-size: .18rem
			color: #395793
			line-height: 1rem
			text-align: center
		#ringCharts
			margin-left: .5rem
		.readData
			width: 100%
			height: .5rem
			position: absolute
			bottom: 1rem
			font-size: .18rem
			color: #395793
			line-height: 1rem
			text-align: center
			span
				color: #fff
				font-size: .25rem
				padding-left: .1rem

		.borderColor
			position: absolute
			bottom: 0
			width: 2.4rem
			height: .5rem
			font-size: .12rem
			margin-left: .6rem
			p
			  width: 1.2rem
			  float: left
			  span:nth-child(1)
			  	display: inline-block
			  	width: .1rem
			  	height: .1rem
			  &:nth-child(1)
			  	span:nth-child(1)
			  		background-color: #9f86ff
			  		margin-right: .05rem
			  &:nth-child(2)	
			  	span:nth-child(1)
			  		background-color: #007ae1
			  		margin-right: .05rem

	.nowInter
		width: 68%
		height: 5rem
		background-color: #081a43
		color: #395793
		float: right
		p
			width: 100%
			height: .8rem
			line-height: 1rem
			text-align: center
			font-size: .18rem

		.interTypeList
			width: 5rem
			height: .32rem
			line-height: .32rem
			border: 1px solid #007AE1
			border-radius: .2rem
			margin: 0 auto
			font-size: .15rem
			ul
				margin: 0 auto
				position: relative
				z-index: 1
				li
					float: left
					width: 1rem
					text-align: center
					cursor: pointer;
					&.on
						color: #fff
						transition: color .3s linear .3s
				.interSlider
					width: 1rem
					height: .32rem
					border-radius: .2rem
					background-color: #007AE1
					position: absolute
					top: 0
					left: 0
					z-index: -1
					transition: left .3s linear
		#nowDataCharts
			margin: 0 auto
			position: absolute
			top: 1.45rem
.msgPrompt
	position: relative
	bottom: -.2rem
	z-index: 9
	margin-left: .25rem
	background-color： #fff
	.hornIcon
		width: .5rem 
		height: .5rem
		margin-left: 0.025rem;
		background-color: #2A659E
		float: left
		span
			display: inline-block
			width: .5rem
			height: .5rem
			background: url('/static/img/dataServ/fuwu_gonggao.png')no-repeat center / 50% 50%
	.titleList
		width: 10.6rem
		height: .5rem
		background-color: #fff
		float: left
		ul 
			li
				width: 3.45rem
				height: .5rem
				margin: 0 .04rem
				float: left
				cursor: pointer

				
				p
					width: 3.25rem
					height: .25rem
					line-height: .3rem
					margin-top: .12rem							
					text-align: center
					font-size: .12rem
					color: #6d6c6c
					overflow: hidden
					text-overflow: ellipsis
					white-space: nowrap
					padding: 0 .1rem
					&:hover
					 color: #2a659e
			li:nth-child(2)
				p
					border-left: 1px solid #c5cdd0
					border-right: 1px solid #c5cdd0

	.nextIcon
		width: .4rem
		height: .5rem
		background-color: #ecf0f2
		float: left
		span
			display: inline-block
			width: .35rem
			height: .5rem
			background: url('/static/img/dataServ/fuwu_jiantou.png')no-repeat center / 50% 50%
.dataDetails
 	width: 100%
 	float: left
 	background-color: #F3F7FD
 	padding-bottom: .2rem
.visitDmy,
	width: 12rem
	height: 4.6rem
	background-color: #fff
	margin: .15rem auto .15rem
.visitQuan
	position: relative
	width: 12rem
	height: 4.6rem
	background-color: #fff
	margin: .15rem auto .15rem
.interDataLine
	width: 12rem
	background：#fff
	position: relative
	ul
		position: relative
		width: 6rem
		margin: 0 auto
		height: .4rem
		line-height: .4rem
		text-align: center
		padding-top: .2rem
		li
			float: left
			width: 1.5rem
			font-size: .15rem
			color: #a3a3a3
			cursor: pointer;
			&.on
				color: #2a659e
				transition: color .3s linear .3s
		.visitSlider,.quanSlider
			position: absolute
			width: .3rem
			height: .35rem
			left: .65rem
			border-bottom: 1px solid #2a659e
			transition: left .3s linear
	
	#visitCharts,#quanCharts
	  padding: 0 1rem
.pages
	  position: absolute
	  left: 4.95rem
	  bottom: .35rem
	  width: 2.1rem
	  span
	  	display: inline-block
	  	width: .6rem
	  	height: .20rem
	  	line-height: .20rem
	  	font-size: .12rem
	  	text-align: center
	  	color: #ADADAD
	  	border: 1px solid #ADADAD
	  	&:nth-child(2)
	  		margin: 0 .1rem
	  	&.on
	  	  color: #376EA4
	  	  border: 1px solid #376EA4
.dataInter
	width: 12rem
	height: 5rem
	margin: 0 auto
	background-color: #F3F7FD
	.commonInter
		width: 7.6rem
		height: 5rem
		float: left
		background-color: #fff
		.commonInterLef
			width: 1.6rem
			height: 5rem
			float: left
			border-right: 1px solid #c5cdd0
			.interListDet
			 ul
			  li
			  	width: 100%
			  	height: .3rem
			  	line-height: .3rem
			  	text-align: center
			  	color: #a3a3a3
			  	font-size: .15rem
			  	margin: .2rem 0
			  	border-left: 2px solid transparent
			  	cursor: pointer;
			  	
			  	&.on
			  		border-left: 2px solid #3B73A5
			  		color: #2a659e
			.severIntList
		 		cursor: pointer
		 		border-top: 1px solid #c5cdd0
		 		width: 1.1rem
		 		margin: 0 auto
		 		a
		 			display: inline-block
		 			text-decoration: none
			 		width: 1.1rem
				 	height: .4rem
				 	margin: .2rem auto
				 	padding-left: 2px
				 	background-color: #2a659e
				 	color: #fff
				 	font-size: .15rem
				 	text-align: center
				 	line-height: .4rem

		.commonInterRig
			width: 5.9rem
			float: left
			font-size: 13px
			color: #1c1c1c
			overflow: hidden
			ul
				margin-top: .2rem
			 li
			 	width: 5.1rem
			 	height: .45rem
			 	line-height: .45rem
			 	margin: 0 auto
			 	cursor: pointer;
			 	span:nth-child(1)
			 		float: left
			 	span:nth-child(2)
			 		float: right
			 		color: #a3a3a3

	.downArticle
		width: 4.2rem
		height: 5rem
		float: right
		background-color: #fff
		.downArticleIn
			width: 3.4rem
			margin: 0 auto
			p
				font-size: .15rem
				color: #6d6c6c
				margin: .2rem 0
			ul 
				li 
					float: left
					width: 1.6rem
					height: .86rem
					cursor: pointer;
					margin-bottom: .2rem
					&:nth-child(2n+1)
						margin-right: .2rem
					img
						width: 1.6rem
						height: .86rem
</style>
