<template>
  <div id="showupdate">
    <div class="showinfo">
      <transition name="fade">
        <p v-if="showUp" class="updateinfo">{{msg}}</p>
      </transition>
    </div>
  </div>
</template>
<script>
export default {
    props:["msg","showUp"],
  data() {
    return {
    
    };
  },
  mounted(){
      
  
  }

};
</script>
<style lang="scss">
.showinfo {
  position: absolute;
  left: 50%;
  top: 100px;
}
.updateinfo {
  width: 90px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  color: white;
  border-radius: 5px;
  background: #f7644a;
  z-index: 200;
  margin-left: -45px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>


