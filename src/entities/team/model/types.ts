import { ObjectId } from "mongodb";
import { Player } from "../../player";

export type Team = {
    _id?: ObjectId;
    name: string | 'Team A' | 'Team B';
    captain: Player;
    players: [Player?, Player?, Player?, Player?, Player?];
};
