import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// types，此用于在浏览器的vue中调试使用
const types = {
  SET_LOCATION: 'SET_LOCATION'
};

// state
const state = {
  location: {}
};

// getters
const getters = {
  // 当前位置
  location: state => state.location
};

// mutations
const mutations = {
  // [types.SET_LOCATION]也为方法的一种调用方式
  [types.SET_LOCATION](state, location) {
    if (location) {
      state.location = location;
    } else {
      state.location = null;
    }
  }
};

// actions
const actions = {
  setLocation: ({ commit }, location) => {
    commit(types.SET_LOCATION, location);
  }
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});
