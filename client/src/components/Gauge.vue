<template>
  <div>
    <VueSvgGauge
      :start-angle="-90"
      :end-angle="90"
      :value=value
      :separator-step=high
      :min=low
      :max=high
      :gauge-color="[{ offset: 0, color: '#00FF00'}, { offset: 100, color: '#FF0000'}]"
      :scale-interval="0"
    >
      <div class="caption">{{numErrors}}</div>
      <div class="needle"></div>
    </VueSvgGauge>
    <div class="title">{{name}}</div>
  </div>
</template>
<script>
import { VueSvgGauge } from 'vue-svg-gauge';

export default {
  name: 'gauge',
  props: ['value', 'min', 'max', 'service'],
  components: {
    VueSvgGauge
  },
  data() {
    return {
      val: parseInt(this.value, 10),
      low: parseInt(this.min, 10),
      high: parseInt(this.max, 10),
      scaleFactor: 180 / (parseInt(this.max, 10) - parseInt(this.min, 10)),
      name: this.service
    }
  },
  computed: {
    numErrors: function () {
      return parseInt(this.value, 10);
    }
  },
  watch: {
    value: function(newVal, oldVal) {
      const deg = ((newVal - this.low) * this.scaleFactor ) - 90;
      this.$el.querySelector('.needle').style['-webkit-transform-'] = 'rotate(' + deg + 'deg)';
      this.$el.querySelector('.needle').style.transform = 'rotate(' + deg + 'deg)';
    }
  },
  created: function() {
    
  },
  mounted: function() {
    const deg = ((this.val - this.low) * this.scaleFactor ) - 90;
    this.$el.querySelector('.needle').style['-webkit-transform-'] = 'rotate(' + deg + 'deg)';
    this.$el.querySelector('.needle').style.transform = 'rotate(' + deg + 'deg)';
  }
}
</script>
<style scoped>
.caption {
  text-align: center;
  position: relative;
  top: 4em;
  color: white;
}

.title {
  text-align: center;
  color: white;
  font-weight: 800;
  font-size: 1.25rem;
  position: relative;
  top: 1.25rem;
}

.needle {
  color: white;
  font-size: 2em;
  background: rgba(255, 0, 0, 0.5);
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
  left: 49.5%;
  width: 1%;
  height: 100%;
  transform-box: fill-box;
  -webkit-transform-origin: bottom center;
  transform-origin: bottom center;
}

.needle::before {
  content: "";
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: black;
  position: fixed;
  left: -3px;
  bottom: 0;
}
</style>

