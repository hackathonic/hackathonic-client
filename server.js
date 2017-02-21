require('dotenv').config({
  path: `${__dirname}/.env`
});

const path = require('path');
const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');

const {
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  PORT,
  HOST
} = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/public', express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/getaccesstoken/:code', (req, res) => {
  const { code } = req.params;
  axios.post('https://github.com/login/oauth/access_token', {
    client_id: GITHUB_CLIENT_ID,
    client_secret: GITHUB_CLIENT_SECRET,
    code
  }, {
    headers: {
      'Accept': 'application/json'
    }
  }).then(response => {
    const { access_token } = response.data;
    res.json({ access_token });
  }).catch(err => {
    res.status(400).end();
  });
});

app.listen(PORT, HOST, () => {
  console.info(`Server listening on http://${HOST}:${PORT}`);
});
