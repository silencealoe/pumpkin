import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    footerShow: true,
    showUpdate: true,
    newlist: [],
    themecontentlist: []
  },
  mutations: {
    changeShow(state, payload) {
      state.footerShow = payload;
    },
    changeUpdate(state, payload) {
      state.showUpdate = payload;
    },
    changeNewlist(state, payload) {
      state.newlist = payload

    },
    changeThemeRe(state, payload) {
      state.themecontentlist = payload.data.data
    },
    changeThemeNe(state, payload) {
      state.themecontentlist = payload.data.topic_data
    },
    changeThemeOt(state,payload){
      state.themecontentlist=payload.data.topic_data
    }

  },
  actions: {
    async getnewdata({
      commit
    }) {
      await axios({
        method: 'GET',
        url: 'api/story/list?order=desc&per_page=10&from_id=2&page=1&sortby=add_time'
      }).then(res => {
        console.log('newest', res.data)
        commit('changeNewlist', res.data.data.story_data)
      })

    },
    async getThemerecommend({
      commit
    }) {
      await axios({
        url: `api/recommend/topicList?per_page=20&page=1&user_id=50eaa6d8b4a5604e24bd659530521cc6&session_id=5e543256c480ac577d30f76f9120eb741561101012743
        `
      }).then(res => {
        console.log(res.data.data.data)
        commit('changeThemeRe', res.data)
      })
    },
    async getThemeNewest({
      commit
    }, params) {
      await axios({
        url: params

      }).then(res => {
        console.log('asdd')
        console.log(res.data)
        commit('changeThemeNe', res.data)

      })

    },
    async getThemeothers({commit},params){
      await axios({
        url:`api/tag/topicList?sortby=heat&per_page=20&from_id=1&order=desc&tag_id=${params}&page=1`
      }).then(res=>{
        console.log(res.data)
        commit('changeThemeOt',res.data)
      })
    }
  }
})
