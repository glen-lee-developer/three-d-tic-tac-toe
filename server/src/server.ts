import express from "express";
import { Server, type Socket } from "socket.io";
import http from "http";
import cors from "cors";
import { RoomData } from "./types";

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server);

let rooms: RoomData[] = [];

//  SOCKETS
io.on("connection", (socket) => {
  console.log("New client connected!");

  socket.on("create-room", ({ roomId, username, isPrivateRoom }) => {
    rooms.push({
      roomId,
      isPrivateRoom,
      player1: username,
      player2: null,
    });
    const room = rooms.find((room) => room.roomId === roomId);
    socket.emit("room-created", { ...room });
    socket.emit("res-rooms-from-server", rooms);
  });

  socket.on("req-rooms-from-server", () => {
    socket.emit("res-rooms-from-server", rooms);
  });

  socket.on("join-room", ({ roomId, username }) => {
    const room = rooms.find((room) => room.roomId === roomId);
    console.log(`${username} is attempting to join room ${room?.roomId}`);
    if (room && (room.player1 === null || room.player2 === null)) {
      room.player2 = username;
      socket.join(roomId); // This joins the socket to the specified room
      io.to(roomId).emit("room-joined", { ...room });
    } else {
      console.log(rooms, "room not found");
    }
  });

  socket.on(
    "start-game-data",
    ({
      roomId,
      cubesData,
      numberOfTurns,
      currentPlayer,
      player1,
      player2,
      player1Score,
      player2Score,
      gameHasStarted,
    }) => {
      socket.to(roomId).emit("game-data-from-server", {
        roomId,
        cubesData,
        numberOfTurns,
        currentPlayer,
        player1,
        player2,
        player1Score,
        player2Score,
        gameHasStarted,
      });
    }
  );
  socket.on(
    "update-game-data",
    ({
      roomId,
      cubesData,
      numberOfTurns,
      currentPlayer,
      player1,
      player2,
      player1Score,
      player2Score,
    }) => {
      // const room = rooms.find((room) => room.roomId === roomId);
      socket.to(roomId).emit("game-data-from-server", {
        roomId,
        cubesData,
        numberOfTurns,
        currentPlayer,
        player1,
        player2,
        player1Score,
        player2Score,
      });
    }
  );
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => console.log(`Server is running on port ${PORT}!`));
