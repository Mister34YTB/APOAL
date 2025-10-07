import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server);

// Dossier statique "public"
app.use(express.static("public"));

// Connexion Socket.IO
io.on("connection", (socket) => {
  console.log("🟢 Nouveau client connecté :", socket.id);

  // Le banquier déclenche la sonnerie
  socket.on("banquierAppelle", () => {
    console.log("📞 Le banquier appelle !");
    io.emit("jouerSonnerie");
  });

  // Le plateau ou le banquier arrête la sonnerie
  socket.on("arreterSonnerie", () => {
    console.log("⛔ Sonnerie arrêtée !");
    io.emit("arreterSonnerie");
  });

  socket.on("disconnect", () => {
    console.log("🔴 Client déconnecté :", socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () =>
  console.log(`✅ Serveur en ligne sur le port ${PORT}`)
);
