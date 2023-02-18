// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

export default {
  development: {
    client: 'mysql',
    connection: {
      database: 'eng8',
      user:    'root',
      password: '123456'
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

};
