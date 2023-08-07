import * as z from "zod";

export const createOfflineRoomSchema = z.object({
  player_1_username: z
    .string()
    .min(2, "Username must contain at least 2 characters")
    .max(50, "Username must not contain more than 50 characters"),
  player_2_username: z
    .string()
    .min(2, "Username must contain at least 2 characters")
    .max(50, "Username must not contain more than 50 characters"),
});
