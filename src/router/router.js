import Vue from 'vue'
import VueRouter from 'vue-router';
import APIStatusDashboard from '../components/APIStatusDashboard';
import MappingDashboard from '../components/MicrosoftHeatMap';
import APIData from '../config.json';

Vue.use(VueRouter);

export default new VueRouter({
    routes : [
        { 
            path: '/', 
            component: APIStatusDashboard,
            props : { apis : APIData.apis }
        },
        {
            path: '/api-status-dashboard',
            name: 'APIStatusDashboard',
            component: APIStatusDashboard,
            props : { apis : APIData.apis }
        },
        {
            path: '/map-dashboard',
            name: 'MappingDashboard',
            component: MappingDashboard
        }
    ]
});