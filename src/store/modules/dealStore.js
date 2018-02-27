import * as actions from '../actions/dealAct'
import * as getters from '../getters/dealGetters'

import {
  INIT_DEAL_MENU,
  INIT_DEAL_INFO,
  INIT_DEAL_REAL,
  TOGGLE_DEAL_MENU,
  TOGGLE_DEAL_LIST,
  TOGGLE_PROG_TIPS,
  OPEN_TASK_POPUP,
  CHANGE_TASK_RECORD,
  SHOW_DETAIL_RECORD,
  CLOSE_TASK_POPUP,
  OPEN_PROGRAM_POPUP,
  CLOSE_PROGRAM_POPUP,
  TOGGLE_DEAL_INT,
  CHANGE_TASK_STATUS,
  DEL_TASK,
  ADD_TASK,
  GET_TASK_RECORD,
  GET_TASK_REC_BEFORE,
  TOGGLE_RECORD_POPUP,
  CLEAR_FAIL_TASK,
  TOGGLE_RECORD_DAY,
} from '../mutation-types'

const state = {
  menu: {},           //菜单
  selectList: null,   //选中二级目录   hostid
  equipInfo: {},      //是数据信息
  display: {          //窗口显示
    popup: false,
    operaPopup: false,
    recordPopup: false,
  },
  dealServer: {       //弹窗选中数据
    key: null,
    subKey: null
  },  
  taskRecord: {},     //任务记录
  recordReason: {},   //详细任务原因
  dealProgram: null,  //操作弹窗选中数据
  interval: {         //时间间隔
    5: { text: '5分钟', time: 300000, select: false },
    10: { text: '10分钟', time: 600000, select: true },
    1440: { text: '1天', time: 86400000, elect: false }
  },
  latestFailTask: {},     //最新失败任务
  globalTaskRecord: {},   //最近4天任务记录
}

