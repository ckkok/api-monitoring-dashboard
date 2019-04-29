<template>
  <div id="app">
    <transition-group name="fade" mode="out-in">
      <LoadingPanel key="loadingpanel" v-if="!loaded" />
      <FlashMessagePanel key="msgpanel" v-if="messages" :messages="messages" />
    </transition-group>
    <div id="wrapper">
      <SideMenu v-show="false" title="Dashboard" key="sidepanel" />
      <APIStatusDashboard key="dashboard" :apis="apiList" />
    </div>
    <BottomBar></BottomBar>
  </div>
</template>

<script>
import APIStatusDashboard from './components/APIStatusDashboard';
import SideMenu from './components/SideMenu';
import APIData from './config.json';
import FlashMessagePanel from './components/FlashMessagePanel';
import LoadingPanel from './components/LoadingPanel';
import BottomBar from './components/BottomBar';

export default {
  name: 'app',
  components: {
    APIStatusDashboard, SideMenu, FlashMessagePanel, LoadingPanel, BottomBar
  },
  data: function() {
    return {
      apiList: APIData.apis, 

      messages: [], 
      loaded: false
    }
  },
  created: function() {
    setTimeout(() => this.loaded = true, 1500);
    setTimeout(() => this.messages.push('TEST MESSAGE - Something went wrong'), 3000);
    setTimeout(() => this.messages.pop(), 5000);
  }
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
  width: 100%;
}

#wrapper {
  display: flex;
  width: 100%;
  height: 100%;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
