<template>
  <div id="newest">
    <ul class="newlist">
      <li v-for="datas in newlist"  class="newlist-item" :key="datas.id">
        <div class="recommend-title">
          <Exclusive v-show="datas.exclusive"></Exclusive>
          <Heat v-show="datas.heat">热门</Heat>
          {{datas.info_flow_title}}
        </div>
        <div class="recommend-img">
          <img :src="datas.default_image" alt>
        </div>
        <div class="recommend-userinfo clear">
          <div class="avator-name-other fl">
            <img :src="datas.user.avatar" alt>
            <span>{{datas.user.name}}</span>
          </div>
          <div class="read-like fr">
            <span>{{datas.view_count}}</span>人阅读
            .
            <span>{{datas.praise_count}}</span>人喜欢
          </div>
        </div>
      </li>
    </ul>
       <BackTop :bottom="70" :right="20"></BackTop>
  </div>
</template>

<script>
import { mapActions,mapState} from "vuex";
import Exclusive from '@/components/Exclusive'
import Heat from '@/components/Heat'
export default {
  data() {
    return {
      newestlist:[]
    };
  },
  computed: {
      ...mapState(['newlist'])
    
  },
  components:{
    Heat,
    Exclusive
  },
 methods:{
      ...mapActions(["getnewdata"])
   
 },
 created(){
   this.getnewdata()
 }
};
</script>
<style lang="scss" scoped>
.newlist {
  background: #f0f0f0;
  width: 100%;
  .newlist-item {
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
.loading {
  height:100px;
  background: #f0f0f0;
  text-align: center;
  font-size: 20px;
}


</style>


