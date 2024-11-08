import { team } from "../../team";
import { ObjectId } from "mongodb";

export type match = {
    id?: ObjectId
    date: Date;
    team1: team;
    team2: team;
}