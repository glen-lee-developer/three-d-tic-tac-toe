export interface User {
  userSocketId: string;
  username: string;
  roomId: string;
}

let serverGlobalUsers: User[] = [];

//  Gets passed a user and pushes it to users array
const addPlayerToServerGlobalUsers = (user: User) =>
  serverGlobalUsers.push(user);

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
const getUser = (userId: string) =>
  serverGlobalUsers.find((user) => user.userSocketId === userId);

export { getUser, getPlayersInRoom, addPlayerToServerGlobalUsers, removeUser };
