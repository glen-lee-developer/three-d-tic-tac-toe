import express from "express";
import { Server, type Socket } from "socket.io";
import http from "http";
import cors from "cors";
import { RoomData } from "./types";
import { initialGameData } from "./data/initalGameData";

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server);

let rooms: RoomData[] = [];

function joinRoom(socket:Socket,roomId:string ,username:string){
  socket.join(roomId)
  const room = rooms.find((room) => room.roomId === roomId);
    if (room && (room.player1 === null || room.player2 === null)) {
      if (!room.player1) {
        room.player1 = username;
      } else if (!room.player2) {
        room.player2 = username;
    }
    
  socket.emit('room-joined', { room })
  console.log(room.player1,room.player2)
  socket.to(room.roomId).emit('update-players', room.player1,room.player2)
}}

//  SOCKETS
io.on("connection", (socket) => {
  console.log("New client connected!");

  socket.on("create-room", ({ roomId, username, isPrivateRoom }) => {
    rooms.push({
      roomId,
      isPrivateRoom,
      player1: null,
      player2: null,
    });
    joinRoom(socket,roomId,username)
  });

  socket.on("join-room", ({ roomId, username }) => {
   joinRoom(socket,roomId, username)
  });

  socket.on("req-rooms-from-server", () => {
    let availableRooms = rooms.filter(
      (room) =>
        !room.isPrivateRoom && (room.player1 === null || room.player2 === null)
    )
    socket.emit("res-rooms-from-server", availableRooms);
  });



  socket.on("start-game-data", ({ roomId }) => {
    const room = rooms.find((room) => room.roomId === roomId);
    socket.in(roomId).emit("start-game-data-from-server", {
      ...initialGameData,
      player1: room?.player1,
      player2: room?.player2,
    });
  });
  socket.on("update-game-data",
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
