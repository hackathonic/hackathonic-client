import axios from 'axios';
import { createHackathonURL } from '../../urlFactory';
import { buildStartDate, buildEndDate } from '../../date';
import { getToken } from '../../auth';

const ERR_DATA_FETCH = 'Could not load list of hackathons';
const ERR_DATA_CREATE = 'Could not create hackathon';

const hackathon = {
  state: {
    loading: false,
    error: false,
    errorMessage: '',
    hackathons: [],
    selectedHackathonId: null
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
    },
    createHackathon(state, hackathon) {
      state.hackathons.push(hackathon);
    },
    selectHackathon(state, hackathonId) {
      state.selectedHackathonId = hackathonId;
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
    },
    selectedHackathon(state, getters) {
      return state.hackathons.filter(hackathon => {
        return hackathon.id === state.selectedHackathonId
      })[0];
    }
  },
  actions: {
    fetchHackathon({ commit, getters }, id) {
      commit('selectHackathon', id);
      if (!getters.selectedHackathon) {
        commit('startLoading');
        commit('hideError');
        axios.get(createHackathonURL(getToken(), id))
        .then(response => {
          commit('stopLoading');
          commit('createHackathon', response.data[0]);
        })
        .catch(err => {
          commit('stopLoading');
          commit('showError', ERR_DATA_FETCH)
        });
      }
    },
    fetchHackathons({ commit }) {
      commit('startLoading');
      commit('hideError');
      axios.get(createHackathonURL())
        .then(response => {
          commit('stopLoading');
          commit('createHackathons', response.data);
        })
        .catch(err => {
          commit('stopLoading');
          commit('showError', ERR_DATA_FETCH)
        });
    },
    createHackathon({ commit }, hackathon) {
      commit('startLoading');
      commit('hideError');
      const payload = {
        name: hackathon.name,
        description: hackathon.description,
        startDate: buildStartDate(hackathon.date, hackathon.hour, hackathon.minute),
        endDate: buildEndDate(hackathon.date, hackathon.hour, hackathon.minute, hackathon.duration)
      };
      axios.post(createHackathonURL(getToken()), payload)
        .then(response => {
          commit('createHackathon', response.data);
        })
        .catch(err => {
          commit('stopLoading');
          commit('showError', ERR_DATA_CREATE)
        });
    }
  }
};

export default hackathon;
