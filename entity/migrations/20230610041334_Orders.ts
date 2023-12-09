import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("orders", (table) => {
		table.increments("id").primary();
		table.string("user_id").notNullable();
		table.string("product_id").notNullable();
		table.string("transaction_id");
		table.string("qty").notNullable();
		table.bigInteger("amount").defaultTo(0);
		table.enu("status", [
			"pending",
			"delivered",
			"paid",
			"cancled",
			"processing",
		]).defaultTo("pending");
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