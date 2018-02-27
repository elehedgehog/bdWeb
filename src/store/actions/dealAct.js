import * as types from '../mutation-types'
import _url from '../../conf/url'

export const initDealMenu = ({ commit }, $http) => {
	const url = _url.listHostsInfoUrl.replace('{random}', Math.random());
	$http.get(url).then(mes => {
		const data = mes.data;
		if(/null/.test(data)) return;
		console.log(data);
		commit(types.INIT_DEAL_MENU, data);
	});
}

export const initDealInfo = ({ commit }, { $http, key }) => {
	if(!key) return;
	const url = _url.listProgramsInfoUrl.replace('{hostId}', key).replace('{random}', Math.random());			//获取列表信息
	$http.get(url).then(mes => {
		const data = mes.data;
		if(/null/.test(data)) return;
		commit(types.INIT_DEAL_INFO, data);

		const realUrl = _url.listProgramsRealUrl.replace('{hostId}', key).replace('{random}', Math.random());			//获取数据信息
		$http.get(realUrl).then(realMes => {
			const realData = realMes.data;
			if(/null/.test(realData)) return;
			commit(types.INIT_DEAL_REAL, realData);
		});

	});
}

//待测试
export const initDealReal = ({ commit }, { $http, key }) => {
	if(!key) return;
	const realUrl = _url.listProgramsRealUrl.replace('{hostId}', key).replace('{random}', Math.random());
	$http.get(realUrl).then(realMes => {
		const realData = realMes.data;
		if(/null/.test(realData)) return;
		commit(types.INIT_DEAL_REAL, realData);
	});
}

export const toggleDealMenu = ({ commit }, key) => {
  commit(types.TOGGLE_DEAL_MENU, key);
}

export const toggleDealList = ({ commit }, subKey) => {
  commit(types.TOGGLE_DEAL_LIST, subKey);
}

export const toggleProgTips = ({ commit }, { key, status }) => {
	commit(types.TOGGLE_PROG_TIPS, { key, status });
}

export const openTaskPopup = ({ commit }, { key, subKey, hostId, date, $http }) => {
	if(!date) date = document.getElementById('taskRec').value;
	const	url = _url.listTaskRecordsUrl.replace('{hostId}', hostId).replace('{progId}', key)
			.replace('{taskId}', subKey).replace('{date}', date).replace('{random}', Math.random());
	$http.get(url).then(mes => {
		const data = mes.data;
		commit(types.OPEN_TASK_POPUP, { key, subKey, data });
	});

	//每秒获取一次最新任务记录
	if(window.getLatestTaskRecor) {
		window.clearInterval(window.getLatestTaskRecor);
		delete window.getLatestTaskRecor;
	}
	const today = new Date().Format('yyyy-MM-dd');
	if(today !== date) return;
	window.getLatestTaskRecor = setInterval(() => {
		const latestUrl = _url.latestTaskRecordUrl.replace('{hostId}', hostId)
			.replace('{progId}', key).replace('{taskId}', subKey).replace('{random}', Math.random());
		$http.get(latestUrl).then(latestMes => {
			const latestData = latestMes.data;
			commit(types.CHANGE_TASK_RECORD, latestData);
		});
	} ,1000);
}

export const showDetailRecord = ({ commit }, key) => {
  commit(types.SHOW_DETAIL_RECORD, key);
}

export const changeTask = ({ commit }, { status, url, hostId, progId, taskId, $http }) => {
	if(status) return;
	url = url.replace('{hostId}', hostId).replace('{progId}', progId).replace('{taskId}', taskId);
	$http.get(url).then(mes => {
		const data = mes.data;
		if(data.result !== 'SUCCESSED') {
			alert(data.result + ': ' + data.message);
			return;
		}
		const infoUrl = _url.getTaskInfoUrl.replace('{hostId}', hostId)
			.replace('{progId}', progId).replace('{taskId}', taskId).replace('{random}', Math.random());
		$http.get(infoUrl).then(infoMes => {
			const infoData = infoMes.data;
			if(/null/.test(infoData)) return;
			const realUrl = _url.getTaskRealUrl.replace('{hostId}', hostId).replace('{progId}', progId)
				.replace('{taskId}', taskId).replace('{random}', Math.random());
			$http.get(realUrl).then(realMes => {
				const realData = realMes.data;
				if(/null/.test(realData)) return;
				commit(types.CHANGE_TASK_STATUS, { info: infoData, real: realData, progId, taskId });
			});
		});
	});
}

