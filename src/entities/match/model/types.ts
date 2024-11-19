import { Player } from "../../player";
import { Team } from "../../team";
import { ObjectId } from "mongodb";

export enum Maps {
    NaN,
    Inferno,
    Dust2,
    AnubisHueta,
    Vertigo,
    Mirage,
    Nuke,
    Ancient,
}

export enum MatchStatus {
    playerPick,
    MapPick,
    JoinServer,
    Pause,
    Cancaled,
}

export type Match = {
    _id?: ObjectId;
    date: Date;
    team1: Team;
    team2: Team;
    map: Maps;
    status: {
        action: MatchStatus,
        side?: 'team1' | 'team2',
        captain?: ObjectId,
        additionalData?: Object[],
    };
};
