const path = require('path');
const dotenv = require('dotenv');

const envPath = path.resolve(process.cwd(), '.env');
dotenv.config({ path: envPath });

module.exports = {
  PORT: Number(process.env.PORT || 5000),
  NASA_API_KEY: process.env.NASA_API_KEY,
  CACHE_TTL: Number(process.env.CACHE_TTL || 3600),
  CACHE_SIZE: Number(process.env.CACHE_SIZE || 100),
};
