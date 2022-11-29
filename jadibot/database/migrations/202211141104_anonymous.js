/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.hasTable('anonymous').then((exists) => {
        if (!exists) {
            return knex.schema.createTable('anonymous', (table) => {
                table.bigIncrements('user_id')
                table.string('room_a')
                table.string('room_b')
                table.string('status')
            })
        }
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('anonymous')
}
