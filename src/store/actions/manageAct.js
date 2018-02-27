import * as types from '../mutation-types'
import _url from '../../conf/url'

export const initManageMenu = ({ commit }, $http) => {
	const url = _url.getMdbStructureUrl.replace('{random}', Math.random());
	$http.get(url).then(mes => {
		const data = mes.data;
		if(/null/.test(data)) return;
		commit(types.INIT_MANAGE_MENU, data);
	});
}

export const initManageHostInfo = ({ commit }, { $http, hostId }) => {
	if(window.manageHost) {
		window.clearInterval(window.manageHost);
		delete window.manageHost;
	}
	window.manageHost = setInterval(() => {
		const url = _url.getHostInfoUrl.replace('{hostId}', hostId).replace('{random}', Math.random());
		$http.get(url).then(mes => {
			const data = mes.data;
			if(/null/.test(data)) return;
			commit(types.INIT_MANAGE_HOST_INFO, data);
		});
	} ,1000);
}

export const toggleManageMenu = ({ commit }, key) => {
  commit(types.TOGGLE_MANAGE_MENU, key);
}

export const toggleManageList = ({ commit }, {key, subKey}) => {
  commit(types.TOGGLE_MANAGE_LIST, {key, subKey});
}

export const toggleBanner = ({ commit }, num) => {
  commit(types.TOGGLE_BANNER, num);
}

export const changeBanner = ({ commit }, status) => {
  commit(types.CHANGE_BANNER, status);
}