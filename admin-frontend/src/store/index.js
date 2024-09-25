import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    clusters: [],
    applications: [],
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setClusters(state, clusters) {
      state.clusters = clusters;
    },
    setApplications(state, applications) {
      state.applications = applications;
    },
  },
  actions: {
    async login({ commit }, credentials) {
      const response = await axios.post('/api/login', credentials);
      commit('setUser', response.data.user);
    },
    async register({ commit }, userInfo) {
      const response = await axios.post('/api/register', userInfo);
      commit('setUser', response.data.user);
    },
    async fetchClusters({ commit }) {
      const response = await axios.get('/api/clusters');
      commit('setClusters', response.data.clusters);
    },
    async createCluster({ dispatch }, clusterInfo) {
      await axios.post('/api/clusters', clusterInfo);
      dispatch('fetchClusters');
    },
    async deleteCluster({ dispatch }, clusterId) {
      await axios.delete(`/api/clusters/${clusterId}`);
      dispatch('fetchClusters');
    },
    async fetchApplications({ commit }) {
      const response = await axios.get('/api/applications');
      commit('setApplications', response.data.applications);
    },
    async deployApplication({ dispatch }, appInfo) {
      await axios.post('/api/applications', appInfo);
      dispatch('fetchApplications');
    },
    async deleteApplication({ dispatch }, appId) {
      await axios.delete(`/api/applications/${appId}`);
      dispatch('fetchApplications');
    },
    async executeKubectlCommand(_, commandInfo) {
      const response = await axios.post('/api/kubectl', commandInfo);
      return response;
    },
  },
});