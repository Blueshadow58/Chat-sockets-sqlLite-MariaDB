import express from "express";
import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
import { engine } from "express-handlebars";
import { cSql } from "./public/js/databases/mariaDB/mariaConnection.js";
app.use("/public", express.static("./public"));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.get("/", (req, res) => {
  res.render("home");
});
import fs from "fs";
const messages = [];

//READ MESSAGES

fs.promises
  .readFile("./messages.text", "utf-8")
  .then((fileData) => {
    const array = JSON.parse(fileData);
    array.map((message) => {
      messages.push(message);
    });
  })
  .catch((err) => console.log(err));

//SAVE MESSAGES
const save = (messages) => {
  fs.promises
    .writeFile("./messages.text", JSON.stringify(messages))
    .then((data) => {
      return console.log(`Mensaje enviado exitosamente `);
    })
    .catch((error) => console.log(error));
};

const getProducts = async () => {
  try {
    const data = await cSql.consultar();

    return data;
  } catch (error) {}
};

io.on("connection", async (socket) => {
  console.log("Nuevo cliente conectado");
  socket.emit("new-chat-message", messages);
  socket.emit("new-product-table", await getProducts());

  socket.on("new-message", (message) => {
    messages.push(message);
    save(messages);

    // console.log(messages);
    io.sockets.emit("new-chat-message", messages);
  });

  socket.on("new-product", async (product) => {
    try {
      await cSql.insertar(product);
    } catch (error) {}

    // cSql
    //   .crearTabla()
    //   .then(() => {
    //     console.log("base de datos creada");
    //   })
    //   .catch((err) => console.log(err));

    io.sockets.emit("new-product-table", await getProducts());
  });
});

const connectedServer = httpServer.listen(3000, () => {
  console.log("Servidor http con web sockets listo");
});

connectedServer.on("error", (error) => console.log);
