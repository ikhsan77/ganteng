/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.hasTable('welcome').then((exists) => {
        if (!exists) {
            return knex.schema.createTable('welcome', (table) => {
                table.bigIncrements('id')
                table.string('group_id')
                table.string('type').defaultTo('text')
                table.string('type2').defaultTo('tag')
                table.string('media').defaultTo('-')
                table.string('message').defaultTo('Silahkan baca deskripsi grup {user}')
            })
        }
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('welcome')
}
