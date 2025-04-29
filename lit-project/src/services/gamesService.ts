import {
  Game,
  GameTypeStats,
  Player,
  PlayerCount,
  PlayerId,
} from "../types.ts";
import wretch from "wretch";
import { BASE_ELO, generateId } from "./utils.ts";

const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://port-royal-hackathon-thing-json.onrender.com/";
// const json = "application/json";

const playersURL = `${baseURL}/players`;
const gamesURL = `${baseURL}/games`;
const gameTypesURL = `${baseURL}/game_types`;

export const getAllPlayers = async (): Promise<Player[]> => {
  const players: Player[] = await wretch(playersURL)
    .get()
    .json((json) => json as Player[]);
  return players;
};

export const getAllGames = async (): Promise<Game[]> => {
  const games: Game[] = await wretch(gamesURL)
    .get()
    .json((json) => json as Game[]);
  return games;
};

export const getGameStatsByPlayerCount = async (
  playerCount: PlayerCount
): Promise<GameTypeStats> => {
  const gameStats = await wretch(gameTypeStatsURLByPlayerCount(playerCount))
    .get()
    .json((json) => json as GameTypeStats);
  return gameStats;
};

export const postGame = async (
  playerList: PlayerId[],
  winner: PlayerId
): Promise<Game> => {
  const newGame: Game = {
    id: generateId(),
    players: playerList,
    winner,
  };
  return await wretch(gamesURL)
    .post(newGame)
    .json((json) => json as Game);
};

export const createPlayer = async (name: string): Promise<Player> => {
  const id = generateId();
  const newPlayer: Player = {
    id,
    name,
    games: 0,
    wins: 0,
    elo: BASE_ELO,
  };
  return await wretch(playersURL)
    .post(newPlayer)
    .json((json) => json as Player);
};

export const updatePlayer = async (
  playerId: PlayerId,
  updatedPlayer: Player
): Promise<Player> => {
  return await wretch(`${playersURL}/${playerId}`)
    .put(updatedPlayer)
    .json((json) => json as Player);
};

export const updateGameStats = async (
  playerCount: PlayerCount,
  updatedStats: GameTypeStats
): Promise<GameTypeStats> => {
  return await wretch(gameTypeStatsURLByPlayerCount(playerCount))
    .put(updatedStats)
    .json((json) => json as GameTypeStats);
};

const gameTypeStatsURLByPlayerCount = (count: PlayerCount): string => {
  return `${gameTypesURL}/${count}_players`;
};
