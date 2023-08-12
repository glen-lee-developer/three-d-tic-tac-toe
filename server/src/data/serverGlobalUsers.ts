import { User } from "@/types";

let serverGlobalUsers: User[] = [];

//  Gets passed a user and pushes it to users array
const addUserToServerGlobalUsers = (user: User) => serverGlobalUsers.push(user);

const removeUserFromServerGlobalUsers = (userId: string) => {
  serverGlobalUsers = serverGlobalUsers.filter(
    (user) => user.userSocketId !== userId
  );
};

const getUsersInSpecificRoom = (roomId: string) =>
  serverGlobalUsers
    .filter((user) => user.roomId === roomId)
    .map(({ userSocketId, username }) => ({ userSocketId, username }));

//  Gets the socket for an individual user
const getUserFromServerGlobalUsers = (userId: string) =>
  serverGlobalUsers.find((user) => user.userSocketId === userId);

export {
  getUserFromServerGlobalUsers,
  addUserToServerGlobalUsers,
  getUsersInSpecificRoom,
  removeUserFromServerGlobalUsers,
};
