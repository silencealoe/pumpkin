<template>
  <div id="themebar">
    <div class="themebarlist">
      <div class="swiper-container">
        <div class="swiper-wrapper" ref="themeSwiper">
          <div class="swiper-slide themelist" @click="handleClicknew()">
            <span :class="click?'active':''" v-text="'推荐'" v-show="isShow"></span>
          </div>
          <div :class="['swiper-slide themelist']" @click="handleClick()">
            <span :class="click2?'active':''" v-text="'最新'" v-show="isShow"></span>
          </div>
          <div :class="['swiper-slide themelist']" v-for="(item,index) in titltlist" @click="handleClickindex(item.id,index)" :key="item.id">
            <span :class="currentClass===index?'active':''" v-text="item.name"></span>
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
      click:true, 
      click2:false,
      currentClass:-1,
      isShow:false
    };
  },
  methods: {
    handleClicknew(){
      this.click=true  //点击推荐
      this.click2=false
      this.currentClass=-1
      this.$emit('formRecommend',{click:this.click})

    },
    handleClick(){
      this.click2=true; //点击最新
      this.click=false;
      this.currentClass=-1;
      this.$emit('formNewest',{url:'api/topic/list?order=desc&per_page=20&from_id=2&sortby=add_time&page=1',click2:this.click2})

    },
    handleClickindex(id,index) {
      this.click=false;
      this.click2=false;
      this.currentClass=index;
      this.$emit('formList',{id:id})
    }
  },
  mounted() {
    axios({
      url: "api/majia/data?cate=topic&file=tag"
    }).then(res => {
      console.log(res.data.data.tag);
      this.titltlist = res.data.data.tag;
      this.$nextTick(() => {
        this.isShow=true;
        var swiper = new Swiper(".swiper-container", {
          slidesPerView: 6,
          spaceBetween: 0
          // allowSlidePrev:false
        });
        // window.onmousemove=function(){
        //   // console.log(swiper.getTranslate())
        //   if(swiper.getTranslate()<0){
        //     swiper.allowSlidePrev=true
        //   }
        //   if(swiper.getTranslate()===0){
        //     swiper.allowSlidePrev=false

        //   }
        // }
      })
    });
  }
};
</script>
<style lang="scss" scoped>

.themebarlist {
  width: 100%;


  .swiper-container {
  }

  .themelist {
    // min-width:30px;
    height: 30px;
    line-height: 30px;
    // margin-right: 5px;
    // text-align: center;
    box-sizing: border-box;
    cursor: pointer;
    span {
      font-size: 15px;
      display:inline-block;
      height: 30px;
    }
  }
  .active {
    color: #f7644a;
    border-bottom: 2px solid #f7644a;
  }
}
</style>


