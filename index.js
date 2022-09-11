import express from "express";
import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
import { engine } from "express-handlebars";
import { cSql } from "./public/js/databases/mariaDB/mariaConnection.js";
import { cSqlite3 } from "./public/js/databases/sqlLite/sqlite3Connection.js";

app.use("/public", express.static("./public"));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.get("/", (req, res) => {
  res.render("home");
});

const getProducts = async () => {
  try {
    const data = await cSql.consultar();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getMessages = async () => {
  try {
    const data = await cSqlite3.consultar();
    return data;
  } catch (error) {
    console.log(error);
  }
};

io.on("connection", async (socket) => {
  console.log("Nuevo cliente conectado");
  socket.emit("new-chat-message", await getMessages());
  socket.emit("new-product-table", await getProducts());

  socket.on("new-message", async (message) => {
    try {
      await cSqlite3.insertar(message);
    } catch (error) {
      console.log(error);
    }

    io.sockets.emit("new-chat-message", await getMessages());
  });

  socket.on("new-product", async (product) => {
    try {
      await cSql.insertar(product);
    } catch (error) {
      console.log(error);
    }
    io.sockets.emit("new-product-table", await getProducts());
  });
});

const connectedServer = httpServer.listen(3000, () => {
  console.log("Servidor http con web sockets listo");
});

connectedServer.on("error", (error) => console.log);
