import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    footerShow:true,
    showUpdate:true

  },
  mutations: {
    changeShow(state,payload){
      state.footerShow=payload;
    },
    changeUpdate(state,payload){
      state.showUpdate=payload;
    }

  },
  actions: {

  }
})
