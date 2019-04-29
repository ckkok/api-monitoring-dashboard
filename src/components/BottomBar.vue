<template>
    <div id="bottom-bar">
        <router-link to="/api-status-dashboard" class= "menu-icon">Real-time monitoring</router-link>
        <div class= "menu-icon">Past 24 hours</div>
        <router-link to="/map-dashboard" class= "menu-icon">Mapping Dashboard</router-link>
    </div>
</template>

<script>
export default {
    name:'bottom-bar'
}
</script>
<style scoped>
#bottom-bar {
    display:inline-flex;
    position: fixed;
    left:0;
    right:0;
    bottom:0;
    height:35px;
    border-top:solid 1px rgba(128, 128, 128, 0.63);
    background-color: rgba(255,255,255,1);
    -webkit-box-shadow: 0px -1px 1px rgba(50, 50, 50, 0.75);
    -moz-box-shadow: 0px -1px 1px rgba(50, 50, 50, 0.75);
    z-index: 1000;
}

#bottom-bar .menu-icon {
    margin:auto 10px auto;
    font-weight:bold;
    cursor: pointer;
}
</style>
