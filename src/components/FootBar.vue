<template>
  <div id="footerbar">
      <ul v-show="$store.state.footerShow">
        <router-link to="/story" tag="li" activeClass="active" ><Icon type="md-book" size="20" /><span>故事</span></router-link>
        <router-link to="/theme" tag="li" activeClass="active" ><Icon type="ios-star-outline" size="20"/><span>主题</span></router-link>
      </ul>
  </div>

</template>
<script>

export default {

}
</script>

<style lang="scss" scoped>
ul{
     width: 100%;
     position: fixed;
     left:0;
     bottom: 0;
     z-index:100;
     display: flex;
     background:white;
 }
ul li{
    height:45px;
    width:50%;
    text-align: center;
    span{
        display: block;
        font-size: 16px;
    }
 }
 li.active{
   color:#f7644a;
 }

</style>
