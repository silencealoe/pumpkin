<template>
  <div id="recommend">
    <!-- <div class="infinite-list-wrapper"> -->
      <ul
        class="list"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="disable"
        infinite-scroll-distance="0"
        infinite-scroll-immediate-check="false"
      >
        <li v-for="data in recommendlist" class="list-item" @click="handleclick(data.id,data.topic.id)" :key="data.id">
          <div class="recommend-title">
            <span class="special-tag exclusive" v-show="data.exclusive?!isExclusive:isExclusive">独家</span>
            <span class="special-tag" v-show="data.hot?!isHot:isHot">热门</span>
            {{data.info_flow_title}}
          </div>
          <div class="recommend-img">
            <img :src="data.default_image" alt>
          </div>
          <div class="recommend-userinfo clear">
            <div class="avator-name-other fl">
              <img :src="data.user.avatar" alt>
              <span>{{data.user.name}}</span>
            </div>
            <div class="read-like fr">
              <span>{{data.view_count}}</span>人阅读
              .
              <span>{{data.praise_count}}</span>人喜欢
            </div>
          </div>
        </li>
      </ul>
      <p v-if="disable" class="loading">加载中...</p>
      <p v-if="nomore">没有更多了</p>
      <BackTop :bottom="50" :right="20"></BackTop>

    <!-- </div> -->
  </div>
</template>
<script>
import axios from 'axios'
import Vue from 'vue'
import infiniteScroll from 'vue-infinite-scroll'
Vue.use(infiniteScroll)
export default {
  data () {
    return {
      recommendlist: [],
      isHot: false,
      isExclusive: false,
      disable: false,
      page_index: 1,
      total: 0,
      nomore: false
    }
  },
  methods: {
    handleclick (storyid, topicid) {
      console.log(storyid, topicid)
      this.$router.push({
        path: '/detail',
        query: {
          storyid,
          topicid
        }
      })
      // this.$router.push({
      //   name:'detail',
      //   params:{
      //     storyid,
      //     topicid

      //   }
      // })
    },
    loadMore () {
      console.log('aaaa')
      this.disable = true
      this.page_index++
      if (this.recommendlist.length === this.total) {
        this.nore = true
        return
      }
      axios({
        url: `api/recommend/storyList?per_page=10&page=${
          this.page_index
        }&user_id=50eaa6d8b4a5604e24bd659530521cc6&session_id=50eaa6d8b4a5604e24bd659530521cc6&action=1`
      }).then(res => {
        this.recommendlist = [...this.recommendlist, ...res.data.data.data]
        console.log(this.recommendlist)
        this.disable = false
      })
    }
  },
  mounted () {
    axios({
      url:
        'api/recommend/storyList?per_page=10&page=1&user_id=50eaa6d8b4a5604e24bd659530521cc6&session_id=50eaa6d8b4a5604e24bd659530521cc6&action=2'
    }).then(res => {
      this.recommendlist = res.data.data.data
      console.log(this.recommendlist)
      this.total = parseInt(res.data.data.page_data.total)
      console.log(this.total)
    })
  }
}
</script>
<style lang="scss" scoped>
.list{
  background: #f0f0f0;
  width: 100%;
  .list-item {
    padding: 20px 10px;
    background: white;
    margin-bottom: 10px;
    .recommend-title {
      font-weight: normal;
      font-size: 20px;
      margin-bottom: 10px;
      .special-tag {
        width: 33px;
        height: 20px;
        display: inline-block;
        font-size: 12px;
        text-align: center;
        line-height: 20px;
        background: orange;
        border-radius: 20px;
        color: white;
      }
      .exclusive {
        background: #f7644a;
        margin-right: 6px;
      }
    }
    .recommend-img {
      min-height: 190px;
      margin-bottom: 10px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .avator-name-other {
      img {
        width: 22px;
        height: 22px;
        border-radius: 50%;
        margin-right: 10px;
      }
    }
    .read-like {
      font-size: 12px;
      color: #999;
      span {
        color: #333;
      }
    }
    .avator-name-other {
      span {
        display: inline-block;
        vertical-align: top;
        font-size: 12px;
        height: 22px;
        line-height: 22px;
        color: #333;
      }
    }
  }
}
.loading{
  height: 100px;
  background: #f0f0f0;
  text-align: center;
  font-size: 20px;
}
</style>