export const delTask = ({ commit }, { hostId, progId, taskId, $http }) => {
	if(!confirm('是否关闭此程序？')) return;
	const url = _url.delTaskUrl.replace('{hostId}', hostId).replace('{progId}', progId)
		.replace('{taskId}', taskId).replace('{random}', Math.random());
	$http.get(url).then(mes => {
		const data = mes.data;
		if(data.result !== 'SUCCESSED') {
			alert(data.result + ': ' + data.message);
			return;
		}
		window.clearInterval(window.getLatestTaskRecor);
		commit(types.DEL_TASK, {progId,taskId});
		commit(types.CLOSE_TASK_POPUP);
	});
}

export const closeTaskPopup = ({ commit }) => {
	window.clearInterval(window.getLatestTaskRecor);
	commit(types.CLOSE_TASK_POPUP);
}

export const openProgramPopup = ({ commit }, { key, $http }) => {
  commit(types.OPEN_PROGRAM_POPUP, {key});
}

export const addTask = ({ commit }, { hostId, progId , name, begginTime, endTime, intObj, $http }) => {
	if(!name) {
		alert('任务名不得为空！');
		return;
	}
	/*let interval;
	for(let i in intObj) {
		if(intObj[i].select) {
			interval = intObj[i].time;
			break;
		}
	}*/
	const url = _url.addTaskUrl.replace('{hostId}', hostId).replace('{progId}', progId)
		.replace('{name}', name).replace('{start}', begginTime).replace('{end}', endTime).replace('{random}', Math.random());
	$http.get(url).then(mes => {
		const data = mes.data;
		if(/null/.test(data)) return;
		const id = data.id,
			realUrl = _url.getTaskRealUrl.replace('{hostId}', hostId)
				.replace('{progId}', progId).replace('{taskId}', id).replace('{random}', Math.random());
			$http.get(realUrl).then(realMes => {
				const realData = realMes.data;
				if(/null/.test(realData)) return;
				commit(types.ADD_TASK, { progId, data, realData });
			});
	});
  
}

export const closeProgramPopup = ({ commit }) => {
  commit(types.CLOSE_PROGRAM_POPUP);
}

export const toggleDealInt = ({ commit }, key) => {
  commit(types.TOGGLE_DEAL_INT, key);
}

export const getTaskRecord = ({ commit }, $http) => {
	const fn = () => {
		const since = new Date().Format('yyyy-MM-dd'),
			url = _url.taskRecordsUrl.replace('{since}', since).replace('{random}', Math.random());
		$http.get(url).then(mes => {
			const data = mes.data;
			commit(types.GET_TASK_RECORD, { data, since });
		});
	}

	fn();
	window.getTaskRec = setInterval(() => {
		fn();
	} ,10000);
}

export const getTaskRecBefore = ({ commit }, $http) => {
	const lastDay = new Date().getTime() - 24*60*60*1000,			//暂时只取前一天
		since = new Date(lastDay).Format('yyyy-MM-dd'),
		url = _url.taskRecordsUrl.replace('{since}', since).replace('{random}', Math.random());
	$http.get(url).then(mes => {
		const data = mes.data;
		commit(types.GET_TASK_REC_BEFORE, { data, since });
	});
}

export const toggleRecordPopup = ({ commit }, status) => {
	commit(types.TOGGLE_RECORD_POPUP, status);
}

export const clearFailTask = ({ commit }) => {
	commit(types.CLEAR_FAIL_TASK);
}

export const toggleRecordDay = ({ commit }, key) => {
	commit(types.TOGGLE_RECORD_DAY, key);
}