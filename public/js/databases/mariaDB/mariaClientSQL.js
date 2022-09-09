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

  insertar = (data) => {
    // this.knex.schema.hasTable("products").then((boolean) => {
    //   return boolean;
    // });
    // if (this.knex.schema.hasTable("products")) {
    //   return this.knex(`products`).insert(data);
    // } else {
    //   this.crearTabla().then(() => {
    //     return this.knex(`products`).insert(data);
    //   });
    // }
  };

  eliminar = (id) => {};

  actualizar = (id) => {};

  close = () => {
    this.knex.destroy();
  };
}

export default ClienteSQL;
