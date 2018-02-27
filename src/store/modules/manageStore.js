import * as actions from '../actions/manageAct'
import * as getters from '../getters/manageGetters'

import {
  INIT_MANAGE_MENU,
  INIT_MANAGE_HOST_INFO,
  TOGGLE_MANAGE_MENU,
  TOGGLE_MANAGE_LIST,
  TOGGLE_BANNER,
  CHANGE_BANNER,
} from '../mutation-types'

const state = {
  menu: {},
  selectHostId: null,
  bannerNum: 0,
  info: {},
}

const mutations = {
  [INIT_MANAGE_MENU](status, data) {
    for(let i in data) {
      if(i === 'replicaSets') break;
      let obj = {};
      for(let info of data[i]) {
        obj[info.id] = Object.assign(info, { select: false });
      }
      state.menu[i] = Object.assign({ select: false, list: obj });
    }

    //复制集
    let obj = {};
    data.replicaSets.map((info, index) => {
      obj[index] = { select: false, list: info.hosts, name: info.name };
      //obj.replicaSets = { select: false, list: info.hosts, name: info.name };     //!!!
      for(let item of info.hosts) {
        item.select = false;
      }
    });
    obj = Object.assign({}, obj);
    state.menu = Object.assign({}, state.menu, obj);

    //初始显示第一个目录
    const menu = state.menu,
      firstMenuKey = Object.keys(menu)[0];
    menu[firstMenuKey].select = true;
    const firstListKey =  Object.keys(menu[firstMenuKey].list)[0];
    state.selectHostId = firstListKey;
    menu[firstMenuKey].list[firstListKey].select = true;
    state.menu = Object.assign({}, state.menu);
    console.log(state.menu);
  },
  [INIT_MANAGE_HOST_INFO](state, data) {
    state.info = Object.assign({}, data);
  },
  [TOGGLE_MANAGE_MENU](state, key) {
    const menu = state.menu;
    if(menu[key].select) {
      menu[key].select = false;
      return;
    }
    for(let i in menu) {
      menu[i].select = i === key;
    }
  },
  [TOGGLE_MANAGE_LIST](state, {key, subKey}) {
    const menu = state.menu;
    for(let i in menu) {
      const list = menu[i].list;
      for(let j in list) {
        list[j].select = j === false;
      }
    }
    menu[key].list[subKey].select = true;
  },
  [TOGGLE_BANNER](state, num) {
    state.bannerNum = num;
  },
  [CHANGE_BANNER](state, status) {
    if(status && !state.bannerNum) state.bannerNum ++;
    else if(!status && state.bannerNum) state.bannerNum --;
  },
}

export default {
  state,
  mutations,
  actions,
  getters
}
