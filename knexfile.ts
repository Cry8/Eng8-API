// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

import 'dotenv/config';


export default {
  development: {
    client: 'mysql',
    connection: {
      database: process.env.DB_NAME,
      user:    process.env.DB_USER,
      password: process.env.DB_PASSWORD
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

};
