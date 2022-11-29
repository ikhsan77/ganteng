/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.hasTable('antilink').then((exists) => {
        if (!exists) {
            return knex.schema.createTable('antilink', (table) => {
                table.bigIncrements('id')
                table.string('group_id')
                table.string('type').defaultTo('text')
                table.string('media').defaultTo('-')
                table.string('message').defaultTo('Si {user}, terdeteksi kirim link')
                table.boolean('status').defaultTo(1)
            })
        }
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('antilink')
}
