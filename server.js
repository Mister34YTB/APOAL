import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("Client connecté :", socket.id);

  // Banquier appelle
  socket.on("banquierAppelle", () => {
    console.log("🔔 Appel du banquier !");
    io.emit("jouerSonnerie");
  });

  // Plateau arrête la sonnerie
  socket.on("arreterSonnerie", () => {
    console.log("⛔ Sonnerie arrêtée !");
    io.emit("arreterSonnerie");
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`✅ Serveur lancé sur le port ${PORT}`));
