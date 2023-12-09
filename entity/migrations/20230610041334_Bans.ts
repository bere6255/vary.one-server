import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("bans", (table) => {
        table.increments("id").primary();
        table.string("user_id").notNullable();
        table.string("ban_by").notNullable().defaultTo("system");
        table.text("comment");
        table
            .datetime("created_at", { useTz: true, precision: 6 })
            .defaultTo(knex.fn.now(6));
        table.datetime("updated_at", { useTz: true, precision: 6 });
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists("bans");
}