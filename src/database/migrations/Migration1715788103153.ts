import { Migration } from '@mikro-orm/migrations';

export class Migration1715788103153 extends Migration {
  async up(): Promise<void> {
    //create migration for recipe and ingredient using knex
    this.addSql(
      this.getKnex()
        .schema.createTable('recipe', (table) => {
          table.increments('id').primary();
          table.string('title');
          table.timestamp('created_at').defaultTo(this.getKnex().fn.now());
        })
        .toQuery(),
    );

    this.addSql(
      this.getKnex()
        .schema.createTable('ingredient', (table) => {
          table.increments('id').primary();
          table.string('name');
          table.float('quantity');
          table.integer('recipe_id').unsigned();
          table.timestamp('created_at').defaultTo(this.getKnex().fn.now());
        })
        .toQuery(),
    );

    this.addSql(
      this.getKnex()
        .schema.table('ingredient', (table) => {
          table
            .foreign('recipe_id')
            .references('recipe.id')
            .onDelete('CASCADE');
        })
        .toQuery(),
    );
  }
}
