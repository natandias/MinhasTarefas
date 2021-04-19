// Update with your config settings
const path = require("path");

module.exports = {
  development: {
    client: "mysql",
    connection: {
      database: "mytasks",
      user: "mysql",
      password: "1234",
    },
    migrations: {
      tableName: "knex_migrations",
      directory: path.join(__dirname, "/src/database/migrations/"),
    },
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
