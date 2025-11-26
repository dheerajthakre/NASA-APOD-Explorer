const axios = require('axios');

const client = axios.create({
  timeout: 10000,
  headers: {
    'User-Agent': 'nasa-apod-proxy/1.0 (+https://example.com)'
  }
});

module.exports = client;
