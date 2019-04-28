<template>
  <vue-highcharts :options="options" ref="chart" :highcharts="Highcharts"></vue-highcharts>
</template>
<script>
import VueHighcharts from 'vue2-highcharts';
import More from 'highcharts/highcharts-more';
import Highcharts from 'highcharts';

More(Highcharts);

export default {
  name: 'gauge',
  props: ['value', 'min', 'max', 'service'],
  components: {
    VueHighcharts
  },
  data() {
    return {
      options: {
        chart: {
          type: 'gauge',
          plotBackgroundColor: null,
          plotBackgroundImage: null,
          plotBorderWidth: 0,
          plotShadow: false,
        },

        title: {
          text: this.service,
        },

        pane: {
          startAngle: -150,
          endAngle: 150,
          background: [
            {
              backgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [[0, '#FFF'], [1, '#333']],
              },
              borderWidth: 0,
              outerRadius: '109%',
            },
            {
              backgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [[0, '#333'], [1, '#FFF']],
              },
              borderWidth: 1,
              outerRadius: '107%',
            },
            {
              // default background
            },
            {
              backgroundColor: '#DDD',
              borderWidth: 0,
              outerRadius: '105%',
              innerRadius: '103%',
            },
          ],
        },

        // the value axis
        yAxis: {
          min: parseInt(this.min, 10),
          max: parseInt(this.max, 10),

          minorTickInterval: 'auto',
          minorTickWidth: 1,
          minorTickLength: 10,
          minorTickPosition: 'inside',
          minorTickColor: '#666',

          tickPixelInterval: 30,
          tickWidth: 2,
          tickPosition: 'inside',
          tickLength: 10,
          tickColor: '#666',
          labels: {
            step: 2,
            rotation: 'auto',
          },
          title: {
            text: 'errors / min',
          },
          plotBands: [
            {
              from: parseInt(this.min, 10),
              to: parseInt(this.min, 10) + ((parseInt(this.max, 10) - parseInt(this.min, 10)) / 3),
              color: '#55BF3B', // green
            },
            {
              from: parseInt(this.min, 10) + ((parseInt(this.max, 10) - parseInt(this.min, 10)) / 3),
              to: parseInt(this.min, 10) + (2 * (parseInt(this.max, 10) - parseInt(this.min, 10)) / 3),
              color: '#DDDF0D', // yellow
            },
            {
              from: parseInt(this.min, 10) + (2 * (parseInt(this.max, 10) - parseInt(this.min, 10)) / 3),
              to: parseInt(this.max, 10),
              color: '#DF5353', // red
            },
          ],
        },

        series: [
          {
            name: this.service,
            data: [parseInt(this.value, 10)],
            tooltip: {
              valueSuffix: ' / min',
            },
          },
        ],
      },
      Highcharts
    }
  }
}
</script>
<style scoped>

</style>
