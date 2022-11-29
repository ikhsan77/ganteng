const knex = require('@jadibot/database/connection')
knex.migrate.latest().then(() => knex.seed.run())
