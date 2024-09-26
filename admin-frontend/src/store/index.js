import { createStore } from 'vuex';
import axios from 'axios';

axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;

export default createStore({
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
    async login({ commit }, { email, password }) {
        try {
            const response = await axios.post('/api/login', { email, password });
            commit('setUser', response.data.user);
          } catch (error) {
            throw error.response.data?.error || 'error';
          }
    },
    async register({ commit }, userInfo) {
     try {
        const response = await axios.post('/api/register', userInfo);
        commit('setUser', response.data.user);
     } catch (error) {
        throw error.response.data?.error || 'error';
     }
    },
    async fetchClusters({ commit }) {
        try {
          const response = await axios.get('/api/clusters');
          commit('setClusters', response.data.clusters);
        } catch (error) {
            throw error.response.data?.error || 'error';
        }
      },
      async createCluster({ dispatch }, clusterInfo) {
        try {
          await axios.post('/api/clusters', clusterInfo);
          dispatch('fetchClusters');
        } catch (error) {
            throw error.response.data?.error || 'error';
        }
      },
      async deleteCluster({ dispatch }, clusterId) {
        try {
          await axios.delete(`/api/clusters/${clusterId}`);
          dispatch('fetchClusters');
        } catch (error) {
            throw error.response.data?.error || 'error';
        }
      },
      async fetchApplications({ commit }) {
        try {
          const response = await axios.get('/api/applications');
          commit('setApplications', response.data.applications);
        } catch (error) {
            throw error.response.data?.error || 'error';
        }
      },
      async deployApplication({ dispatch }, appInfo) {
        try {
          await axios.post('/api/applications', appInfo);
          dispatch('fetchApplications');
        } catch (error) {
            throw error.response.data?.error || 'error';
        }
      },
      async deleteApplication({ dispatch }, appId) {
        try {
          await axios.delete(`/api/applications/${appId}`);
          dispatch('fetchApplications');
        } catch (error) {
            throw error.response.data?.error || 'error';
        }
      },
      async executeKubectlCommand(_, commandInfo) {
        try {
          const response = await axios.post('/api/kubectl', commandInfo);
          return response;
        } catch (error) {
            throw error.response.data?.error || 'error';
        }
      },
  },
});