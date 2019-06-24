<template>
  <div id="theme">
    <ThemeBar @formNewest="formnewest" @formRecommend="formrecommend" @formList="formlist"></ThemeBar>

    <div class="themcontent">
      <ul class="contentlist">
        <li class="content-item clear" v-for="item in themecontentlist" :key="item.id">
          <div class="content-left fl">
            <div class="content-title">
              <h2>{{item.fifteen_words_title}}</h2>
            </div>
            <p>
              <span>{{item.interact_count}}</span>人互动
              .
              <span>{{item.story_count}}</span>个故事
            </p>
          </div>
          <div class="content-right fr">
            <img :src="item.images" alt>
          </div>
        </li>
      </ul>
    </div>
    <BackTop :bottom="70" :right="20"></BackTop>
  </div>
</template>
<script>
import axios from "axios";
import ThemeBar from "../components/themebar";
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      url: null,
      isRe: true
    };
  },
  components: {
    ThemeBar
  },
  computed: {
    ...mapState(["themecontentlist"])
  },
  methods: {
    ...mapActions(["getThemerecommend", "getThemeNewest", "getThemeothers"]),
    formnewest(data) {
      console.log(data);
      this.getThemeNewest(data.url);
    },
    formrecommend(data) {
      this.getThemerecommend();
    },
    formlist(data) {
      console.log(data.id);
      this.getThemeothers(data.id);
    }
  },
  mounted() {
    this.getThemerecommend();
    // this.getThemeNewest('aaa')
  }
};
</script>
<style lang="scss" scoped>
.contentlist {
  // padding: 10px 0;
  .content-item {
    padding: 10px 0;
    border-bottom: 1px solid #f1f1f1;

    .content-left {
      width: 217px;
      .content-title {
        margin-bottom: 20px;
        h2 {
          font-size: 16px;
          font-weight: normal;
        }
      }
      p {
        color: #999;
        span {
          color: #333;
        }
      }
    }
    .content-right {
      width: 118px;
      img {
        width: 100%;
        height: 75px;
      }
    }
  }
}
</style>
