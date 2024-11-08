import { player } from "@/src/entities/player";
import { connectToDb } from "..";

export async function getPlayers(): Promise<player[]> {
    const db = await connectToDb();
    const collection = db.collection<player>("players");

    const players = await collection
        .find()
        .toArray()

    if (!players) throw new Error("Error on getting players");

    return players;
}
