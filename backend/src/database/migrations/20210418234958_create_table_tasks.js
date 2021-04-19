exports.up = function (knex) {
  return knex.schema.createTable("tasks", function (table) {
    table.increments();
    table.integer("user_id").references("id").inTable("users").notNullable();
    table.string("title").notNullable();
    table.string("description").notNullable();
    table.string("deadlineDate").notNullable();
    table.string("deadlineTime").notNullable();
    table.string("status").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("tasks");
};
