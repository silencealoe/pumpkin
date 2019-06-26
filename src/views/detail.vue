<template>
  <div id="detail">
    <div class="story_topic">
      <span class="gray">来自主题:</span>
      <span>{{storytopic}}</span>
    </div>
    <div class="story_detail">
      <h2>{{storytitle}}</h2>
      <div class="userinfo clear">
        <div class="avator fl">
          <img :src="avator" alt>
        </div>
        <p class="username fl">{{username}}</p>
        <p class="addtime fr">{{addtime}}</p>
      </div>
      <div class="story_block">
        <span class="point tl">“</span>
        <h3>{{imgtext}}</h3>
        <span class="point tr">”</span>
      </div>
      <div :class="['story_content',isOpen?'':'overflow-h']" v-html="storycontent"></div>
      <div class="close_collapse_btn" @click="handleClose()" v-show="!isOpen">
        <p>
          <Icon type="ios-arrow-down" size="40" color="#ccc"></Icon>
        </p>
        <p class="up">
          <Icon type="ios-arrow-down" size="40" color="#ea6f5a"></Icon>
        </p>
      </div>
      <div class="praise_people_wrap">
        <p class="praise_people">
          ————
          <span class="praise_nums">{{praisenums}}</span> 人喜欢————
        </p>
      </div>
      <ul class="praise_list">
        <li v-for="uitem in userdata.slice(0,24)" class="praise_item" :key="uitem.id">
          <img :src="uitem.avatar
          " alt>
        </li>
      </ul>
      <div class="fromtheme">
        <p class="gray from-th">来自主题</p>
        <h3 class="themetitle">{{storytopic}}</h3>
        <ul class="storydata-list">
          <li
            v-for="sdata in storydata.slice(0,3)"
            class="storydata_item"
            :key="sdata.id"
          >{{sdata.title}}</li>
        </ul>
        <div class="lookmore-data">查看全部{{story_count}}个故事&gt;&gt;</div>
      </div>
    </div>
    <div class="story_comment">
      <h2 class="comment_title">留言</h2>
      <ul class="comment_list">
        <li class="comment_item clear" v-for="citem in comments" :key="citem.id">
          <div class="comment_avatar fl">
            <img :src="JSON.parse(citem.user_info).img_url" alt>
          </div>
          <div class="comment_name_content fl">
            <p class="comment_name">{{JSON.parse(citem.user_info).nick_name}}</p>
            <p class="comment_content">{{citem.message}}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import qs from "qs";
