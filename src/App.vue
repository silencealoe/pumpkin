<template>
  <div id="app">
    <FootBar></FootBar>
    <router-view/>
  </div>
</template>
<script>
import FootBar from './components/FootBar'
import { login } from './api/testApi'
export default {
  data () {
    return {

    }
  },
  components: {
    FootBar
  },
  mounted(){
    login().then((res)=>{
      console.log(res);
    })
  }

}
</script>

<style lang="scss">
*{
  padding:0;
  margin:0;
}
#app{
  padding:0 10px;
}
body{
  color: black !important;
}
ul li{
  list-style: none;
}
.fl{
  float: left;
}
.fr{
  float: right;
}
.clear:after{
  display: block;
  content:'';
  clear:both;
}
</style>
