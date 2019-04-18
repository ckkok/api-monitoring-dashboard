<template>
  <div class="message-panel-wrapper">
    <transition-group name="fade" mode="out-in">
      <div class="message-panel" v-for="message in messages" :key="message">
        <div class="message">
          {{ message }}
        </div>
      </div>
    </transition-group>
  </div>
</template>
<script>
export default {
  name: 'flash-message-panel',
  props: ['messages']
}
</script>
<style scoped>
.message-panel-wrapper {
  position: static;
  top: 0;
  left: 0;
  width: 100%;
}

.message-panel {
  width: 100%;
  background-color: orangered;
  padding: 0.25rem;
}

.message {
  color: white;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
