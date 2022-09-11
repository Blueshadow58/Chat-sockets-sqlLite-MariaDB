import ClienteSQLite3 from "./sqlite3Client.js";

const options = {
  client: "sqlite3",
  connection: {
    filename: `./database.sqlite3`,
  },
  useNullAsDefault: false,
};

export const cSqlite3 = new ClienteSQLite3(options);
