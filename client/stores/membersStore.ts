import { create } from "zustand";
import { User } from "./userStore";

interface UserState {
  members: User[];
  setMembers: (members: User[]) => void;
}

export const useMembersStore = create<UserState>((set) => ({
  members: [],
  setMembers: (members) => set({ members }),
}));
