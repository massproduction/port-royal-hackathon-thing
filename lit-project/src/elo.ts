import {PlayerId, Game, Player} from './types';

export type EloRating = number

function expected_value(player_one: EloRating, player_two: EloRating) : number {
    return 1 / (1 + 10**((player_two - player_one)/400))
}

function new_rating(current_player: EloRating, opponent: EloRating, won: boolean, player_amount: number) : EloRating {
    if (won == true) {
        return current_player + 32*(1-expected_value(current_player, opponent))
    } else {
        return current_player + (32*(0-expected_value(current_player, opponent))/(player_amount -1))
    }
}

function get_average_loser_rating(game: Game, players: Player[]) : EloRating {
    let sum_of_elo = 0;
    let total_losers = 0;
    for (const player of game.players) {
        if (player == game.winner) {

        } else {
            sum_of_elo += players[player].elo;
            total_losers++;
        }
    }
    return sum_of_elo / total_losers;
}

export type EloRatings = Map<PlayerId, EloRating>

function calculate_new_ratings(game: Game, players: Player[]): EloRatings {
    const dict = new Map<PlayerId, EloRating>;
    const elo_of_losers = get_average_loser_rating(game, players);
    const player_amount = game.players.length;
    for (const player of game.players) {
        if (player == game.winner) {
            dict.set(player, new_rating(players[player], elo_of_losers, true, player_amount))
        } else {
            dict.set(player, new_rating(players[player], players[game.winner], false, player_amount))
        }
    }
    return dict;

}