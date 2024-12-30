const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  database: {
    host: process.env.DB_HOST || '127.0.0.1', 
    user: process.env.DB_USER || 'root',    
    password: process.env.DB_PASS || '',    
    name: process.env.DB_NAME || 'urbanfinds', 
    port: process.env.DB_PORT || 4306,    
  },
  server: {
    port: process.env.PORT || 3000,         
  },
  app: {
    secretKey: process.env.SECRET_KEY || 'defaultsecretkey', 
  },
};
