<template>
<div id="story">
    <Storybar></Storybar>
    <router-view></router-view>
</div>

</template>
<script>
import Storybar from '../../components/storybar'
export default {
  components: {
    Storybar
  }

}
</script>
<style lang="scss" scoped>

</style>
