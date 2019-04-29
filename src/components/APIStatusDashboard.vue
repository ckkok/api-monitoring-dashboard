<template>
  <div id="dashboard-container">
    <div id="default-notice" v-if="activeGauges.length === 0">
      <div id="default-notice-message">
        OK
      </div>
    </div>
    <div id="dashboard">
      <div class="gauge-container" @click="go(api.apiName)" v-for="api in activeGauges" v-bind:key="api.apiName">
        <Gauge :value="api.errors" :min="api.min" :max="api.max" :service="api.apiName" />
      </div>
    </div>
  </div>
</template>

<script>
import Gauge from './GaugeD3';
import mockResponse from '../mockResponse.json';

const API_STATUS_SERVICE = 'fetchAPIStatusService';
const API_24_HOUR_STATUS = 'fetchAPIStatus24Hours';

export default {
  name: 'api-status-dashboard',
  components: {
    Gauge
  },
  props: ['apis', 'fetchAPIStatusService'],
  data: function () {
    return {
      registry: [],
      worker: null,
      errors: null
    }
  },
  computed: {
    activeGauges: function() {
      return this.registry.filter(api => api.errors > api.threshold);
    }
  },
  methods: {
    fetchAPIStatuses() {

      this.worker.postMessage(API_STATUS_SERVICE)
        .then(() => {}, console.error);
      // this.registry = this.registry.map(api => {
      //   api.response.aggregations.ERRORS.doc_count += (Math.floor(Math.random() * 6) - 3);
      //   return api;
      // });
    },
    bootstrap() {
      const response = this.apis.map(api => {
        api.response = mockResponse[0];
        return api;
      });
      this.registry = response;
    },
    // go(msg) {
    //   // console.log('Clicked on ' + msg);
    // }
  },
  created: function () {
    // this.bootstrap();
    const workerConfig = [
      { message: API_STATUS_SERVICE, func: this.fetchAPIStatusService },
      { message: API_24_HOUR_STATUS, func: this.fetchAPIStatusService }
    ];
    this.worker = this.$worker.create(workerConfig);
    this.fetchAPIStatuses();
    setInterval(() => this.fetchAPIStatuses(), 60000);
  }
}
</script>

<style scoped>
#dashboard-container {
  width: 100%;
  height: 100%;
}

#dashboard {
  box-sizing: border-box;
  display: grid;
  padding: 15px;
  grid-gap: 15px;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 1fr);
  overflow: auto;
}

#default-notice, #dashboard {
  width: 100%;
  height: 100%;
}

#default-notice-message {
  width: 100%;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  text-align: center;
  font-size: 5rem;
  font-weight: 800;
  color: #6b2809;
  text-shadow: #000000;
}

.gauge-container {
  cursor: pointer;
  padding: 1rem;
  height: auto;
  background-color: rgba(255, 255, 255, 0.822);
  border: 1px solid rgba(114, 112, 110, 0.527);
  border-radius: 6px;
  box-shadow: 1px 1px 1px 1px #8b888af3;
}
</style>
