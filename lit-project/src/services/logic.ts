import { Game, Player } from "../types.ts";
import { calculate_new_ratings } from "./elo.ts";
import {
  createPlayer,
  getAllPlayers,
  postGame,
  updatePlayer,
} from "./gamesService.ts";

export const saveGame = async (playerNames: string[], winnerName: string) => {
  const existingPlayers: Player[] = await getAllPlayers();
  const playersToCreate: string[] = playerNames.filter(
    (name) => !existingPlayers.some((p) => p.name === name)
  );
  const createdPlayers: Player[] = await Promise.all(
    playersToCreate.map((p) => createPlayer(p))
  );
  const playersToUpdate: Player[] = playerNames
    .filter((name) => existingPlayers.some((p) => p.name === name))
    .map((name) => getPlayerByName(existingPlayers, name));
  const allPlayers: Player[] = [...createdPlayers, ...playersToUpdate];
  const savedGame: Game = await postGame(
    allPlayers.map((p) => p.id),
    getPlayerByName(allPlayers, winnerName).id
  );
  const eloRatings = calculate_new_ratings(savedGame, allPlayers);
  await Promise.all(
    allPlayers
      .map((p) => {
        return {
          ...p,
          games: p.games + 1,
          wins: winnerName === p.name ? p.wins + 1 : p.wins,
          elo: eloRatings.get(p.id) ?? p.elo,
        };
      })
      .map((p) => updatePlayer(p.id, p))
  );
};
const getPlayerByName = (players: Player[], name: string): Player => {
  return players.find((p) => p.name === name) ?? players[0]; // dumb short-circuit don't look at it
};
