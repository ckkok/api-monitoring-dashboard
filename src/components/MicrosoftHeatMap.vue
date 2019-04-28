<template>
  <div id="map-container">
    <div id="map" ref="map"></div>
  </div>
</template>
<script>
export default {
  name: 'heatmap',
  props: [],
  data: () => {
    return {
      credentials: 'AjZtDAfeDEIFBVWqLad_yPoMIZSgyjhZgGRNeCK4WBh2bs1eN4BkImD6kNQW-sX_', //TODO: Change this!
      map: null,
      heatmap: null,
      locations: []
    }
  },
  computed: {

  },
  created() {
    setInterval(() => this.generateFakeData(), 1000);
  },
  mounted() {
    if (document.getElementById('bingMapsScript')) {
      return;
    }
    window.onBingMapsLoad = () => this.InitMap();
    const script = document.createElement('script');
    script.src = 'http://www.bing.com/api/maps/mapcontrol?callback=onBingMapsLoad&key=AjZtDAfeDEIFBVWqLad_yPoMIZSgyjhZgGRNeCK4WBh2bs1eN4BkImD6kNQW-sX_';
    script.id = 'bingMapsScript';
    document.head.appendChild(script);
  },
  methods: {
    generateFakeData: function() {
      const mapDiv = this.map.getRootElement();
      const getRandomLocation = () => new Microsoft.Maps.Location((Math.random() * 180) - 90, (Math.random() * 360) - 180);
      this.locations = [];
      let loc;
      for (let i = 0; i < 50; i++) {
        loc = getRandomLocation();
        for (let j = 0; j < Math.floor(Math.random() * 10 + 1); j++) {
          this.locations.push(loc);
        };
      };
      this.heatmap.setLocations(this.locations);
    },
    InitMap: function() {
      const mapElement = this.$refs.map;
      const bounds = Microsoft.Maps.LocationRect.fromCorners(new Microsoft.Maps.Location(85, -180), new Microsoft.Maps.Location(-70, 180));
      const mapOptions = {
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        zoom: 2,
        maxBounds: bounds,
        disablePanning: true,
        disableZooming: true,
        enableClickableLogo: false,
        enableHighDpi: true,
        enableSearchLogo: false,
        showCopyright: false,
        showScalebar: false,
        showDashboard: false,
        showMapTypeSelector: false,
        showTrafficButton: false,
        showTermsLink: false,
        showZoomButtons: false,
        backgroundColor: '#ffffff',
        width: window.innerWidth,
        height: window.innerHeight
      };
      const heatMapOptions = {
        intensity: 0.5,
        radius: 15,
        colorGradient: {
          '0': 'Black',
          '0.4': 'Purple',
          '0.6': 'Red',
          '0.8': 'Yellow',
          '1': 'White'
        },
        aggregateLocationWeights: false
      };
      this.map = new Microsoft.Maps.Map(mapElement, mapOptions);
      Microsoft.Maps.loadModule('Microsoft.Maps.HeatMap', () => {
        const mapDiv = this.map.getRootElement();
        for (let i = 0; i < 100; i++) {
          this.locations.push(this.map.tryPixelToLocation(new Microsoft.Maps.Point(mapDiv.clientWidth * Math.random(), mapDiv.clientHeight * Math.random()), Microsoft.Maps.PixelReference.control));
        };
        this.heatmap = new Microsoft.Maps.HeatMapLayer(this.locations);
        this.map.layers.insert(this.heatmap);
        this.heatmap.setOptions(heatMapOptions);
      });
    }
  }
}
</script>
<style scoped>
#map-container {
  height: 100%;
  width: 100%;
}

#map {
  height: 100%;
  width: 100%;
}
</style>
