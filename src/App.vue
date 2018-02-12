<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {

    };
  },
};
</script>

<style>
  #app {
    background: url(./assets/images/bg2.png) no-repeat;
    height: 1080px;
    width: 1920px;
    overflow: hidden;
    position: relative;
  }
</style>
