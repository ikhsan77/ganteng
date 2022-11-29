const config = require('@config')
const { knex } = require('knex')
const path = require('path')

module.exports = knex({
    client: 'sqlite3',
    connection: {
        filename: `./jadibot/database/${config.sessionName}-db.db`,
    },
    useNullAsDefault: true,
    migrations: {
        directory: path.join(__dirname, '../migrations'),
    },
    seeds: {
        directory: path.join(__dirname, '../seeds'),
    },
})