import { Game, Player } from "../types";
import wretch from "wretch";

const baseURL = "http://localhost:3000";
// const json = "application/json";

export const getAllPlayers = async (): Promise<Player[]> => {
  const url = `${baseURL}/players`;
  const players: Player[] = await wretch(url)
    .get()
    .json((json) => json as Player[]);
  return players;
};