const mutations = {
  [INIT_DEAL_MENU](state, data) {
    let obj = {};
    for(let info of data) {
      if(!obj[info.group])  obj[info.group] = { select: false, list: {} };
      obj[info.group].list[info.id] = { text: info.name, select: false };
    }
    const firstKey = Object.keys(obj)[0],
      firstSubKey = Object.keys(obj[firstKey].list)[0];
    obj[firstKey].select = obj[firstKey].list[firstSubKey].select = true;
    state.selectList = firstSubKey;
    state.menu = Object.assign({}, obj);
  },
  [INIT_DEAL_INFO](state, data) {
    let obj = {};
    for(let info of data) {
      const id = info.id;
      obj[id] = { 
        name: info.name, 
        cname: info.cname,
        desc: info.desc,
        descShow: false,
        tasks: {}, 
        firstTaskKey: info.tasks[0].id,
      };
      for(let task of info.tasks) {
        obj[id].tasks[task.id] = task;
      }
      obj[id].taskNum = Object.keys(obj[id].tasks).length;
    }
    state.equipInfo = Object.assign({}, obj);
  },
  [INIT_DEAL_REAL](state, data) {
    const equipInfo = state.equipInfo;
    for(let info of data) {
      for(let deal of info.tasks) {
        let obj = equipInfo[info.progId].tasks[deal.id];
        obj = Object.assign({}, deal, obj);
        equipInfo[info.progId].tasks[deal.id] = obj;
      }
    }
    //state.equipInfo = Object.assign({}, state.equipInfo);
  },
  [TOGGLE_DEAL_MENU](state, key) {
    const menu = state.menu;
    if(menu[key].select) {
      menu[key].select = false;
      return;
    }
    for(let i in menu) {
      menu[i].select = i === key;
    }
  },
  [TOGGLE_DEAL_LIST](state, subKey) {
    const menu = state.menu;
    for(let i in menu) {
      const list = menu[i].list;
      for(let j in list) {
        list[j].select = j === subKey;
      }
    }
    state.selectList = subKey;
  },
  [TOGGLE_PROG_TIPS](state, {key, status}) {
    state.equipInfo[key].descShow = status;
  },
  [OPEN_TASK_POPUP](state, {key, subKey, data}) {
    state.dealServer.key = key;
    state.dealServer.subKey = subKey;
    state.display.popup = true;
    let obj = {};
    for(let item of data) {
      obj[item.datetime] = Object.assign(item, {select: false});
    }
    state.taskRecord = obj;
    console.log(state.taskRecord);
  },
  [CHANGE_TASK_RECORD](state, data) {
    const recordArr = Object.keys(state.taskRecord);
    state.taskRecord[data.datetime] = Object.assign(data, {select: false});
    state.taskRecord = Object.assign({}, state.taskRecord);
  },
  [SHOW_DETAIL_RECORD](state, key) {
    const taskRecord = state.taskRecord;
    for(let i in taskRecord) {
      taskRecord[i].select = i === key;
    }
    state.recordReason = taskRecord[key];
  },
  [CLOSE_TASK_POPUP](state) {
    state.display.popup = false;
    state.recordReason = {};
  },
  [OPEN_PROGRAM_POPUP](state, {key}) {
    state.dealProgram = key;
    state.display.operaPopup = true;
  },
  [CLOSE_PROGRAM_POPUP](state) {
    state.display.operaPopup = false;
  },
  [TOGGLE_DEAL_INT](state, key) {
    const interval = state.interval;
    for(let i in interval) {
      interval[i].select = i === key;
    }
  },
  [CHANGE_TASK_STATUS](state, {info, real, progId, taskId}) {
    let obj = Object.assign(info, real);
    state.equipInfo[progId].tasks[taskId] = obj;
    console.log(obj);
  },
  [DEL_TASK](state, {progId,taskId}) {
    delete state.equipInfo[progId].tasks[taskId];
    const tasksArr = Object.keys(state.equipInfo[progId].tasks);
    state.equipInfo[progId].taskNum = tasksArr.length;
    state.equipInfo[progId].firstTaskKey = tasksArr[0];
    state.equipInfo = Object.assign({}, state.equipInfo);
  },
  [ADD_TASK](state, {progId, data, realData}) {
    const info = state.equipInfo[progId];
    let obj = {};
    obj = Object.assign(data, realData);
    info.tasks[obj.id] = obj;
    info.tasks = Object.assign({}, info.tasks);
    const tasksArr = Object.keys(info.tasks);
    info.taskNum = tasksArr.length;
    info.firstTaskKey = tasksArr[0];
  },
  [GET_TASK_RECORD](state, { data, since }) {
    const failTask = state.latestFailTask;
    for(let info of data) {
      if(info.status === 'FAILED' && (!failTask.datetime || info.datetime > failTask.datetime))
        state.latestFailTask = info;
      info.datetime = new Date(info.datetime).Format('HH:mm');
    }
    data.reverse();
    state.globalTaskRecord[since] = Object.assign({ select: true, list: data });
    state.globalTaskRecord = Object.assign({}, state.globalTaskRecord);
  },
  [GET_TASK_REC_BEFORE](state, { data, since }) {
    const endTime = new Date(since).getTime() + 24*60*60*1000;
    let arr = [];
    for(let info of data) {
      if(info.datetime < endTime) arr.push(info);     //筛选当天数据
    }
    for(let info of arr) {
      info.datetime = new Date(info.datetime).Format('HH:mm');
    }
    state.globalTaskRecord[since] = Object.assign({ select: false, list: arr });
    state.globalTaskRecord = Object.assign({}, state.globalTaskRecord);
  },
  [TOGGLE_RECORD_POPUP](state, status) {
    state.display.recordPopup = status;
  },
  [CLEAR_FAIL_TASK](state) {
    state.latestFailTask = {};
  },
  [TOGGLE_RECORD_DAY](state, key) {
    state.globalTaskRecord[key].select = !state.globalTaskRecord[key].select;
  },
}

export default {
  state,
  mutations,
  actions,
  getters
}