import { ObjectId } from "mongodb";
import { Player } from "../../player";

export type Team = {
    id?: ObjectId;
    name: string;
    captain: Player;
    players: [Player, Player, Player, Player, Player];
};
