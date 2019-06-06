<template>
  <div id="themebar">
    <div class="themebarlist">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide themelist active" @click="handleClick()">
            <span>推荐</span>
          </div>
          <div :class="clicked?'swiper-slide themelist  active':'swiper-slide themelist'" @click="handleClick()">
            <span>最新</span>
          </div>
          <div class="swiper-slide themelist" v-for="item in titltlist" @click="handleClick()">
            <span>{{item.name}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Swiper from "swiper";
import "swiper/dist/css/swiper.css";
export default {
  data() {
    return {
      titltlist: [],
      clicked:false
    };
  },
  methods:{
      handleClick(){
          this.clicked=true;
      }
  },
  mounted() {
    axios({
      url: "api/majia/data?cate=topic&file=tag"
    }).then(res => {
      console.log(res.data.data.tag);
      this.titltlist = res.data.data.tag;

      this.$nextTick(() => {
        var swiper = new Swiper(".swiper-container", {
          slidesPerView: 6,
          spaceBetween: 0
        });
      });
    });
  }
};
</script>
<style lang="scss">
.themebarlist {
    width:100%;

  .themelist {
    min-width: 30px;
    height: 30px;
    line-height: 30px;
    padding-right: 5px;
    text-align: center;
    span {
      font-size: 15px;
    }
  }
  .active{
      color:#f7644a;
      border-bottom:2px solid #f7644a;
  }
}
</style>


