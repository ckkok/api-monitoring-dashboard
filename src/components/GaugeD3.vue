<template>
  <div>
    <div :id="service" class="meter">
      <div class="inner">
        <div class="caption">{{value}}</div>
      </div>
      <div class="title">{{name}}</div>
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3';

export default {
  name: 'gauge',
  props: ['value', 'min', 'max', 'service','errors'],
  data() {
    return {
      val: parseInt(this.value, 10),
      low: parseInt(this.min, 10),
      high: parseInt(this.max, 10),
      name: this.service,
      gauge: null
    }
  },
  methods: {
    createGauge(container, configuration) {
      const config = {
        ringInset: 20,
        ringWidth: 20,
        pointerWidth: 10,
        pointerTailLength: 5,
        pointerHeadLengthPercent: 0.9,
        minValue: 0,
        maxValue: 100,
        minAngle: -90,
        maxAngle: 90,
        transitionMs: 150,
        majorTicks: 1,
        numSegments: 3,
        ticks: 3,
        labelFormat: d3.format(','),
        labelInset: 10,
        // arcColorFn: d3.interpolateRgb(d3.rgb('#00ff00'), d3.rgb('#ff0000'))
        arcColorFn: d3.scaleQuantize().domain([0, 1]).range(['green', 'yellow', 'red'])
      };
      const gauge = {};
      let range, r, pointerHeadLength, svg, arc, scale, ticks, tickData, pointer, value = 0;

      const donut = d3.pie();
      
      const deg2rad = deg => deg * Math.PI / 180;
      
      const newAngle = d => config.minAngle + (scale(d) * range);
      
      function configure(configuration) {
        Object.keys(configuration).forEach(key => config[key] = configuration[key]);
        range = config.maxAngle - config.minAngle;
        r = config.size / 2;
        pointerHeadLength = Math.round(r * config.pointerHeadLengthPercent);
        scale = d3.scaleLinear()
                  .range([0,1])
                  .domain([config.minValue, config.maxValue]);
        ticks = scale.ticks(config.ticks);
        tickData = d3.range(config.numSegments).map(() => 1/config.numSegments);
        arc = d3.arc()
          .innerRadius(r - config.ringWidth - config.ringInset)
          .outerRadius(r - config.ringInset)
          .startAngle((d, i) => deg2rad(config.minAngle + (d * i * range)))
          .endAngle((d, i) => deg2rad(config.minAngle + (d * (i+1) * range)));
      }
      gauge.configure = configure;
      
      const centerTranslation = () => `translate(${r}, ${r})`;
      
      gauge.isRendered = () => svg !== undefined;
      
      gauge.render = newValue => {
        svg = d3.select(container)
                .append('svg:svg')
                .attr('preserveAspectRatio', 'xMinYMin meet')
                .attr('viewBox', '0 0 600 400')
                .attr('class', 'gauge')
            // .attr('width', config.clipWidth)
            // .attr('height', config.clipHeight);

        const defs = svg.append('defs');

        const gradient = defs.append('linearGradient')
                            .attr('id', 'svgGradient')
                            .attr('x1', '0%')
                            .attr('x2', '85%')
                            .attr('y1', '100%')
                            .attr('y2', '100%');
            
        gradient.append('stop')
                .attr('class', 'start')
                .attr('offset', '0%')
                .attr('stop-color', '#00ff00')
                .attr('stop-opacity', 1);
            
        gradient.append('stop')
                .attr('class', 'end')
                .attr('offset', '100%')
                .attr('stop-color', '#ff0000')
                .attr('stop-opacity', 1);
        
        const centerTx = centerTranslation();
        
        const arcs = svg.append('g')
            .attr('class', 'arc')
            .attr('transform', centerTx);
        
        arcs.selectAll('path')
            .data(tickData)
            .enter()
            .append('path')
            .attr('fill', (d, i) => config.arcColorFn(d * i))
            // .attr('fill', 'url(#svgGradient)')
            .attr('d', arc);
        
        const lg = svg.append('g')
            .attr('class', 'label')
            .attr('transform', centerTx);

        lg.selectAll('text')
            .data(ticks)
            .enter()
            .append('text')
            .attr('transform', d => {
              const newAngle = config.minAngle + (scale(d) * range);
              return 'rotate(' +newAngle +') translate(0,' +(config.labelInset - r) +')';
            })
            .text(config.labelFormat);

        const lineData = [ [config.pointerWidth / 2, 0], 
                [0, -pointerHeadLength],
                [-(config.pointerWidth / 2), 0],
                [0, config.pointerTailLength],
                [config.pointerWidth / 2, 0] ];
        const pointerLine = d3.line().curve(d3.curveLinear);
        const pg = svg.append('g').data([lineData])
            .attr('class', 'pointer')
            .attr('transform', centerTx);
            
        pointer = pg.append('path')
          .attr('d', pointerLine)
          .attr('transform', 'rotate(' +config.minAngle +')');
          
        update(newValue === undefined ? 0 : newValue);
      }
      
      function update(newValue, newConfiguration) {
        if ( newConfiguration  !== undefined ) {
          configure(newConfiguration);
        }
        const ratio = scale(newValue);
        const newAngle = (config.minAngle + (ratio * range) > 90 || config.minAngle + (ratio * range) < 0) 
                            ? 90 : config.minAngle + (ratio * range);

        pointer.transition()
          .duration(config.transitionMs)
          .ease(d3.easeCubic)
          .attr('transform', 'rotate(' +newAngle +')');
      }
      gauge.update = update;

      configure(configuration);
      return gauge;
    }
  },
  watch: {
    value: function(newVal, oldVal) {
      this.gauge.update(newVal);
    }
  },
  created: function() {
    this.gauge = this.createGauge('#' + this.service, {
      size: 600,
      ringWidth: 120,
      minValue: this.low,
      maxValue: this.high,
      transitionMs: 150
    });
  },
  mounted: function() {
    this.gauge.render();
    this.gauge.update(this.value);
  }
}
</script>

<style>
:root {
  --font : calc(1px + (16 - 1) * ((100vw - 100px) / (1536 - 100)));
}

.meter {
  position: relative;
}

.inner {
  width: 100%;
  height: 100%;
}

.caption {
  width: 100%;
  text-align: center;
  position: absolute;
  font-size:var(--font);
  top: 50%;
  color: black;
}

.title {
  width: 100%;
  text-align: center;
  color: black;
  font-weight: 800;
  font-size:var(--font);
  overflow:hidden;
  text-overflow:ellipsis;
  position: absolute;
  top: 80%;
}

.meter g.arc {
  fill: steelblue;
}

.meter g.pointer {
  fill: #e85116;
  stroke: #ffffff6c;
}

.meter g.label text {
  text-anchor: middle;
  font-size: 14px;
  font-weight: bold;
  fill: black;
}
</style>

