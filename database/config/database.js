const process = require('process');
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  host: process.env.DB_HOST || '127.0.0.1',
  port: process.env.DB_PORT || 3306,
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || null,
  database: process.env.DB_DATABASE || '',
  db_logging: process.env.DB_LOGGING || false,
  dialect: process.env.DB_DIALECT || 'mysql',
};
