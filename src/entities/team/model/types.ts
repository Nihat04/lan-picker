import { ObjectId } from "mongodb";
import { player } from "../../player";

export type team = {
    id?: ObjectId;
    name: string;
    captain: player;
    players: player[];
};
