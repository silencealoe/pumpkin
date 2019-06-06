<template>
  <div id="storybar">
    <ul class="storybar">
      <li><router-link to="/story/recommend" tag="span" activeClass="select">推荐</router-link></li>
      <li><router-link to="/story/newest" tag="span" activeClass="select" >最新</router-link></li>
    </ul>
  </div>
</template>
<style lang="scss" scoped>
    .storybar{
       width:100%;
       display: flex;
       li{
           width:50%;
           text-align: center;
           height:45px;
           line-height: 45px;

       }
       span{
           display:inline-block;
           height: 45px;

       }
       span.select{
           color:#f7644a;
           border-bottom: 2px solid #f7644a;
       }
   }
</style>