export default {
  data() {
    return {
      storytopic: "",
      storytitle: "",
      avator: "",
      username: "",
      addtime: "",
      imgtext: "",
      storycontent: "",
      praisenums: "",
      storydata: [],
      story_count: 0,
      userdata: [],
      comments: [],
      isOpen: false
    };
  },
  methods: {
    handleClose() {
      this.isOpen = true;
    }
  },
  mounted() {
    this.$store.commit("changeShow", false);
    console.log(this.$route.query);
    axios({
      url: `/api/story/detail?story_id=${this.$route.query.storyid}&from_id=2`
    }).then(res => {
      console.log(res.data);
      this.storytitle = res.data.data.title;
      this.avator = res.data.data.user.avatar;
      this.username = res.data.data.user.name;
      this.imgtext = res.data.data.default_image_text;
      this.storycontent = res.data.data.content;
      this.praisenums = res.data.data.praise_count;
      var time = res.data.data.add_time;
      console.log(time.split(" ")[0]);
      var timearr = time.split(" ")[0].split("-");
      console.log(timearr);
      var month = timearr[1].split("")[1];
      var day = timearr[2].split("")[1];
      this.addtime = timearr[0] + "年" + month + "月" + day + "日";
    });
    axios({
      url: `api/topic/detail?topic_id=${this.$route.query.topicid}&from_id=2`
    }).then(resp => {
      console.log(resp.data);
      this.storytopic = resp.data.data.title;
      this.storydata = resp.data.data.story_data;
      this.story_count = resp.data.data.story_count;
    });
    axios({
      url: `api/praise/list?order=desc&per_page=25&story_id=${
        this.$route.query.storyid
      }`
    }).then(re => {
      console.log(re.data);
      this.userdata = re.data.data.user_data;
    });
    axios({
      url: "/comment/lists",
      method: "post",
      params: {
        type: 1,
        num: 10,
        sub_limit: 5,
        from: 3,
        client_id: 15,
        page: 1,
        page_key: "pumpkin_MNjXQEq6L3C7OD",
        url: "pumpkin_MNjXQEq6L3C7OD"
      },
      paramsSerialize: function(params) {
        //将数据转换为formdata格式
        return qs.stringify(params, { arrayFormat: "brackets" });
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then(r => {
      console.log(r.data.data.comments);
      this.comments = r.data.data.comments;
      var arr = r.data.data.comments[0].user_info;
      console.log(arr);
      console.log(JSON.parse(arr).img_url);
    });
  },
  beforeDestroy() {
    this.$store.commit("changeShow", true);
  }
};
</script>
<style lang="scss">
#detail {
  background: #f0f0f0;
  color: black;
  .story_topic {
    font-size: 16px;
    padding: 10px 0;
    background: white;
    margin-bottom: 10px;
  }
  .story_detail {
    background: white;
    padding: 0 0 40px 0;
    h2 {
      padding: 20px 0;
      font-size: 24px;
    }
    .userinfo {
      .avator {
        margin-right: 10px;
        img {
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }
      }
      .username {
        height: 30px;
        line-height: 30px;
        font-size: 14px;
      }
      .addtime {
        height: 30px;
        line-height: 30px;
        color: #ccc;
      }
    }
    .story_block {
      width: 100%;
      min-height: 92px;
      background: #fafafa;
      padding: 5px 10px;
      margin-bottom: 20px;
      h3 {
        font-size: 16px;
        text-align: center;
      }
      .point {
        font-size: 20px;
        font-weight: bold;
        display: block;
      }
      .tl {
        text-align: left;
      }
      .tr {
        text-align: right;
      }
    }
    .overflow-h {
      height: 750px;
      position: relative;
    }
    .overflow-h:after {
      width: 100%;
      height: 100px;
      background-image: linear-gradient(0deg, #fff, hsla(0, 0%, 100%, 0));
      content: "";
      z-index: 1;
      position: absolute;
      left: 0;
      bottom: -1px;
    }
    .close_collapse_btn {
      width: 100%;
      height: 50px;
      text-align: center;
      position: relative;
      i {
        display: block;
      }
      .up {
        margin-top: -28px;
      }
    }
    .story_content {
      font-size: 16px;
      text-align: justify;
      overflow: hidden;
      p {
        margin-bottom: 10px;
      }
      img {
        width: 100%;
      }
    }
    .praise_people_wrap {
      padding: 20px 0;
      .praise_people {
        text-align: center;
        color: #ccc;
        font-size: 15px;
        .praise_nums {
          color: #f7644a;
        }
      }
    }
    .praise_list {
      width: 240px;
      margin: 0 auto;
      margin-bottom: 30px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .praise_item {
        margin-right: 10px;
        img {
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }
      }
    }
    .fromtheme {
      width: 100%;
      min-height: 220px;
      padding: 15px;
      background: linear-gradient(90deg, #fafafa, #fff);
      border-radius: 10px;
      font-size: 16px;
      border: 1px solid #ddd;

      .from-th {
        margin-bottom: 5px;
      }
      .themetitle {
        font-size: 19px;
      }
      .storydata-list {
        .storydata_item {
          font-size: 15px;
          position: relative;
          padding-left: 12px;
          color: #333;
        }
        .storydata_item:before {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: black;
          content: "";
          display: block;
          position: absolute;
          left: 0;
          top: 8px;
        }
      }
      .lookmore-data {
        color: #f7644a;
        font-size: 12px;
        text-align: center;
        padding: 10px 0;
      }
    }
  }
  .story_comment {
    padding: 26px;
    .comment_title {
      margin-bottom: 10px;
    }
    .comment_list {
      .comment_item {
        font-size: 15px;
        margin-bottom: 15px;
        .comment_avatar {
          margin-right: 10px;
          img {
            width: 30px;
            height: 30px;
            border-radius: 50%;
          }
        }
        .comment_name_content {
          width: 270px;
          .comment_name {
            font-weight: bold;
          }
          .comment_content {
            color: #666;
          }
        }
      }
    }
  }

  .gray {
    color: #999;
  }
}
</style>
