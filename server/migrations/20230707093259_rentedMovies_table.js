/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("rentedmovies", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("genre").notNullable();
    table.string("time").notNullable();
    table.string("price").notNullable();
    table.string("renter").notNullable();
  })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("rentedmovies")
};