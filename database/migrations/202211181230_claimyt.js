/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.hasTable('claimyt').then((exists) => {
        if (!exists) {
            return knex.schema.createTable('claimyt', (table) => {
                table.bigIncrements('user_id')
                table.string('jid')
                table.string('email')
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
    return knex.schema.dropTable('claimyt')
}
