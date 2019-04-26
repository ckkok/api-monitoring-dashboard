<template>
    <div id="bottom-bar">
        <div class= "menu-icon">Real-time monitoring</div>
        <div class= "menu-icon">Past 24 hours</div>
        <div class= "menu-icon">Mapping Dashboard</div>
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
}
</style>
