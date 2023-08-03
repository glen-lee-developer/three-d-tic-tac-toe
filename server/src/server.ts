import express from "express";
import { Server, type Socket } from "socket.io";
import http from "http";
import cors from "cors";
import { z } from "zod";

import { addUser, getPlayers, getUser, removeUser } from "./data/users";
import { joinRoomSchema } from "./validations/joinRoom";
import { JoinRoomData } from "./types";
import { validateJoinRoomData } from "./validations/validateRoomData";

const app = express();

app.use(cors());

const server = http.createServer(app);
const io = new Server(server);

function isRoomCreated(roomId: string) {
  const rooms = [...io.sockets.adapter.rooms];
  console.log(rooms, "ROOMS");
  return rooms?.some((room) => room[0] === roomId);
}

function joinRoom(socket: Socket, roomId: string, username: string) {
  socket.join(roomId);
  const user = {
    userSocketId: socket.id,
    username,
  };
  addUser({ ...user, roomId });
  //  Finds all the players in the room
  const players = getPlayers(roomId);

  socket.emit("room-joined", { user, roomId, players });

  socket.to(roomId).emit("update-players", players);
  socket.to(roomId).emit("send-notification", {
    title: "New player arrived!",
    message: `${username} joined the game.`,
  });
}

//  SOCKETS
io.on("connection", (socket) => {
  //  Establish connection between client and server
  console.log("New client connected!");

  //  Create the room
  socket.on("create-room", (joinRoomData: JoinRoomData) => {
    const validatedData = validateJoinRoomData(socket, joinRoomData);

    if (!validatedData) return;
    const { roomId, username } = validatedData;
    console.log("Room created successfully");
    joinRoom(socket, roomId, username);
  });

  socket.on("join-room", (joinRoomData: JoinRoomData) => {
    const validatedData = validateJoinRoomData(socket, joinRoomData);

    if (!validatedData) return;
    const { roomId, username } = validatedData;

    if (isRoomCreated(roomId)) {
      return joinRoom(socket, roomId, username);
    }

    socket.emit("room-not-found", {
      message:
        "Oops! The Room ID you entered doesn't exist or hasn't been created yet.",
    });
  });
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => console.log(`Server is running on port ${PORT}!`));
