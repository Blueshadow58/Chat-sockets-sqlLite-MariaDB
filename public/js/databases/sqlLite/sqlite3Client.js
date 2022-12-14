import knexLib from "knex";

class ClienteSQLite3 {
  constructor(config) {
    this.knex = knexLib(config);
  }

  crearTabla = async () => {
    await this.knex.schema.createTable("messages", (table) => {
      table.increments("id").primary();
      table.string("email", 35).notNullable();
      table.integer("message", 35).notNullable();
    });
  };

  consultar = async () => {
    try {
      if (await this.knex.schema.hasTable("messages")) {
        return await this.knex.select().from("messages");
      } else {
        await this.crearTabla();
      }
    } catch (error) {
      console.log(error);
    }
  };

  insertar = async (data) => {
    try {
      await this.knex(`messages`).insert(data);
    } catch (error) {
      console.log(error);
    }
  };
}

export default ClienteSQLite3;
