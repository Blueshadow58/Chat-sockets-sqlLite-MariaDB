import knexLib from "knex";

class ClienteSQL {
  constructor(config) {
    this.knex = knexLib(config);
  }

  crearTabla = async () => {
    return await this.knex.schema.createTable("products", (table) => {
      table.increments("id").primary();
      table.string("name", 50).notNullable();
      table.integer("price", 25).notNullable();
      table.text("image").notNullable();
    });
  };

  consultar = async () => {
    try {
      if (!this.knex.schema.hasTable("products")) {
        this.crearTabla();
      }
      return await this.knex.select().from("products");
    } catch (error) {
      console.log(error);
    }
  };

  consultarById = (id) => {};

  insertar = async (data) => {
    try {
      await this.knex(`products`).insert(data);
    } catch (error) {
      console.log(error);
    }
  };

  eliminar = (id) => {};

  actualizar = (id) => {};

  close = () => {
    this.knex.destroy();
  };
}

export default ClienteSQL;
