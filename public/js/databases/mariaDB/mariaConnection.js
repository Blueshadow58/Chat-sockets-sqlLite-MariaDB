import ClienteSQL from "./mariaClientSQL.js";

//Documentacion: https://knexjs.org/guide/#node-js
// If you want to use a MariaDB instance, you can use the mysql driver.

const options = {
  client: "mysql",
  connection: {
    host: "localhost",
    port: 3050,
    user: "root",
    password: "root",
    database: "product",
  },
};

export const cSql = new ClienteSQL(options);
