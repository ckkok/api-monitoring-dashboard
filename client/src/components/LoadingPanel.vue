<template>
  <div id="loading-panel-wrapper">
    <div class="content">
      LOADING...
    </div>
  </div>
</template>
<script>
export default {
  name: 'loading-panel',
  data: function() {
    return {
      done: false
    }
  },
  created: function() {
    setTimeout(() => this.done = true, 1500);
  }
}
</script>
<style scoped>
#loading-panel-wrapper {
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: black;
}

.content {
  text-align: center;
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
}
</style>
