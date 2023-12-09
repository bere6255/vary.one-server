import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("products", (table) => {
		table.increments("id").primary();
		table.string("name").notNullable();
		table.string("type").notNullable();
		table.string("writer").notNullable();
		table.text("avatar");
		table.text("description").notNullable().defaultTo(1);
		table.integer("units").defaultTo(0);
		table.enu("status", [
			"pending",
			"online",
			"ofline"
		]).defaultTo("pending");
		table.enu("tag", [
			"fiction",
			"non-fiction",
			"science",
			"essay"
		]);
		table.text("meta").notNullable();
		table
			.datetime("created_at", { useTz: true, precision: 6 })
			.defaultTo(knex.fn.now(6));
		table.datetime("updated_at", { useTz: true, precision: 6 });
		table.datetime("deleted_at", { useTz: true, precision: 6 });
	});
}


export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTableIfExists("users");
}