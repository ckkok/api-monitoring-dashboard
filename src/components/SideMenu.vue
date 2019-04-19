<template>
  <div class="side-menu">
    {{ title }}
  </div>
</template>

<script>
export default {
  name: 'side-menu',
  props: ['title']
}
</script>

<style scoped>
.side-menu {
  padding: 0.75em;
  left: 0;
  top: 0;
  height: 100%;
  width: 12rem;
  background-color: black;
  color: white;
  font-weight: 800;
  font-size: 1.5rem;
}
</style>
