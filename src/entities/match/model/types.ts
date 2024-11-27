import { Team } from '../../team';
import { Player } from '../../player';
import { ObjectId } from 'mongodb';

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
    teamA: Team;
    teamB: Team;
    players?: Player[];
    map: Maps;
    status: {
        action: MatchStatus;
        side?: 'teamA' | 'teamB';
        captain?: ObjectId;
        additionalData?: object[];
    };
};
