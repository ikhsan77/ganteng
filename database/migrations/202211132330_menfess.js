/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.hasTable('menfess').then((exists) => {
        if (!exists) {
            return knex.schema.createTable('menfess', (table) => {
                table.bigIncrements('user_id')
                table.string('room_a')
                table.string('room_b')
                table.string('message')
                table.boolean('status').defaultTo(0)
            })
        }
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('menfess')
}
