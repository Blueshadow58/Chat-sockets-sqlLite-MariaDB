import knexLib from "knex";

class ClienteSQL {
  constructor(config) {
    this.knex = knexLib(config);
  }

  crearTabla = () => {
    return this.knex.schema.createTable("products", (table) => {
      table.increments("id").primary();
      table.string("name", 50).notNullable();
      table.integer("price", 25).notNullable();
      table.text("image").notNullable();
    });
  };

  consultar = async () => {
    return await this.knex.select().from("products");
  };

  consultarById = (id) => {};

  insertar = async (data) => {
    if (this.knex.schema.hasTable("products")) {
      console.log(data);
      await this.knex(`products`).insert(data);
    } else {
      this.crearTabla();
    }
  };

  eliminar = (id) => {};

  actualizar = (id) => {};

  close = () => {
    this.knex.destroy();
  };
}

export default ClienteSQL;
