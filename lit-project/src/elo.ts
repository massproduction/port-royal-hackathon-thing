import { PlayerId, Game, Player } from "./types";

export type EloRating = number;

function expectedValue(playerOne: EloRating, playerTwo: EloRating): number {
  return 1 / (1 + 10 ** ((playerTwo - playerOne) / 400));
}

function newRating(
  currentPlayer: EloRating,
  opponent: EloRating,
  won: boolean,
  playerAmount: number
): EloRating {
  if (won == true) {
    return currentPlayer + 32 * (1 - expectedValue(currentPlayer, opponent));
  } else {
    return (
      currentPlayer +
      (32 * (0 - expectedValue(currentPlayer, opponent))) / (playerAmount - 1)
    );
  }
}

function getAverageLoserRating(game: Game, players: Player[]): EloRating {
  let sumOfElo = 0;
  let totalLosers = 0;
  for (const playerId of game.players) {
    if (playerId !== game.winner) {
      sumOfElo += players[playerId].elo;
      totalLosers++;
    }
  }
  return sumOfElo / totalLosers;
}

export type EloRatings = Map<PlayerId, EloRating>;

function calculateNewRatings(game: Game, players: Player[]): EloRatings {
  const ratings = new Map<PlayerId, EloRating>();
  const eloOfLosers = getAverageLoserRating(game, players);
  const playerAmount = game.players.length;
  for (const playerId of game.players) {
    if (playerId === game.winner) {
      ratings.set(
        playerId,
        newRating(players[playerId].elo, eloOfLosers, true, playerAmount)
      );
    } else {
      ratings.set(
        playerId,
        newRating(
          players[playerId].elo,
          players[game.winner].elo,
          false,
          playerAmount
        )
      );
    }
  }
  return ratings;
}
