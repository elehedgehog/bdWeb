const baseUrl = 'http://119.29.102.103:8111'

export default {
	listHostsInfoUrl: `${baseUrl}/DataProcess/listHostsInfo?random={random}`,		//获取所有主机信息
	listProgramsInfoUrl: `${baseUrl}/DataProcess/listProgramsInfo?hostId={hostId}&random={random}`,		//获取程序信息
	listProgramsRealUrl: `${baseUrl}/DataProcess/listProgramsReal?hostId={hostId}&random={random}`,			//获取程序实时信息
	getTaskInfoUrl: `${baseUrl}/DataProcess/getTaskInfo?hostId={hostId}&progId={progId}&taskId={taskId}&random={random}`,		//获取任务信息
	getTaskRealUrl: `${baseUrl}/DataProcess/getTaskReal?hostId={hostId}&progId={progId}&taskId={taskId}&random={random}`,		//获取任务实时信息
	listTaskRecordsUrl: `${baseUrl}/DataProcess/listTaskRecords?hostId={hostId}&progId={progId}&taskId={taskId}&date={date}&random={random}`,		//获取所有任务记录
	latestTaskRecordUrl: `${baseUrl}/DataProcess/latestTaskRecord?hostId={hostId}&progId={progId}&taskId={taskId}&random={random}`,		//获取最新任务记录
	delTaskUrl: `${baseUrl}/DataProcess/delTask?hostId={hostId}&progId={progId}&taskId={taskId}&random={random}`,		//删除任务
	startTaskUrl: `${baseUrl}/DataProcess/startTask?hostId={hostId}&progId={progId}&taskId={taskId}&random={random}`,		//开始任务
	stopTaskUrl: `${baseUrl}/DataProcess/stopTask?hostId={hostId}&progId={progId}&taskId={taskId}&random={random}`,		//停止任务
	resetTaskUrl: `${baseUrl}/DataProcess/resetTask?hostId={hostId}&progId={progId}&taskId={taskId}&random={random}`,		//重置任务
	addTaskUrl: `${baseUrl}/DataProcess/addTask?hostId={hostId}&progId={progId}&name={name}&start={start}&end={end}&random={random}`,		//添加任务
	taskRecordsUrl: `${baseUrl}/DataProcess/listGlobalTaskRecords?since={since}&random={random}`,		//任务情况

	getMdbStructureUrl: `${baseUrl}/DataStorage/getMongodbStructure?random={random}`,	//获取mongodb拓扑结构
	getHostInfoUrl: `${baseUrl}/DataStorage/getHostInfo?hostId={hostId}&random={random}`,	//获取主机信息




	getCacheStatUrl: `${baseUrl}/DataService/getCacheStat`, //缓存命中率

	listInterfaceStatUrl: `${baseUrl}/DataService/listInterfaceStat`, //所有请求量曲线
	latestInterfaceStatUrl: `${baseUrl}/DataService/latestInterfaceStat?random={random}`, //最新 所有请求量
	listCommInterfaceStaUrl: `${baseUrl}/DataService/listCommInterfaceStat`, //通用接口请求量曲线
	latestCommInterfaceStatUrl: `${baseUrl}/DataService/latestCommInterfaceStat?random={random}`, //最新 通用接口请求量
	listGridInterfaceStatUrl: `${baseUrl}/DataService/listGridInterfaceStat`, //格点接口请求量曲线
	latestGridInterfaceStatUrl: `${baseUrl}/DataService/latestGridInterfaceStat?random={random}`, //最新 格点接口请求量
	listGraphInterfaceStatUrl: `${baseUrl}/DataService/listGraphInterfaceStat`, //图形接口请求量曲线
	latestGraphInterfaceStatUrl: `${baseUrl}/DataService/latestGraphInterfaceStat?random={random}`,//最新 图形接口请求量
	listAlgorithmInterfaceStatUrl: `${baseUrl}/DataService/listAlgorithmInterfaceStat`, //算法接口请求量曲线
	latestAlgorithmInterfaceStatUrl: `${baseUrl}/DataService/latestAlgorithmInterfaceStat?random={random}`,//最新 算法接口请求量

	listHourStatUrl: `${baseUrl}/DataService/listHourStat`, //本日每小时请求量曲线
	latestHourStatUrl: `${baseUrl}/DataService/latestHourStat?random={random}`, //最新 小时请求量
	listDayStatUrl: `${baseUrl}/DataService/listDayStat`, //本月每日请求量曲线
	latestDayStatUrl: `${baseUrl}/DataService/latestDayStat?random={random}`, //最新 日请求量
	listMonthStatUrl: `${baseUrl}/DataService/listMonthStat`, //本年每月请求量曲线
	latestMonthStatUrl: `${baseUrl}/DataService/latestMonthStat?random={random}`, //最新 月请求量
	listYearStatUrl: `${baseUrl}/DataService/listYearStat`, //每年请求量曲线
	latestYearStatUrl: `${baseUrl}/DataService/latestYearStat?random={random}`, //最新 年请求量

	listHourStatOfUserUrl: `${baseUrl}/DataService/listHourStatOfUser`, //本日每小时用户请求量曲线
	listHourStatOfIPUrl: `${baseUrl}/DataService/listHourStatOfIp`, //本日每小时IP请求量曲线
	listDayStatOfUserUrl: `${baseUrl}/DataService/listDayStatOfUser`,  //本月每日用户请求量曲线
	listDayStatOfIPUrl: `${baseUrl}/DataService/listDayStatOfIp`,  //本月每日IP请求量曲线

	// listMostusedInterfacesUrl: `${baseUrl}/DataService/listMostusedInterfaces`, //常用所有接口列表
	// listNewestInterfacesUrl: `${baseUrl}/DataService/listNewestInterfaces`, //最新所有接口列表

	listMostusedCommInterfacesUrl: `${baseUrl}/DataService/listMostuseCommInterfaces`, //常用通用接口列表
	listNewestCommInterfacesUrl: `${baseUrl}/DataService/listNewestCommInterfaces`,  //最新通用接口列表
	listMostusedGraphInterfacesUrl: `${baseUrl}/DataService/listMostuseGraphInterfaces`, //常用图形接口列表
	listNewestGraphInterfacesUrl: `${baseUrl}/DataService/listNewestGraphInterfaces`, //最新图形接口列表
	listMostusedGridInterfacesUrl: `${baseUrl}/DataService/listMostuseGridInterfaces`, //常用格点接口列表
	listNewestGridInterfacesUrl: `${baseUrl}/DataService/listNewestGridInterfaces`,  //最新格点接口列表
	listMostusedAlgorithmicInterfacesUrl: `${baseUrl}/DataService/listMostuseAlgorithmInterfaces`, //常用算法接口列表
	listNewestAlgorithmicInterfacesUrl: `${baseUrl}/DataService/listNewestAlgorithmInterfaces` , //最新算法接口列表
}