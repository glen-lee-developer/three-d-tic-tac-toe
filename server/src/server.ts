import express from "express";
import { Server, type Socket } from "socket.io";
import http from "http";
import cors from "cors";
import { z } from "zod";

const app = express();

app.use(cors());

const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => console.log(`Server is running on port ${PORT}!`));
