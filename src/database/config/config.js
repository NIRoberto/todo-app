module.exports = {
  development: {
    username: process.env.userName,
    password: process.env.dbPass,
    database: process.env.dbDev,
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  test: {
    username: process.env.userName,
    password: process.env.dbPass,
    database: process.env.dbTest,
    host: '127.0.0.1',
    dialect: 'postgres',
  },
    production: {
    username: process.env.userName,
    password: process.env.dbPass,
    database: process.env.dbDev,
    host: '127.0.0.1',
    dialect: 'postgres',
  }

};
