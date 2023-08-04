import { User } from "../types";

let users: User[] = [];

//  Gets the socket for an individual user
const getUser = (userId: string) =>
  users.find((user) => user.userSocketId === userId);

//  Gets passed a user and pushes it to users array
const addUser = (user: User) => users.push(user);

//  Gets all players in a specfic room and returns their socketId and username
const getPlayers = (roomId: string) =>
  users
    .filter((user) => user.roomId === roomId)
    .map(({ userSocketId, username }) => ({ userSocketId, username }));

const removeUser = (userId: string) => {
  users = users.filter((user) => user.userSocketId !== userId);
};

export { getUser, getPlayers, addUser, removeUser };
