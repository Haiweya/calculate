import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
const types={
  SET_AUTHENTICATIED :"SET_AUTHENTICATIED",
  SET_USER :"SET_USER"
}
const state={
  isauthenticated :false,
  user:{}
};
const getters={
  isauthenticated: state => state.isauthenticated,
  user: state=>state.user
};

// mutations  变化  方括号内是个变量的形式
const mutations={
  [types.SET_AUTHENTICATIED](state,isauthenticated){
    if(isauthenticated) state.isauthenticated=isauthenticated;
    else state.isauthenticated=false
  },
  [types.SET_USER](state,user){
    if(user) state.user=user;
    else state.user ={}
  }
};

// 必须要用commit(‘SET_TOKEN’, tokenV)调用mutations里的方法，才能在store存储成功。
//action 处理vuex中的异步问题，mutation中不允许使用使用异步代码，但可以在action中提交一个conmmit
const actions={
  setAuthenticated :({commit},isauthenticated)=>{
    commit(types.SET_AUTHENTICATIED,isauthenticated);
  },
  setUser:({commit},user)=>{
    commit(types.SET_USER,user)
  }
}


export default new Vuex.Store({
 types,
 state,
 getters,
 mutations,
 actions
})
