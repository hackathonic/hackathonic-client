const LS_PREFIX = 'hck';
const LS_KEY = `${LS_PREFIX}:access_token`;
const GITHUB_CLIENT_ID = '1105e57ff988bd9f4031';
const GITHUB_LOGIN_URL = `https://github.com/login/oauth/authorize?scope=user:email&client_id=${GITHUB_CLIENT_ID}`;
const GITHUB_USER_URL = 'https://api.github.com/user';

import axios from 'axios';

export function setToken(token) {
  localStorage.setItem(LS_KEY, token);
};

export function getToken() {
  return localStorage.getItem(LS_KEY);
};

export function hasToken() {
  const token = getToken();
  return token !== undefined && token !== null;
};

export function isAuthenticated() {
  return hasToken();
};

export function signIn() {
  location.href = GITHUB_LOGIN_URL;
};

export function getAccessToken(code) {
  return axios.get(`/getaccesstoken/${code}`)
              .then(response => response.data.access_token);
}

export function getGithubUserInfo(access_token) {
  return axios.get(GITHUB_USER_URL, {
    params: { access_token }
  })
  .then(response => response.data);
}

export function ensureAccount(access_token) {
  return getGithubUserInfo(access_token).then(({ name, email, id }) => {
    return findAccountByEmail(email)
      .then(account => {
        if (!account) {
          return createAccount({ name, email, githubId: id }, access_token);
        }
      })
  });
}

const findAccountByEmail = (email) => {
  return axios.get(`/api/v1/person?email=${email}`)
  .then(response => {
    console.log(response);
    if (response.status === 404) {
      return false;
    }
    return response.data[0];
  }).catch(err => {
    console.log(err);
  });
};

const createAccount = ({ name, email, githubId }, access_token) => {
  return axios.post(`/api/v1/person?access_token=${access_token}`, {
    name, email, githubId
  })
  .then(response => {
    if (response.status === 201) {
      const { name, email, id } = response.data;
      return { name, email, id };
    }
  });
};
