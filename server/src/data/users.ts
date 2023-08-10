import { User } from "@/types";

let serverGlobalUsers: User[] = [];

//  Gets passed a user and pushes it to users array
const addUserToServerGlobalUsers = (user: User) => serverGlobalUsers.push(user);

//  Gets all players in a specfic room and returns their socketId and username
const getPlayersInRoom = (roomId: string) =>
  serverGlobalUsers
    .filter((user) => user.roomId === roomId)
    .map(({ userSocketId, username }) => ({ userSocketId, username }));

const removeUser = (userId: string) => {
  serverGlobalUsers = serverGlobalUsers.filter(
    (user) => user.userSocketId !== userId
  );
};

//  Gets the socket for an individual user
const getUserFromServerGlobalUsers = (userId: string) =>
  serverGlobalUsers.find((user) => user.userSocketId === userId);

export {
  getUserFromServerGlobalUsers,
  getPlayersInRoom,
  addUserToServerGlobalUsers,
  removeUser,
};
