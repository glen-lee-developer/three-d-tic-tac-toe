import { User } from "../types";

let users: User[] = [];

const getUser = (userId: string) =>
  users.find((user) => user.userSocketId === userId);

const getPlayers = (roomId: string) =>
  users
    .filter((user) => user.roomId === roomId)
    .map(({ userSocketId, username }) => ({ userSocketId, username }));

//  Gets passed a user and pushes it to users array

const addUser = (user: User) => users.push(user);

const removeUser = (userId: string) => {
  users = users.filter((user) => user.userSocketId !== userId);
};

export { getUser, getPlayers, addUser, removeUser };
