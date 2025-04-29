// uuid type string
export type PlayerId = string;

export type Player = {
  id: PlayerId;
  name: string;
  games: number;
  wins: number;
  average_score: number;
  elo: number;
};

export type Game = {
  id: string;
  players: PlayerId[];
  winner: PlayerId;
};

export type GameTypeStats = {
  total: number;
  wins: {
    first: number;
    second: number;
    third: number;
    fourth?: number;
    fifth?: number;
  };
};
