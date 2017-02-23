import axios from 'axios';
import { createHackathonList } from '../../urlFactory';

const ERR_DATA_FETCH = 'Could not load list of hackathons';

const hackathon = {
  state: {
    loading: false,
    error: false,
    errorMessage: '',
    hackathons: []
  },
  mutations: {
    startLoading(state) {
      state.loading = true;
    },
    stopLoading(state) {
      state.loading = false;
    },
    createHackathons(state, hackathons) {
      state.hackathons = hackathons;
    },
    showError(state, errorMessage) {
      state.error = true;
      state.errorMessage = errorMessage;
    },
    hideError(state) {
      state.error = false;
      state.errorMessage = '';
    }
  },
  getters: {
    hackathons(state, getters) {
      return state.hackathons;
    },
    loading(state, getters) {
      return state.loading;
    },
    hackathonsCount(state, getters) {
      return state.hackathons.length;
    }
  },
  actions: {
    fetchHackathons({ commit }) {
      commit('startLoading');
      commit('hideError');
      axios.get(createHackathonList())
        .then(response => {
          commit('stopLoading');
          commit('createHackathons', response.data);
        })
        .catch(err => {
          commit('stopLoading');
          commit('showError', ERR_DATA_FETCH)
        });
    }
  }
};

export default hackathon;
