import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CreateTablesUsersAndTasks extends BaseSchema {
  protected tableName = 'users';
  protected tableName2 = 'tasks';

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string("username").notNullable().unique();
      table.string("password").notNullable();
      table.string("token");
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now());
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now());
    }).createTable(this.tableName2, (table) => {
        table.increments('id')
         table.integer("user_id").unsigned().notNullable().references("id").inTable("users")
         table.string("title").notNullable();
         table.string("description").notNullable();
         table.string("deadlineDate").notNullable();
         table.string("deadlineTime").notNullable();
         table.string("status").notNullable();
         table.timestamp('created_at', { useTz: true }).defaultTo(this.now());
         table.timestamp('updated_at', { useTz: true }).defaultTo(this.now());
       })
  }

  public async down () {
    this.schema.dropTable(this.tableName);
    this.schema.dropTable(this.tableName2);
  }
}
