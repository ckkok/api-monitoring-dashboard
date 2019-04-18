<template>
  <div id="dashboard-container">
    <div id="default-notice" v-if="numGauges === 0">
      <div id="default-notice-message">
        OK
      </div>
    </div>
    <div id="dashboard" v-for="api in registry" v-bind:key="api.apiName">
      <div class="gauge-container" v-if="api.response.aggregations.ERRORS.doc_count > api.threshold" @click="go(api.apiName)">
        <Gauge :value="api.response.aggregations.ERRORS.doc_count" :min="api.min" :max="api.max" :service="api.apiName" />
      </div>
    </div>
  </div>
</template>
<script>
import Gauge from './Gauge';
import mockResponse from '../mockResponse.json';

export default {
  name: 'api-status-dashboard',
  components: {
    Gauge
  },
  props: ['apis', 'queryBuilder'],
  data: function () {
    return {
      numGauges: 0,
      registry: []
    }
  },
  watch: {
    registry: function(val) {
      // compute DOM changes here. New value of registry is in here.
    }
  },
  methods: {
    fetchAPIStatuses() {
      this.numGauges = 0;
      this.registry = this.registry.map(api => {
        api.response.aggregations.ERRORS.doc_count += (Math.floor(Math.random() * 6) - 3);
        if (api.response.aggregations.ERRORS.doc_count > api.threshold) this.numGauges++;
        return api;
      });
    },
    bootstrap() {
      const response = this.apis.map(api => {
        api.response = mockResponse[0];
        return api;
      });
      this.registry = response;
    },
    go(msg) {
      console.log('Clicked on ' + msg);
    }
  },
  created: function () {
    this.bootstrap();
    setInterval(() => this.fetchAPIStatuses(), 2000);
  }
}
</script>
<style scoped>
#dashboard-container {
  width: 100%;
}

#dashboard {
  display: inline-flex;
  justify-content: flex-start;
  overflow: auto;
}

#default-notice {
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
  margin: 1.5rem 0 0 1.5rem;
  padding: 1.5rem;
  height: 13.5rem;
  background-color: #261700;
  border: 1px solid #4C2E00;
  border-radius: 6px;
  box-shadow: 1px 1px 1px 1px #21171b;
}
</style>
